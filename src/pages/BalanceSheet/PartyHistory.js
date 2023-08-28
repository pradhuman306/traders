import React from 'react'
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import CustomLoader from '../Customloader';
import { getAllPartyHistory, getPartyById } from '../../actions/balancesheet';
import { formatDate, gstCalculate, makePositive, titleCase, priceFormatter, totalAmountBuy, totalAmountCalculateRaw, totalAmountSell, dataFormatCSV } from '../../actions/common';
import Select from 'react-select';
import Header from '../Header/Header';
import PaySlip from './PaySlip';
import { useNavigate } from 'react-router-dom';
import Invoice from '../Invoice';
import { CSVLink, CSVDownload } from "react-csv";




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
    const [totalPaidWithGSTSellDIffBuy, setTotalPaidWithGSTSellDIffBuy] = useState(0);
    const [isDisplayDate, setDisplayDate] = useState(false);
    const [dateFromTo, setDateFromTo] = useState({ start: "", end: "" });

    const sortByPendingAmount = (data) => {
        data.sort(function(a, b) {
            // let totalAmount1 = parseInt(totalAmountCalculateRaw(a) + gstCalculate(totalAmountCalculateRaw(a), a.gst));
            // let totalAmount2 = parseInt(totalAmountCalculateRaw(b) + gstCalculate(totalAmountCalculateRaw(b), b.gst));
            let toalPaid1 = 0;
            let toalPaid2 = 0;
            let totalAmount1 = totalAmountCalculateRaw(a) + gstCalculate(totalAmountCalculateRaw(a), a.gst);
            if (a.paid) {
                let paidData = JSON.parse(a.paid);
                paidData.map(element => {
                    toalPaid1 += parseInt(element.amount);
                }
                );
            }
            let totalAmount2 = totalAmountCalculateRaw(b) + gstCalculate(totalAmountCalculateRaw(b), b.gst);
            if (b.paid) {
                let paidData = JSON.parse(b.paid);
                paidData.map(element => {
                    toalPaid2 += parseInt(element.amount);
                }
                );
            }
            totalAmount1 = totalAmount1 - toalPaid1;
            totalAmount2 = totalAmount2 - toalPaid2;
          var keyA = parseInt(totalAmount1),
            keyB = parseInt(totalAmount2);
       
          if (keyA > keyB) return -1;
          if (keyA < keyB) return 1;
          return 0;
        });
      }
  
  

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
        let totalPaidWithoutGST = 0;
        let totalPaidWithoutGSTBuy = 0;
        let totalPaidWithoutGSTSell = 0;
        let totalPaidBuyGST = 0;
        let totalPaidSellGST = 0;
        historyDetailsAll.forEach((row) => {
            totalAmountWithoutGSTBuy += parseInt(totalAmountBuy(row));
            totalAmountWithoutGSTSell += parseInt(totalAmountSell(row));

            totalSellAmount += parseInt(totalAmountSell(row) + gstCalculate(totalAmountSell(row), row.gst));
            totalBuyAmount += parseInt(totalAmountBuy(row) + gstCalculate(totalAmountBuy(row), row.gst));
            totalBuyGSTAmount += row.type == 'Buy' ? parseInt(gstCalculate(totalAmountCalculateRaw(row), row.gst)) : 0;
            totalGSTAmount += parseInt(gstCalculate(totalAmountCalculateRaw(row), row.gst));
            if (row.paid) {
                let paidAmountData = JSON.parse(row.paid);
                paidAmountData.forEach((item) => {
                    if (row.type == "Buy") {
                        if (item.type == "main") {
                            totalPaidWithoutGST += parseInt(item.amount)
                            totalPaidWithoutGSTBuy += parseInt(item.amount)
                        } else {
                            totalPaidBuyGST += parseInt(item.amount);
                        }

                        totalBuyAmount -= parseInt(item.amount);
                    } else {
                        if (item.type == "main") {
                            totalPaidWithoutGST += parseInt(item.amount)
                            totalPaidWithoutGSTSell += parseInt(item.amount)

                        } else {
                            totalPaidSellGST += parseInt(item.amount);
                        }
                        totalSellAmount -= parseInt(item.amount);
                    }
                    totalPaid += parseInt(item.amount);
                })
            }
        })
     
        totalAmount = totalSellAmount - totalBuyAmount;
      
        setTotalPaidWithoutGST(totalPaidWithoutGST);
        setTotalPaidWithoutGSTSellDiffBuy(totalPaidWithoutGSTSell - totalPaidWithoutGSTBuy);
        setTotalPaidWithGST(totalPaid - totalPaidWithoutGST);
        setTotalWithoutGST((totalAmountWithoutGSTSell - totalAmountWithoutGSTBuy));
        setTotalSellGST(totalGSTAmount - totalBuyGSTAmount);
        setTotalBuyGST(totalBuyGSTAmount);
        setTotalAmount(totalAmount);
        setTotalGST(totalGSTAmount);
        setTotalPaid(totalPaid);
        setTotalPaidWithGSTSellDIffBuy(totalPaidSellGST - totalPaidBuyGST);
    }, [historyDetailsAll]);

    const handleSearch = () => {
        dispatch(getPartyById(partyid, 'custom', dateFromTo));
    }


    useEffect(() => {
        setPartyDetails({ ...partySingle });
    }, [partySingle])

    const ExpandedComponent = ({ data }) => {
      
        return (
            <>
                <div className='datatable-dtllist'>



                    <p className='inline'>
                        <b>Main amount:</b> {"₹" + parseInt((data.amount)).toLocaleString("en-IN")}
                    </p>
                    <p className='inline'>
                        <b>GST amount:</b> <div className="user-detail xl-text sm-font"> {priceFormatter(parseInt(gstCalculate(totalAmountCalculateRaw(data), data.gst)))}<div className='bysellopt'> <span className='badge rounded-pill text-bg-primary'>{data.gst != "" ? data.gst : "0"}%</span></div> </div>

                    </p>

                

          {window.innerWidth <= 599  ? <p>
            <span className="">
                            {data.type === 'Sale' ? <><b>Debit: </b><span className='debit'>{priceFormatter(totalAmountCalculateRaw(data))}</span></> : ""}
                        </span>
                        <span className="">
                            {data.type === 'Buy' ? <><b>Credit: </b><span className='credit'>{priceFormatter(totalAmountCalculateRaw(data))}</span></> : ""}
                        </span>
                        <ul className='action-replay with-fill'>
                               <b>Invoice:  </b> <li>    <a
                                    className='btn-sml'
                                    onClick={() => setRowData(data)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#invoice"
                                >
                                    <svg className='no-fill' fill="rgb(143, 153, 179)" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15,8a1,1,0,0,1-1,1H6A1,1,0,0,1,6,7h8A1,1,0,0,1,15,8Zm-1,3H6a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2Zm-4,4H6a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2Zm13-3v8a3,3,0,0,1-3,3H4a3,3,0,0,1-3-3V4A3,3,0,0,1,4,1H16a3,3,0,0,1,3,3v7h3A1,1,0,0,1,23,12ZM17,4a1,1,0,0,0-1-1H4A1,1,0,0,0,3,4V20a1,1,0,0,0,1,1H17Zm4,9H19v8h1a1,1,0,0,0,1-1Z" /></svg>
                                </a></li>


                            </ul>
            
          </p>:window.innerWidth <= 959 ? <p>
          <span className="">
                            {data.type === 'Sale' ? <><b>Debit: </b><span className='debit'>{priceFormatter(totalAmountCalculateRaw(data))}</span></> : ""}
                        </span>
                        <span className="">
                            {data.type === 'Buy' ? <><b>Credit: </b><span className='credit'>{priceFormatter(totalAmountCalculateRaw(data))}</span></> : ""}
                        </span>
          </p>:""}

          
  
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
        }, {
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
        } else if (e.value === "custom") {
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
                    item.type.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.bill_no.toLowerCase().includes(filterText.toLowerCase())
                ) {
                    return true;
                }
                return false;
            });
            sortByPendingAmount(tmp);
            setList([...tmp]);
        } else {
            sortByPendingAmount(partyHistoryAll);
            setList([...partyHistoryAll]);
        }
        setHistoryAll([...partyHistoryAllData])
    }, [filterText, partyHistoryAll, partyHistoryAllData]);

    const hanndleSearch = (value) => {
        setFilter(value);
    };

   

    const columns = useMemo(
        () => [

            {
                name: "Item",
                sortable: true,
                selector: (row) => {
                    return (
                        <>
                            <div className="user-detail xl-text">{titleCase(row.item)}  <div className='bysellopt'>{row.type === 'Buy' ? <span className='badge rounded-pill text-bg-primary'>Buy</span> : <span className='badge rounded-pill text-bg-danger'>Sell</span>}</div></div>
                            <div className='c-date'>{formatDate(row.date?.split(" ")[0])}</div>
                      
                        </>

                    );
                },

            },

            {
                name: "Bill no",
                sortable: true,
                selector: (row) => {
                    return (
                        <>
                            <div className="user-detail">{row.bill_no}</div>
                          
                        </>

                    );
                },

            },


            {
                name: "Firm",
                sortable: true,
                selector: (row) => {
                    return (
                        <>
                            <div className="user-detail">{row.firm_name}</div>
                          
                        </>

                    );
                },

            },


            {
                name: "Debit",
                sortable: true,
                hide: "md",
                width: "150px",
                selector: (row) => totalAmountCalculateRaw(row),
                cell: (row) => {
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
                selector: (row) => totalAmountCalculateRaw(row),
                cell: (row) => {
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
                selector: (row) => totalAmountCalculateRaw(row) + gstCalculate(totalAmountCalculateRaw(row), row.gst),
                cell: (row) => {
                    let toalPaid = 0;
                    let totalAmount = totalAmountCalculateRaw(row) + gstCalculate(totalAmountCalculateRaw(row), row.gst);
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
               
                selector: (row) => {
                    let toalPaid = 0;
                    let totalAmount = totalAmountCalculateRaw(row) + gstCalculate(totalAmountCalculateRaw(row), row.gst);
                    if (row.paid) {
                        let paidData = JSON.parse(row.paid);
                        paidData.map(element => {
                            toalPaid += parseInt(element.amount);
                        }
                        );
                    }
                    return (

                        <a
                            className={`anchor pay-btn ${parseInt(totalAmount - toalPaid) == 0 ? "paid-btn" : ""}`}
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
                hide: "sm",
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
    const handleChangeDate = (e, param) => {
        let fromToDate = { ...dateFromTo };
        if (param === 'start') {
            fromToDate.start = e.target.value;
        }
        if (param === 'end') {
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
                        <div className="extra-stuff">

                           

                            <div className='amount-dtl'>
                                {!props.pendingData ? <>
                                

                                    <p className='total-am'><span>Total Amount  </span><label className={`badge rounded-pill bg-text ${(parseInt(totalWithoutGST)) - (parseInt(totalPaidWithoutGSTSellDiffBuy)) < 0 ? " text-bg-success" : " text-bg-danger"} xl-text`}>{priceFormatter(makePositive(parseInt((totalWithoutGST) - (totalPaidWithoutGSTSellDiffBuy)))) + `${(parseInt(totalWithoutGST)) - (parseInt(totalPaidWithoutGSTSellDiffBuy)) < 0 ? " CR." : " DR."}`}</label></p>
                                    <p className='total-am'><span>Total GST Amount  </span><label className={`badge rounded-pill bg-text ${(totalSellGST - totalBuyGST) - (totalPaidWithGSTSellDIffBuy) < 0 ? " text-bg-success" : " text-bg-danger"} xl-text`}>₹{makePositive(parseInt((totalSellGST - totalBuyGST) - totalPaidWithGSTSellDIffBuy)).toLocaleString("en-IN") + `${(totalSellGST - totalBuyGST) - (totalPaidWithGSTSellDIffBuy) < 0 ? " CR." : " DR."}`}</label></p>
                                {partyDetails.expense? <p className='total-am'><span>Total Pending Expense  </span><label className={`badge rounded-pill bg-text text-bg-success xl-text`}>₹{makePositive(parseInt(partyDetails.expense)).toLocaleString("en-IN") + `${partyDetails.expense > 0 ? " CR." : " DR."}`}</label></p>:""}   
                                    
                                    <p className='pending-am'><span>Total Pending Amount </span><label className='badge rounded-pill bg-text text-bg-warning xl-text'>{parseInt(totalAmount) < 0 ? priceFormatter(makePositive(makePositive(totalAmount))) + `${" CR."}` : priceFormatter(makePositive((makePositive(totalAmount)))) + `${(makePositive(totalAmount)) < 0 ? " CR." : " DR."}`}</label></p></> : ""}
                            </div>
                        </div>



                    </div>
                </div>
         
                <div className="datatable-filter-wrap investment-f-wrap balance-filter-wrap">
                    <div className="datatable-search">
                        <input
                            type="text"
                            placeholder="Search history..."
                            className="form-control"
                            onChange={(e) => hanndleSearch(e.target.value)}
                        />
                    </div>
                    <div className='select-filter form-group'>
                   <div>     <CSVLink data={dataFormatCSV(historyDetails, titleCase(partyDetails.name), 'balanceHistory')} filename={`${partyDetails.name?.replace(" ", "_")}.csv`}
                    className="btn btn-success download-svg">
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
 preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M830 5104 c-42 -18 -86 -58 -108 -99 -15 -27 -17 -109 -20 -871 l-3
-842 -92 -4 c-112 -5 -179 -32 -235 -92 -81 -88 -77 -39 -77 -946 0 -801 0
-805 21 -851 54 -116 140 -169 291 -177 l92 -5 3 -536 c3 -588 1 -562 65 -623
65 -62 -61 -58 1793 -58 1854 0 1728 -4 1793 58 64 61 62 35 65 623 l3 536 92
5 c151 8 237 61 291 177 21 46 21 50 21 851 0 907 4 858 -77 946 -56 60 -123
87 -235 92 l-93 4 -1 302 c-1 165 -4 312 -8 326 -8 30 -994 1160 -1033 1184
-24 15 -138 16 -1270 16 -1088 -1 -1247 -3 -1278 -16z m2400 -714 l0 -530 29
-32 29 -33 466 -3 466 -3 0 -249 0 -250 -1660 0 -1660 0 0 815 0 815 1165 0
1165 0 0 -530z m-1620 -1310 c119 -15 220 -46 220 -68 0 -20 -56 -242 -63
-248 -2 -3 -40 5 -83 18 -111 31 -281 31 -374 -1 -200 -68 -300 -222 -301
-463 0 -254 107 -410 325 -473 98 -29 276 -20 412 20 20 6 22 -1 43 -107 12
-62 24 -121 27 -130 14 -49 -281 -96 -485 -77 -130 12 -200 31 -306 83 -108
54 -188 122 -250 216 -158 238 -167 604 -20 865 152 271 479 410 855 365z
m1120 -5 c100 -15 220 -51 220 -66 0 -4 -16 -67 -36 -138 l-37 -130 -50 20
c-113 45 -276 62 -362 38 -22 -6 -56 -28 -77 -49 -33 -32 -38 -44 -38 -83 0
-80 49 -119 248 -201 142 -58 184 -79 250 -128 171 -127 213 -366 98 -563 -94
-160 -343 -249 -625 -225 -159 14 -331 64 -331 96 0 8 14 71 31 140 26 103 35
125 48 120 9 -3 54 -19 101 -35 98 -34 243 -55 315 -45 131 17 201 97 175 195
-16 58 -80 108 -206 158 -304 122 -415 223 -443 402 -53 333 280 562 719 494z
m760 -27 c21 -47 239 -830 275 -983 20 -88 38 -162 40 -164 4 -4 16 38 49 181
28 119 97 363 209 738 l73 245 177 3 c138 2 177 0 177 -10 0 -7 -111 -345
-247 -750 l-248 -738 -200 0 -200 0 -238 743 c-130 408 -237 745 -237 750 0 4
81 7 180 7 178 0 181 0 190 -22z m730 -2308 l0 -480 -1660 0 -1660 0 0 480 0
480 1660 0 1660 0 0 -480z" fill="#fff"/>
</g>
</svg>
                        </CSVLink></div>
                           
                        <Select
                            options={newListItems}
                            onChange={(e) => handleSelectChange(e)}
                            value={valueFilter}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 8,
                                colors: {
                                    ...theme.colors,
                                    primary25: 'rgb(0 120 219 / 10%);',
                                    primary: '#0078db',
                                },
                            })}
                        />
                    </div>
                </div>
          

                <div className={`${!isDisplayDate ? "d-none" : "date-filter"}`}>
                    <label>From: <input
                        type="date"
                        name="from"
                        onChange={(e) => handleChangeDate(e, 'start')}
                        className="form-control"
                    /></label>

                    <label>To:   <input
                        type="date"
                        name="to"
                        onChange={(e) => handleChangeDate(e, 'end')}
                        className="form-control"
                    /></label>
                    <button className='btn btn-primary' onClick={() => handleSearch()} type="button">Search</button>
                </div>
                <PaySlip {...props} rowData={rowData} filterValue={valueFilter.value} partyid={partyid} />

           

                <DataTable
                    columns={columns}
                    data={historyDetails}
                    keyField={'key'}
                    progressPending={props.pendingData}
                    progressComponent={<CustomLoader />}
                    paginationRowsPerPageOptions={[8, 30, 50, 100]}
                    pagination
                    paginationPerPage={30}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                    expandableRowExpanded={row => row.defaultExpanded}
                   


                />
            </div>
            <Invoice {...props} rowData={rowData} partyData={partyDetails} />
        </>
    )
}
export default PartyHistory;
