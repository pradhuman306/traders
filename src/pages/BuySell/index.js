import React from 'react'
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBuySellList, getBuyList, getSellList } from '../../actions/buysell';
import { formatDate } from '../../actions/common';
import { getItems } from '../../actions/items';
import ConfirmModal from '../../common/confirmModal';
import CustomLoader from '../Customloader';
import AddBuySell from './AddBuySell';
import EditBuySell from './EditBuySell';
const BuySell = (props) => {
    const user_id = props.auth.userdata.id;
    const dispatch = useDispatch();
    const buyListAll = useSelector((state)=>state.buySellReducer).buyList;
    const sellListAll = useSelector((state)=>state.buySellReducer).sellList;
    const itemListAll = useSelector((state)=>state.itemReducer).itemList;
    const partyList = useSelector((state) => state.balanceSheetReducer).partyList;
    const [filterText, setFilter] = useState("");
    const [buyList, setBuyList] = useState([...buyListAll]);
    const [buySellRow,setBuysell]= useState({});
    const [isActive,setIsActive]= useState({
        "buy":true,
        "sell":false
    });
    const [id,setId]= useState({});
    const [isExpandable, setisExpandable] = useState(false);

    const handleSort = (column, sortDirection) =>
        console.log(column.selector, sortDirection);
    // data provides access to your row data

    const ExpandedComponent = ({ data }) => {
        // window.innerWidth <= 599 ? <></> : "";
        if (window.innerWidth <= 599) {
            return (
                <>
                    <p>
                        <b>Party name:</b> {data.party}
                    </p>
                    <p>
                        <b>Date:</b> {data.date}
                    </p>
                    <p>
                        <b>Bill no:</b> {data.bill_no}
                    </p>
                    <p>
                        <b>Debit:</b> {data.debit}
                    </p>
                </>
            );
        } else if (window.innerWidth <= 959) {
            return (
                <>
                    <p>
                        <b>Amount:</b> {data.amount}
                    </p>
                    <p>
                    <b>Description:</b> {data.description}
                    </p>
                
                </>
            );
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
        dispatch(getBuyList(user_id));
        dispatch(getItems(user_id));
        if (window.innerWidth <= 599 || window.innerWidth <= 959) {
            setisExpandable(true);
        } else {
            setisExpandable(false);
        }
    }, []);

    const handleSetActive = (param) =>{
        let activeTab = {...isActive};
        if(param === 'buy'){
            activeTab.buy = true;
            activeTab.sell = false;
        }else{
            activeTab.sell = true; 
            activeTab.buy = false;
        }
        setIsActive({...activeTab});
    }
    const filterValue = (filterText,list) => {
        if (filterText) {
            let tmp = list.filter((item) => {
                if (
                    item.amount.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.party.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.date.includes(filterText) ||
                    item.gst.toString().includes(filterText) ||
                    item.item.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.weight.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.debit.toString().includes(filterText.toLowerCase()) ||
                    item.commission.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.bill_no.toLowerCase().includes(filterText.toLowerCase()) 
                    
                ) {
                    return true;
                }
                return false;
            });
            setBuyList([...tmp]);
        } else {
            setBuyList([...list]);
        }
    }



    useEffect(() => {
        if(isActive.buy){
            filterValue(filterText,buyListAll);
        }else{
            filterValue(filterText,sellListAll);
        }
    
    }, [filterText,buyListAll,isActive,sellListAll]);

    const hanndleSearch = (value) => {
        setFilter(value);
    };

    // const hideColumns = () => {};

    const columns = useMemo(
        () => [

            {
                name: "Party",
                selector: (row) => {
                    let newName = row.party.split(" ");
                    let firstC = newName[0][0];
                    let lastC = "";
                    if (newName[1]) {
                        lastC = newName[1][0].toUpperCase();
                    }
                    return (
                        <div className="user-wrap">
                            <h5 className="user-icon">{firstC.toUpperCase() + lastC}</h5>
                            <div className="user-detail">{row.party} {row.URD?<span className='badge'>URD</span>:""}</div>
                        </div>
                    );
                },
                sortable: true,
                width: "200px",
            },
            { 
                name: "Date",
                selector: (row) => formatDate(row.date),
                sortable: true,
                hide: "md",
            },
            {
                name: "Bill no",
                selector: (row) => row.bill_no,
                sortable: true,
                // width: "200px",
                hide: "sm",
            },
            {
                name: "Amount",
                selector: (row) => row.amount ? "₹"+parseInt(row.amount).toLocaleString("en-IN"):"",
                sortable: true,
                hide: "md",
            },
            {
                name: "Debit",
                selector: (row) => row.debit ? "₹"+parseInt(row.debit).toLocaleString("en-IN"):"",
                sortable: true,
                hide: "md",
            },
            {
                name: "commission",
                selector: (row) => row.commission ? row.commission+"%" :"",
                sortable: true,
                hide: "md",
            },
            {
                name: "GST",
                selector: (row) => row.gst? row.gst+"%":"",
                sortable: true,
                hide: "md",
            },
            {
                name: "Total Amount",
                selector: (row) =>  isActive.buy?
                row.commission/100 == 0 ? "₹"+(row.amount - row.debit) :
                "₹"+((row.amount)-[(row.amount - row.debit)*(row.commission/100)]).toLocaleString("en-IN") :row.commission/100 == 0? "₹"+(row.amount - row.debit):
                "₹"+(parseInt(row.amount)+parseInt([(row.amount - row.debit)*(row.commission/100)])).toLocaleString("en-IN"),
                sortable: true,
                hide: "md",
            },
            {
                name: "Actions",
                width: "166px",
                selector: (row) => {
                    return (
                        <ul className="table-drop-down">

                            <li>

                                <a
                                    href=""
                                    role="button"
                                    id="tableMenu"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    className="action-btn"
                                >


                                    <svg width="24px" height="24px" viewBox="0 0 24 24" id="_24x24_On_Light_Dots" data-name="24x24/On Light/Dots" xmlns="http://www.w3.org/2000/svg">
                                        <rect id="view-box" width="24" height="24" fill="#141124" opacity="0" />
                                        <path id="Shape" d="M12,1.5A1.5,1.5,0,1,1,13.5,3,1.5,1.5,0,0,1,12,1.5Zm-6,0A1.5,1.5,0,1,1,7.5,3,1.5,1.5,0,0,1,6,1.5Zm-6,0A1.5,1.5,0,1,1,1.5,3,1.5,1.5,0,0,1,0,1.5Z" transform="translate(4.5 11)" fill="#141124" />
                                    </svg>


                                </a>
                                <ul className="dropdown-menu" aria-labelledby="tableMenu">


                                    <li>
                                        <a onClick={(e) => {
                                            e.preventDefault();
                                            setBuysell(row);
                                            setId(row.id);
                                        }}
                                            className="active-user"
                                            data-bs-toggle="modal"
                                            data-bs-target="#editbuysell"
                                        >

                                         Edit
                                        </a>
                                    </li>

                                    <li>
                                        <a onClick={(e) => {
                                            e.preventDefault();
                                        }}
                                            className="active-user delete-u"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#confirm_${row.id}`}
                                        >

                                          Delete
                                        </a>
                                    </li>

                                </ul>
                            </li>
                            <ConfirmModal
                                id={row.id}
                                name={row.party}
                                yes={(id) => {
                                    dispatch(deleteBuySellList({id:row.id,user_id:user_id},isActive));
                                }}
                             
                            />
                        </ul>


                    );
                },
            },
        ],
        [isActive]
    );

    return (
        <div className="body-content">
            <div className="usermanagement-main">
            <div>   <ul id="report-filter" className="report-filter tabs">
                            <li className={`filter-item pending-r ${isActive.buy?'active':""}`} onClick={()=>  {dispatch(getBuyList(user_id))
                                        handleSetActive('buy');
                                    
                                    }
                            }>Buy</li>
                            <li className={`filter-item complete-r ${isActive.sell?'active':""}`} onClick={()=>{dispatch(getSellList(user_id))
                              handleSetActive('sell');
                        }} 
                            
                            >Sell</li>
                        </ul></div>
                <div className="datatable-filter-wrap">
                   
             
                    <div className="datatable-search">
                        <input
                            type="text"
                            placeholder="Search buy/sell..."
                            className="form-control"
                            onChange={(e) => hanndleSearch(e.target.value)}
                        />
                    </div>
                    <div className="datatable-filter-right">
                        <ul className="btn-group">
                        
                            <li>
                                <button
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#addbuysell"
                                >
                                   Add New Buy/Sell
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <AddBuySell itemListAll={itemListAll} {...props} isActive={isActive} partyList={partyList} />
            <EditBuySell itemListAll={itemListAll} {...props} isActive={isActive} partyList={partyList} row_id={id} row_data={buySellRow} />
            <DataTable
                columns={columns}
                data={buyList}
                progressPending={props.pendingData}
                progressComponent={<CustomLoader/>}
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
export default BuySell;
