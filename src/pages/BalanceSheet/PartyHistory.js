import React from 'react'
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CustomLoader from '../Customloader';
import { getPartyById } from '../../actions/balancesheet';
import { formatDate, totalAmountCalculate } from '../../actions/common';
import Select from 'react-select';


const PartyHistory = (props) => {
    const { partyid } = useParams();

    const userId = props.auth.userdata.id;
    const partyHistoryAll = useSelector((state) => state.balanceSheetReducer).partyHistory;
    const dispatch = useDispatch();
    const [filterText, setFilter] = useState("");
    const [historyDetails, setList] = useState([...partyHistoryAll]);
    const [id, setId] = useState("");
    const [isExpandable, setisExpandable] = useState(false);
    const [newListItems, setNewListItems] = useState([]);
    const [valueFilter,setValueFilter] = useState({});
    const handleSort = (column, sortDirection) =>
        console.log(column.selector, sortDirection);
    // data provides access to your row data


    useEffect(() => {
        dispatch(getPartyById(partyid));

    }, [partyid])

    const ExpandedComponent = ({ data }) => {
        // window.innerWidth <= 599 ? <></> : "";
        if (window.innerWidth <= 599) {
            return (
                <>
                    <p>
                        <b>Date:</b> {formatDate(data.date)}
                    </p>
                    <p>
                        <b>Credit:</b> {data.type === 'Sale' ? <span className='credit'>{totalAmountCalculate(data)}</span> : ""}
                    </p>
                    <p>
                        <b>Debit:</b> {data.type === 'Buy' ? <span className='debit'>{totalAmountCalculate(data)}</span> : ""}
                    </p>
                    <p>
                        <b>Type:</b> {data.type}
                    </p>

                </>
            );
        }else if(window.innerWidth <= 991){
            return(
                <>
               
            <p>
                <b>Credit:</b> {data.type === 'Sale' ? <span className='credit'>{totalAmountCalculate(data)}</span> : ""}
            </p>
            <p>
                <b>Debit:</b> {data.type === 'Buy' ? <span className='debit'>{totalAmountCalculate(data)}</span> : ""}
            </p>
            <p>
                <b>Type:</b> {data.type}
            </p>
            </>
            )
        }
    };

    var onresize = function () {
        //your code here
        //this is just an example
        if (window.innerWidth <= 599 || window.innerWidth <= 959) {
            setisExpandable(true);
        } else {
            setisExpandable(false);
        }
    };
    window.addEventListener("resize", onresize);

    useEffect(() => {

        if (window.innerWidth <= 599 || window.innerWidth <= 959) {
            setisExpandable(true);
        } else {
            setisExpandable(false);
        }
        let newFilterItems = [{
            label: "This month",
            value: "1m"
        }, {
            label: "Last month",
            value: "1lm"
        }, {
            label: "Last 3 months",
            value: "3m"
        }, {
            label: "Last 6 months",
            value: "6m"
        }, {
            label: "This year",
            value: "1y"
        }]
        setNewListItems([...newFilterItems]);
        setValueFilter(newFilterItems[0]);
    }, []);
    const handleSelectChange = (e) => {
        if(e){
            dispatch(getPartyById(partyid, e.value));
            setValueFilter(e);
        }
    }
    useEffect(() => {
        if (filterText) {
            let tmp = partyHistoryAll.filter((item) => {
                if (
                   formatDate(item.date)?.toLowerCase().includes(filterText.toLowerCase()) ||
                   item.item.toLowerCase().includes(filterText.toLowerCase()) ||
                   item.type.toLowerCase().includes(filterText.toLowerCase()) 
                ) {
                    return true;
                }
                return false;
            });
            setList([...tmp]);
        } else {
            setList([...partyHistoryAll]);
        }
    }, [filterText, partyHistoryAll]);

    const hanndleSearch = (value) => {
        setFilter(value);
    };

    // const hideColumns = () => {};

    const columns = useMemo(
        () => [
            {
                name: "Sr no.",
                selector: (row, index) => index + 1,
                sortable: false,
                width: "100px",
            },

            {
                name: "Date",
                selector: (row) => formatDate(row.date?.split(" ")[0]),
                sortable: true,
                hide:"sm"
            },

            {
                name: "Item",
                selector: (row) => row.item,
                sortable: true,
                
            },
            {
                name: "Credit",
                selector: (row) => row.type === 'Sale' ? <span className='credit'>{totalAmountCalculate(row)}</span> : "",
                sortable: true,
                hide: "md",
            },

            {
                name: "Debit",
                    selector: (row) => row.type === 'Buy' ? <span className='debit'>{totalAmountCalculate(row)}</span> : "",
                sortable: true,
                hide: "md",
            },
            {
                name: "Type",
                selector: (row) => row.type === 'Buy' ? <span className='status-label active-label'>Buy</span> : <span className='status-label inactive-label'>Sell</span>,
                sortable: true,
                hide: "md",
            },



        ],
        []
    );

    return (
        <div className="body-content">
            <div className="usermanagement-main">
                <div className="datatable-filter-wrap">
                    <div className="datatable-search">
                        <input
                            type="text"
                            placeholder="Search history..."
                            className="form-control"
                            onChange={(e) => hanndleSearch(e.target.value)}
                        />
                    </div>

                    <div className='select-filter form-group'>
                        <Select
                            options={newListItems}
                            onChange={(e) => handleSelectChange(e)}
                            value={valueFilter}
                        />
                    </div>
                </div>
            </div>


            <DataTable
                columns={columns}
                data={historyDetails}
                progressPending={props.pendingData}
                progressComponent={<CustomLoader />}
                paginationRowsPerPageOptions={[8, 25, 50, 100]}
                pagination
                paginationPerPage={8}
                expandableRows={isExpandable}
                expandableRowsComponent={ExpandedComponent}
                onSort={handleSort}
                selectableRows
            />
        </div>
    )
}
export default PartyHistory;
