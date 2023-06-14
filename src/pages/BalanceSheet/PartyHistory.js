import React from 'react'
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import CustomLoader from '../Customloader';
import { getAllPartyHistory, getPartyById } from '../../actions/balancesheet';
import { formatDate, gstCalculate, makePositive, priceFormatter, totalAmountBuy, totalAmountCalculateRaw, totalAmountSell } from '../../actions/common';
import Select from 'react-select';
import Header from '../Header/Header';
import PaySlip from './PaySlip';
import { useNavigate } from 'react-router-dom';
import Invoice from '../Invoice';




const PartyHistory = (props) => {
    const { partyid } = useParams();
    const navigate = useNavigate();


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
    const [valueFilter, setValueFilter] = useState({});
    const [rowData, setRowData] = useState({});
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalGST, setTotalGST] = useState(0);
    const [totalPaidAmount, setTotalPaid] = useState(0);
    const [totalWithoutGST, setTotalWithoutGST] = useState(0);
    const [totalPaidWithoutGST, setTotalPaidWithoutGST] = useState(0);
    const [totalPaidWithGST, setTotalPaidWithGST] = useState(0);
    const [totalSellGST, setTotalSellGST] = useState(0);
    const [totalBuyGST, setTotalBuyGST] = useState(0);
    const [totalPaidWithoutGSTSellDiffBuy, setTotalPaidWithoutGSTSellDiffBuy] = useState(0);
    const [totalPaidWithGSTSellDIffBuy,setTotalPaidWithGSTSellDIffBuy] = useState(0);
    const [isDisplayDate,setDisplayDate] = useState(false);
    const [dateFromTo,setDateFromTo] = useState({start:"",end:""});

    const handleSort = (column, sortDirection) =>
        console.log(column.selector, sortDirection);
    // data provides access to your row data

    useEffect(() => {
        dispatch(getPartyById(partyid, "1y"));
        dispatch(getAllPartyHistory(partyid, "all"));

    }, [partyid]);

    useEffect(() => {
        setPartyDetails({});
    }, []);


    useEffect(() => {
        let totalAmount = 0;
        let totalPaid = 0;
        let totalGSTAmount = 0;
        let totalBuyAmount = 0;
        let totalBuyGSTAmount = 0;
        let totalSellAmount = 0;
        let totalAmountWithoutGSTBuy = 0;
        let totalAmountWithoutGSTSell = 0;
        let totalPaidWithoutGST= 0;
        let totalPaidWithoutGSTBuy= 0;
        let totalPaidWithoutGSTSell= 0;
        let totalPaidBuyGST = 0;
        let totalPaidSellGST = 0;
        historyDetailsAll.forEach((row) => {
            totalAmountWithoutGSTBuy += parseInt(totalAmountBuy(row));
            totalAmountWithoutGSTSell += parseInt(totalAmountSell(row));

            totalSellAmount += parseInt(totalAmountSell(row)+gstCalculate(totalAmountSell(row),row.gst));
            totalBuyAmount += parseInt(totalAmountBuy(row)+gstCalculate(totalAmountBuy(row),row.gst));
            totalBuyGSTAmount += row.type == 'Buy'?parseInt(gstCalculate(totalAmountCalculateRaw(row),row.gst)):0;
            totalGSTAmount += parseInt(gstCalculate(totalAmountCalculateRaw(row),row.gst));
            if (row.paid) {
                let paidAmountData = JSON.parse(row.paid);
                paidAmountData.forEach((item) => {
                    if(row.type=="Buy"){
                        if(item.type=="main"){
                            totalPaidWithoutGST+=parseInt(item.amount)
                            totalPaidWithoutGSTBuy+=parseInt(item.amount)
                        }else{
                            totalPaidBuyGST +=parseInt(item.amount);
                        }
                       
                        totalBuyAmount-=parseInt(item.amount);
                    }else{
                        if(item.type=="main"){
                            totalPaidWithoutGST+=parseInt(item.amount)
                            totalPaidWithoutGSTSell+=parseInt(item.amount)
                        
                        }else{
                            totalPaidSellGST +=parseInt(item.amount);
                        }
                        totalSellAmount-=parseInt(item.amount);
                    }
                    totalPaid += parseInt(item.amount);
                })
            }
        })
     console.log((totalAmountWithoutGSTSell-totalAmountWithoutGSTBuy) - (totalPaidWithoutGSTSell-totalPaidWithoutGSTBuy));   
        console.log(totalAmountWithoutGSTSell);
        console.log(totalAmountWithoutGSTBuy);
        console.log(totalPaidWithoutGSTSell);
        totalAmount = totalSellAmount - totalBuyAmount;
        console.log(totalPaidWithoutGST);
        setTotalPaidWithoutGST(totalPaidWithoutGST);
        setTotalPaidWithoutGSTSellDiffBuy(totalPaidWithoutGSTSell-totalPaidWithoutGSTBuy);
        setTotalPaidWithGST(totalPaid-totalPaidWithoutGST);
        setTotalWithoutGST((totalAmountWithoutGSTSell-totalAmountWithoutGSTBuy));
        setTotalSellGST(totalGSTAmount-totalBuyGSTAmount);
        setTotalBuyGST(totalBuyGSTAmount);
        setTotalAmount(totalAmount);
        setTotalGST(totalGSTAmount);
        setTotalPaid(totalPaid);
        setTotalPaidWithGSTSellDIffBuy(totalPaidSellGST-totalPaidBuyGST);
    }, [historyDetailsAll]);

    const handleSearch = () => {
        dispatch(getPartyById(partyid,'custom',dateFromTo));
    }


    useEffect(() => {
        setPartyDetails({ ...partySingle });
    }, [partySingle])

    const ExpandedComponent = ({ data }) => {
        // window.innerWidth <= 599 ? <></> : "";
        return (
            <>
                <div className='datatable-dtllist'>



                    <p className='inline'>
                        <b>Main amount:</b> {"₹" + parseInt((data.amount)).toLocaleString("en-IN")}
                    </p>
                    <p className='inline'>
                        <b>GST amount:</b> <div className="user-detail xl-text sm-font"> {priceFormatter(parseInt(gstCalculate(totalAmountCalculateRaw(data),data.gst)))}<div className='bysellopt'> <span className='badge rounded-pill text-bg-primary'>{data.gst != "" ? data.gst:"0"}%</span></div> </div>
                     
                    </p>
                    {data.paid ? <p>
                        <b>History</b>
                        <ul className='history-list'>
                            <li className='list-header'><b>Date</b> <b>Amount</b></li>
                            {JSON.parse(data.paid).map((item) => (
                                <li><span>{formatDate(item.date)}</span> <span>{"₹" + parseInt(item.amount).toLocaleString("en-IN")}</span> <span>{item.type}</span></li>
                            ))}
                        </ul>
                    </p> : ""}
                </div>
            </>
        );
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
        },{
            label: "Custom date",
            value: "custom"
        }]
        setNewListItems([...newFilterItems]);
        setValueFilter(newFilterItems[4]);
    }, []);
    const handleSelectChange = (e) => {
        if (e && e.value != "custom") {
            dispatch(getPartyById(partyid, e.value));
            setValueFilter(e);
            setDisplayDate(false);
        }else if(e.value === "custom"){
            setDisplayDate(true);
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
    }, [filterText, partyHistoryAll, partyHistoryAllData]);

    const hanndleSearch = (value) => {
        setFilter(value);
    };

    // const hideColumns = () => {};

    const columns = useMemo(
        () => [

            {
                name: "Item",
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
                name: "Debit",
                sortable: true,
                hide: "md",
                width: "150px",
                selector: (row) => {
                    return (

                        <span className="">
                            {row.type === 'Sale' ? <span className='debit'>{priceFormatter(totalAmountCalculateRaw(row))}</span> : ""}
                        </span>
                    );
                },
            },

            {
                name: "Credit",
                sortable: true,
                width: "150px",
                hide: "md",
                selector: (row) => {
                    return (

                        <span className="">
                            {row.type === 'Buy' ? <span className='credit'>{priceFormatter(totalAmountCalculateRaw(row))}</span> : ""}
                        </span>
                    );
                },
            },



            {
                name: "Pending amount",
                sortable: true,
                width: "150px",
                hide: "md",
                selector: (row) => {
                    let toalPaid = 0;
                    let totalAmount = totalAmountCalculateRaw(row) + gstCalculate(totalAmountCalculateRaw(row),row.gst);
                    if (row.paid) {
                        let paidData = JSON.parse(row.paid);
                        paidData.map(element => {
                            toalPaid += parseInt(element.amount);
                        }
                        );
                    }
                    return (

                        <span className="badge rounded-pill bg-text text-bg-warning">
                          
                            {"₹" + parseInt(totalAmount - toalPaid).toLocaleString("en-IN")}
                        </span>
                    );
                },
            },

            {
                name: "Pay",
                sortable: true,
                width: "150px",
                hide: "md",
                selector: (row) => {
                    let toalPaid = 0;
                    let totalAmount = totalAmountCalculateRaw(row) + gstCalculate(totalAmountCalculateRaw(row),row.gst);
                    if (row.paid) {
                        let paidData = JSON.parse(row.paid);
                        paidData.map(element => {
                            toalPaid += parseInt(element.amount);
                        }
                        );
                    }
                    return (
                        
                        <a
                            className={`anchor pay-btn ${parseInt(totalAmount - toalPaid) == 0 ? "paid" : ""}`}
                            onClick={() => setRowData(row)}
                            data-bs-toggle={`${parseInt(totalAmount - toalPaid) == 0 ? false : "modal"}`}
                            data-bs-target={`${parseInt(totalAmount - toalPaid) == 0 ? false : "#paySlip"}`}
                        >
                          {parseInt(totalAmount - toalPaid) == 0 ? "Paid" : "Pay"}
                        </a>
                    );
                },
            },
            {
                name: "Invoice",
                sortable: true,
                width: "150px",
                hide: "md",
                selector: (row) => {
                    return (
                    <>
                            <ul className='action-replay with-fill'>
                                <li>    <a
                                    className='btn-sml'
                                    onClick={() => setRowData(row)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#invoice"
                                >
                        <svg className='no-fill' fill="rgb(143, 153, 179)" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15,8a1,1,0,0,1-1,1H6A1,1,0,0,1,6,7h8A1,1,0,0,1,15,8Zm-1,3H6a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2Zm-4,4H6a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2Zm13-3v8a3,3,0,0,1-3,3H4a3,3,0,0,1-3-3V4A3,3,0,0,1,4,1H16a3,3,0,0,1,3,3v7h3A1,1,0,0,1,23,12ZM17,4a1,1,0,0,0-1-1H4A1,1,0,0,0,3,4V20a1,1,0,0,0,1,1H17Zm4,9H19v8h1a1,1,0,0,0,1-1Z" /></svg>
                                </a></li>
                        
                            
                            </ul>
                        </>
                    );
                },
            },


        ],
        []
    );
    const handleChangeDate = (e,param) => {
        let fromToDate = {...dateFromTo};
        if(param === 'start'){
            fromToDate.start = e.target.value;
        }
        if(param === 'end'){
            fromToDate.end = e.target.value;
        }
        setDateFromTo(fromToDate);
    }

    return (
        <>
        <div className="body-content">
            <Header heading={!props.pendingData ? partyDetails.name : ""} {...props} />
            <div className='mr-minus'>
                <div className="usermanagement-main">
                    <p class="extra-stuff"><a className='anchor-link' onClick={()=>navigate(-1)}> <img src="/assets/images/back.svg" alt="" /> Back </a>

                        <div className='amount-dtl'>
                            {!props.pendingData ? <>   
                            {/* <p className='total-am'><span>Total Debit Amount : </span><label className='badge rounded-pill bg-text text-bg-primary xl-text'>₹{parseInt(totalAmount).toLocaleString("en-IN")}</label></p> */}
                     
                            <p className='total-am'><span>Total Amount : </span><label className={`badge rounded-pill bg-text ${(parseInt(totalWithoutGST))-(parseInt(totalPaidWithoutGSTSellDiffBuy))<0?"text-bg-success":"text-bg-danger"}  xl-text`}>{priceFormatter(makePositive(parseInt((totalWithoutGST) - (totalPaidWithoutGSTSellDiffBuy))))+`${(parseInt(totalWithoutGST))-(parseInt(totalPaidWithoutGSTSellDiffBuy))<0?" CR.":" DR."}`}</label></p>
                            <p className='total-am'><span>Total GST Amount : </span><label className={`badge rounded-pill bg-text ${(totalSellGST-totalBuyGST)-(totalPaidWithGSTSellDIffBuy)<0?"text-bg-success":"text-bg-danger"} xl-text`}>₹{makePositive(parseInt((totalSellGST-totalBuyGST)-totalPaidWithGSTSellDIffBuy)).toLocaleString("en-IN")+`${(totalSellGST-totalBuyGST)-(totalPaidWithGSTSellDIffBuy)<0?" CR.":" DR."}`}</label></p>
            
                                <p className='pending-am'><span>Total Pending Amount :</span><label className='badge rounded-pill bg-text text-bg-warning xl-text'>{parseInt(totalAmount)<0  ? priceFormatter(makePositive(makePositive(totalAmount)))+`${" CR."}`:priceFormatter(makePositive((makePositive(totalAmount))))+`${(makePositive(totalAmount))<0?" CR.":" DR."}`}</label></p></> : ""}
                        </div>
                    </p>
                    


                </div>
            </div>
            <div className="datatable-filter-wrap balance-filter-wrap">
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
                 
                <div className={`${!isDisplayDate?"d-none":"date-filter"}`}>
                    <label>From: <input
                        type="date"
                        name="from"
                        onChange={(e)=>handleChangeDate(e,'start')}
                        className="form-control"
                    /></label>
              
                      <label>To:   <input
                        type="date"
                        name="to"
                        onChange={(e)=>handleChangeDate(e,'end')}
                        className="form-control"
                    /></label>
                    <button className='btn btn-primary' onClick={()=>handleSearch()} type="button">Search</button>
                </div>       
            <PaySlip {...props} rowData={rowData} filterValue={valueFilter.value} partyid={partyid} />
                        
            <DataTable
                columns={columns}
                data={historyDetails}
                keyField={'key'}
                progressPending={props.pendingData}
                progressComponent={<CustomLoader />}
                paginationRowsPerPageOptions={[8, 25, 50, 100]}
                pagination
                paginationPerPage={8}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                expandableRowExpanded={row => row.defaultExpanded}
                onSort={handleSort}


            />
        </div>
             <Invoice {...props} rowData={rowData} partyData={partyDetails} />
             </>
    )
}
export default PartyHistory;
