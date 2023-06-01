import React from 'react'
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CustomLoader from '../Customloader';
import { getAllPartyHistory, getPartyById } from '../../actions/balancesheet';
import { formatDate, totalAmountCalculate, totalAmountCalculateRaw } from '../../actions/common';
import Select from 'react-select';
import Header from '../Header/Header';
import PaySlip from './PaySlip';



const PartyHistory = (props) => {
    const { partyid } = useParams();

    const partyHistoryAll = useSelector((state) => state.balanceSheetReducer).partyHistory;
    const partyHistoryAllData = useSelector((state) => state.balanceSheetReducer).partyHistoryAll;

    const partySingle = useSelector((state) => state.balanceSheetReducer).partySingle;
    const dispatch = useDispatch();
    const [filterText, setFilter] = useState("");
    const [historyDetails, setList] = useState([...partyHistoryAll]);
    const [historyDetailsAll, setHistoryAll] = useState([...partyHistoryAllData]);
    const [partyDetails, setPartyDetails] = useState({});
    const [id, setId] = useState("");
    const [isExpandable, setisExpandable] = useState(false);
    const [newListItems, setNewListItems] = useState([]);
    const [valueFilter,setValueFilter] = useState({});
    const [rowData,setRowData] = useState({});
    const [totalAmount,setTotalAmount] = useState(0);
    const [totalPaidAmount,setTotalPaid] = useState(0);

    
    const handleSort = (column, sortDirection) =>
        console.log(column.selector, sortDirection);
    // data provides access to your row data


    useEffect(() => {
        dispatch(getPartyById(partyid,"1y"));
        dispatch(getAllPartyHistory(partyid,"all"));
        
    }, [partyid]);

    useEffect(() => {
        setPartyDetails({});
    }, []);

    
    useEffect(() => {
        let totalAmount = 0; 
        let totalPaid = 0; 
        historyDetailsAll.forEach((row)=>{
            totalAmount+=parseInt(totalAmountCalculateRaw(row)+(totalAmountCalculateRaw(row)*parseInt(row.gst)/100))
            if(row.paid){
                let paidAmountData = JSON.parse(row.paid);
                paidAmountData.forEach((item)=>{
                    totalPaid+= parseInt(item.amount);
                })
            }
        })  
       setTotalAmount(totalAmount);
       setTotalPaid(totalPaid);
    }, [historyDetailsAll]);

  

    useEffect(() => {
        setPartyDetails({...partySingle});
    }, [partySingle])

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
        setValueFilter(newFilterItems[4]);
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
        setHistoryAll([...partyHistoryAllData])
    }, [filterText, partyHistoryAll,partyHistoryAllData]);

    const hanndleSearch = (value) => {
        setFilter(value);
    };

    // const hideColumns = () => {};

    const columns = useMemo(
        () => [
           
            {
                name: "Item",
                width: "500px",
                sortable: true,
                selector: (row) => {
                    return (
                        <>
                            <div className="user-detail xl-text">{row.item} <div className='bysellopt'>{row.type === 'Buy' ? <span className='badge rounded-pill text-bg-primary'>Buy</span> : <span className='badge rounded-pill text-bg-danger'>Sell</span>}</div></div>
                            <div className='c-date'>{formatDate(row.date?.split(" ")[0])}</div>
                        </>
                     
                    );
                },
                
            },
            
            {
                name: "Credit",
                sortable: true,
                hide: "md",
                width: "150px",
                selector: (row) =>{
                    return (
                        
                        <span className="">
                        {row.type === 'Sale' ? <span className='credit'>{totalAmountCalculate(row)}</span> : ""}
                        </span>
                    );
                },
            },

            {
                name: "Debit",
                sortable: true,
                width: "150px",
                hide: "md",
                selector: (row) =>{
                    return (
                        
                        <span className="">
                        {row.type === 'Buy' ? <span className='debit'>{totalAmountCalculate(row)}</span> : ""}
                        </span>
                    );
                },
            },

            {
                name: "GST amount",
                sortable: true,
                width: "150px",
                hide: "md",
                selector: (row) =>{
                    return (
                        
                        <span className="">
                        {"₹"+parseInt(totalAmountCalculateRaw(row)+(totalAmountCalculateRaw(row)*parseInt(row.gst)/100)).toLocaleString("en-IN")}
                          </span>
                    );
                },
            },

            {
                name: "Pending amount",
                sortable: true,
                width: "150px",
                hide: "md",
                selector: (row) =>{
                    let toalPaid = 0;
                    let totalAmount  = totalAmountCalculateRaw(row)+(totalAmountCalculateRaw(row)*parseInt(row.gst)/100);
                    if(row.paid){
                        let paidData =  JSON.parse(row.paid); 
                        paidData.map(element => {
                            toalPaid+=parseInt(element.amount);
                        }
                        );
                    }
                    return (
                     
                        <span className="badge rounded-pill text-bg-warning">
                      {"₹"+parseInt(totalAmount-toalPaid).toLocaleString("en-IN")}
                        </span>
                    );
                },
            },

            {
                name: "Pay",
                sortable: true,
                width: "150px",
                hide: "md",
                selector: (row) =>{
                    return (
                        
                        <a 
                        className='anchor'  
                        onClick={()=>setRowData(row)}
                        data-bs-toggle="modal"
                        data-bs-target="#paySlip"
                        >
                            Pay
                        </a>
                    );
                },
            },


        ],
        []
    );

    return (
        <div className="body-content">
            <Header heading={!props.pendingData?partyDetails.name:""} {...props}  />
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
        <div className=''>
        {!props.pendingData?<>   <p>Total Amount: ₹{parseInt(totalAmount).toLocaleString("en-IN")}</p>
            <p>Pending Amount: ₹{parseInt(totalAmount-totalPaidAmount).toLocaleString("en-IN")}</p></>:""}
         
        </div>
                    <div className='select-filter form-group'>
                        <Select
                            options={newListItems}
                            onChange={(e) => handleSelectChange(e)}
                            value={valueFilter}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 8,
                                colors: {
                                  ...theme.colors,
                                  primary25: 'rgba(5,131,107,0.1)',
                                  primary: '#05836b',
                                },
                              })}
                        />
                    </div>
               

                </div>
            </div>
                    <PaySlip {...props} rowData={rowData} filterValue={valueFilter.value} partyid={partyid} />

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
     

            />
        </div>
    )
}
export default PartyHistory;
