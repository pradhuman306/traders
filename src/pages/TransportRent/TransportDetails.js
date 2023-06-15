import React from 'react'
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { deleteAccount, getAccountDetails, getAccountList } from '../../actions/accounts';
import { deleteTransportRentList, getRentHistoryByParty, getTransportRentList } from '../../actions/transportrent';
import ConfirmModal from '../../common/confirmModal';
import CustomLoader from '../Customloader';
import { formatDate, priceFormatter , titleCase} from '../../actions/common';
import Select from 'react-select';
import { getItems } from '../../actions/items';
import AddTransportRent from './AddTransportRent';
import EditTransportRent from './EditTransportRent';
import { getParty, getPartyById } from '../../actions/balancesheet';
import Header from '../Header/Header';
import EditParty from '../BalanceSheet/EditParty';
import PayRent from './PayRent';


const TransportDetails = (props) => {
    const { transid } = useParams();
    const userId = props.auth.userdata.id;
    const partyList = useSelector((state) => state.balanceSheetReducer).partyList;
    const partySingle = useSelector((state) => state.balanceSheetReducer).partySingle;
    const transRentListAll = useSelector((state) => state.transportRentReducer).singletransportRent;
    const btnPending = useSelector((state) => state.balanceSheetReducer).pending;
    const [newListItems, setNewListItems] = useState([]);
    const [valueFilter, setValueFilter] = useState({});
    const [transportRow, setTransportRow] = useState({});
    const dispatch = useDispatch();
    const [filterText, setFilter] = useState("");
    const [transRentDetails, setList] = useState([...transRentListAll]);
    const [partySingleDetails, setPartySingle] = useState({ ...partySingle });
    const [id, setId] = useState("");
    const [isExpandable, setisExpandable] = useState(false);
    const [partyNameShort, setPartyShort] = useState("");
    const [isDisplayDate, setDisplayDate] = useState(false);
    const [dateFromTo, setDateFromTo] = useState({ start: "", end: "" });
    const [totalPaid, setTotalPaid] = useState(0);
    const [lastPaid, setLastPaid] = useState({});

    const handleSort = (column, sortDirection) =>
        console.log(column.selector, sortDirection);
    // data provides access to your row data

    useEffect(() => {

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
        setValueFilter(newFilterItems[0]);
        // dispatch(getRentHistoryByParty(transid,newFilterItems[0].value));
    }, [transid])

    useEffect(() => {
        let totalPaid = 0;
        if (props.transportRow.rent_paid) {
            let rent_paid = JSON.parse(props.transportRow.rent_paid);
            totalPaid = rent_paid.reduce((accumulator, object) => {
                return accumulator + parseInt(object.amount);
            }, 0);
            setLastPaid(rent_paid[rent_paid.length - 1]);
        } else {
            setLastPaid({});
        }
        setTotalPaid(totalPaid);
    }, [props.transRentList, props.transportRow])
    const handleSelectChange = (e) => {
        if (e && e.value != "custom") {
            dispatch(getRentHistoryByParty(props.transportRow.party_id, e.value));
            console.log(transid);
            setValueFilter(e);
            setDisplayDate(false);
        } else if (e.value === "custom") {
            setDisplayDate(true);
            setValueFilter(e);
        }
    }
    const handleSearch = () => {
        dispatch(getRentHistoryByParty(props.transportRow.party_id, 'custom', dateFromTo));

    }
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
    useEffect(() => {
        setPartySingle({ ...partySingle });
    }, [partySingle])



    const ExpandedComponent = ({ data }) => {
        // window.innerWidth <= 599 ? <></> : "";
        if (window.innerWidth <= 599) {
            return (
                <>
                    <p>
                        <b>Quantity:</b> {data.quantity}
                    </p>
                    <p>
                        <b>Weight:</b> {data.weight}
                    </p>
                    <p>
                        <b>Date:</b> {data.date}
                    </p>
                    <p>
                        <b>Vehicle:</b> {data.vehicle_no}
                    </p>
                    <p>
                        <b>Firm:</b> {data.firm}
                    </p>

                </>
            );
        } else if (window.innerWidth <= 959) {
            return (
                <>

                    <p>
                        <b>Weight:</b> {data.weight}
                    </p>
                    <p>
                        <b>Date:</b> {data.date}
                    </p>
                    <p>
                        <b>Vehicle:</b> {data.vehicle_no}
                    </p>
                    <p>
                        <b>Firm:</b> {data.firm}
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
        if (window.innerWidth <= 599 || window.innerWidth <= 959) {
            setisExpandable(true);
        } else {
            setisExpandable(false);
        }
        dispatch(getItems(userId));
    }, []);

    useEffect(() => {
        if (filterText) {
            let tmp = transRentListAll.filter((item) => {
                if (
                    item.destination?.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.rate?.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.weight?.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.advance?.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.description?.toLowerCase().includes(filterText.toLowerCase()) ||
                    formatDate(item.date)?.toLowerCase().includes(filterText.toLowerCase())
                ) {
                    return true;
                }
                return false;
            });
            setList([...tmp]);
        } else {

            setList([...transRentListAll]);
        }




    }, [filterText, transRentListAll]);

    const hanndleSearch = (value) => {
        setFilter(value);
    };

    // const hideColumns = () => {};

    const columns = useMemo(
        () => [

            {
                name: "Date",
                selector: (row) => formatDate(row.date),
                sortable: true,
                hide: "md",
            },
            {
                name: "Destination",
                selector: (row) => titleCase(row.destination),
                sortable: true,
                // width: "200px",
                hide: "sm",
            },

            {
                name: "Rate",

                sortable: true,
                hide: "md",
                selector: (row) => {
                    return (

                        <span className="badge rounded-pill bg-text text-bg-primary" >
                            {"₹" + parseInt(row.rate).toLocaleString("en-IN")}
                        </span>
                    );
                },
            },
            {
                name: "Weight",
                selector: (row) => row.weight + " qt",
                sortable: true,
                hide: "md",
            },
            {
                name: "Advance",
                selector: (row) => "₹" + parseInt(row.advance).toLocaleString("en-IN"),
                sortable: true,
                hide: "md",
            },
            {
                name: "Pending Amount",

                sortable: true,
                hide: "md",
                selector: (row) => {
                    return (

                        <span className="badge rounded-pill bg-text text-bg-light">
                            {"₹" + parseInt(row.rate * row.weight - row.advance).toLocaleString("en-IN")}
                        </span>
                    );
                },
            },



            {
                name: "Actions",
                width: "150px",
                selector: (row) => {
                    return (
                        <>
                            <ul className='action-replay'>
                                <li>
                                    <a onClick={(e) => {
                                        e.preventDefault();
                                        let newRow = row;

                                        newRow.party_name = props.transportRow.party;
                                        setTransportRow(newRow);
                                        setId(row.id);

                                    }}
                                        className="btn-sml"
                                        data-bs-toggle="modal"
                                        data-bs-target="#edittransportrent"
                                    >

                                        <svg className="nofill" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <mask id="path-1-outside-1_1154_12363" maskUnits="userSpaceOnUse" x="3" y="4" width="17" height="17" fill="black">
                                                <rect fill="white" x="3" y="4" width="17" height="17"></rect>
                                                <path d="M13.5858 7.41421L6.39171 14.6083C6.19706 14.8029 6.09974 14.9003 6.03276 15.0186C5.96579 15.1368 5.93241 15.2704 5.86564 15.5374L5.20211 18.1915C5.11186 18.5526 5.06673 18.7331 5.16682 18.8332C5.2669 18.9333 5.44742 18.8881 5.80844 18.7979L5.80845 18.7979L8.46257 18.1344C8.72963 18.0676 8.86316 18.0342 8.98145 17.9672C9.09974 17.9003 9.19706 17.8029 9.39171 17.6083L16.5858 10.4142L16.5858 10.4142C17.2525 9.74755 17.5858 9.41421 17.5858 9C17.5858 8.58579 17.2525 8.25245 16.5858 7.58579L16.4142 7.41421C15.7475 6.74755 15.4142 6.41421 15 6.41421C14.5858 6.41421 14.2525 6.74755 13.5858 7.41421Z"></path>
                                            </mask>
                                            <path d="M6.39171 14.6083L7.80593 16.0225L7.80593 16.0225L6.39171 14.6083ZM13.5858 7.41421L12.1716 6L12.1716 6L13.5858 7.41421ZM16.4142 7.41421L15 8.82843L15 8.82843L16.4142 7.41421ZM16.5858 7.58579L18 6.17157L18 6.17157L16.5858 7.58579ZM16.5858 10.4142L18 11.8284L16.5858 10.4142ZM9.39171 17.6083L7.9775 16.1941L7.9775 16.1941L9.39171 17.6083ZM5.86564 15.5374L7.80593 16.0225L7.80593 16.0225L5.86564 15.5374ZM5.20211 18.1915L3.26183 17.7065H3.26183L5.20211 18.1915ZM5.80845 18.7979L5.32338 16.8576L5.23624 16.8794L5.15141 16.9089L5.80845 18.7979ZM8.46257 18.1344L7.97751 16.1941L7.9775 16.1941L8.46257 18.1344ZM5.16682 18.8332L6.58103 17.419L6.58103 17.419L5.16682 18.8332ZM5.80844 18.7979L6.29351 20.7382L6.38065 20.7164L6.46549 20.6869L5.80844 18.7979ZM8.98145 17.9672L7.99605 16.2268L7.99605 16.2268L8.98145 17.9672ZM16.5858 10.4142L18 11.8284L18 11.8284L16.5858 10.4142ZM6.03276 15.0186L4.29236 14.0332L4.29236 14.0332L6.03276 15.0186ZM7.80593 16.0225L15 8.82843L12.1716 6L4.9775 13.1941L7.80593 16.0225ZM15 8.82843L15.1716 9L18 6.17157L17.8284 6L15 8.82843ZM15.1716 9L7.9775 16.1941L10.8059 19.0225L18 11.8284L15.1716 9ZM3.92536 15.0524L3.26183 17.7065L7.1424 18.6766L7.80593 16.0225L3.92536 15.0524ZM6.29352 20.7382L8.94764 20.0746L7.9775 16.1941L5.32338 16.8576L6.29352 20.7382ZM3.26183 17.7065C3.233 17.8218 3.15055 18.1296 3.12259 18.4155C3.0922 18.7261 3.06509 19.5599 3.7526 20.2474L6.58103 17.419C6.84671 17.6847 6.99914 18.0005 7.06644 18.2928C7.12513 18.5478 7.10965 18.7429 7.10358 18.8049C7.09699 18.8724 7.08792 18.904 7.097 18.8631C7.10537 18.8253 7.11788 18.7747 7.1424 18.6766L3.26183 17.7065ZM5.15141 16.9089L5.1514 16.9089L6.46549 20.6869L6.46549 20.6869L5.15141 16.9089ZM5.32338 16.8576C5.22531 16.8821 5.17467 16.8946 5.13694 16.903C5.09595 16.9121 5.12762 16.903 5.19506 16.8964C5.25712 16.8903 5.45223 16.8749 5.70717 16.9336C5.99955 17.0009 6.31535 17.1533 6.58103 17.419L3.7526 20.2474C4.44011 20.9349 5.27387 20.9078 5.58449 20.8774C5.87039 20.8494 6.17822 20.767 6.29351 20.7382L5.32338 16.8576ZM7.9775 16.1941C7.95279 16.2188 7.9317 16.2399 7.91214 16.2593C7.89271 16.2787 7.87671 16.2945 7.86293 16.308C7.84916 16.3215 7.83911 16.3312 7.83172 16.3382C7.82812 16.3416 7.82545 16.3441 7.8236 16.3458C7.82176 16.3475 7.8209 16.3483 7.82092 16.3482C7.82094 16.3482 7.82198 16.3473 7.82395 16.3456C7.82592 16.3439 7.82893 16.3413 7.83291 16.338C7.84086 16.3314 7.85292 16.3216 7.86866 16.3098C7.88455 16.2979 7.90362 16.2843 7.92564 16.2699C7.94776 16.2553 7.97131 16.2408 7.99605 16.2268L9.96684 19.7076C10.376 19.476 10.6864 19.1421 10.8059 19.0225L7.9775 16.1941ZM8.94764 20.0746C9.11169 20.0336 9.55771 19.9393 9.96685 19.7076L7.99605 16.2268C8.02079 16.2128 8.0453 16.2001 8.06917 16.1886C8.09292 16.1772 8.11438 16.1678 8.13277 16.1603C8.15098 16.1529 8.16553 16.1475 8.17529 16.1441C8.18017 16.1424 8.18394 16.1412 8.18642 16.1404C8.1889 16.1395 8.19024 16.1391 8.19026 16.1391C8.19028 16.1391 8.18918 16.1395 8.18677 16.1402C8.18435 16.1409 8.18084 16.1419 8.17606 16.1432C8.16625 16.1459 8.15278 16.1496 8.13414 16.1544C8.11548 16.1593 8.09368 16.1649 8.0671 16.1716C8.04034 16.1784 8.0114 16.1856 7.97751 16.1941L8.94764 20.0746ZM15.1716 9C15.3435 9.17192 15.4698 9.29842 15.5738 9.40785C15.6786 9.518 15.7263 9.57518 15.7457 9.60073C15.7644 9.62524 15.7226 9.57638 15.6774 9.46782C15.6254 9.34332 15.5858 9.18102 15.5858 9H19.5858C19.5858 8.17978 19.2282 7.57075 18.9258 7.1744C18.6586 6.82421 18.2934 6.46493 18 6.17157L15.1716 9ZM18 11.8284L18 11.8284L15.1716 8.99999L15.1716 9L18 11.8284ZM18 11.8284C18.2934 11.5351 18.6586 11.1758 18.9258 10.8256C19.2282 10.4292 19.5858 9.82022 19.5858 9H15.5858C15.5858 8.81898 15.6254 8.65668 15.6774 8.53218C15.7226 8.42362 15.7644 8.37476 15.7457 8.39927C15.7263 8.42482 15.6786 8.482 15.5738 8.59215C15.4698 8.70157 15.3435 8.82807 15.1716 9L18 11.8284ZM15 8.82843C15.1719 8.6565 15.2984 8.53019 15.4078 8.42615C15.518 8.32142 15.5752 8.27375 15.6007 8.25426C15.6252 8.23555 15.5764 8.27736 15.4678 8.32264C15.3433 8.37455 15.181 8.41421 15 8.41421V4.41421C14.1798 4.41421 13.5707 4.77177 13.1744 5.07417C12.8242 5.34136 12.4649 5.70664 12.1716 6L15 8.82843ZM17.8284 6C17.5351 5.70665 17.1758 5.34136 16.8256 5.07417C16.4293 4.77177 15.8202 4.41421 15 4.41421V8.41421C14.819 8.41421 14.6567 8.37455 14.5322 8.32264C14.4236 8.27736 14.3748 8.23555 14.3993 8.25426C14.4248 8.27375 14.482 8.32142 14.5922 8.42615C14.7016 8.53019 14.8281 8.6565 15 8.82843L17.8284 6ZM4.9775 13.1941C4.85793 13.3136 4.52401 13.624 4.29236 14.0332L7.77316 16.0039C7.75915 16.0287 7.7447 16.0522 7.73014 16.0744C7.71565 16.0964 7.70207 16.1155 7.69016 16.1313C7.67837 16.1471 7.66863 16.1591 7.66202 16.1671C7.65871 16.1711 7.65613 16.1741 7.65442 16.1761C7.65271 16.178 7.65178 16.1791 7.65176 16.1791C7.65174 16.1791 7.65252 16.1782 7.65422 16.1764C7.65593 16.1745 7.65842 16.1719 7.66184 16.1683C7.66884 16.1609 7.67852 16.1508 7.692 16.1371C7.7055 16.1233 7.72132 16.1073 7.74066 16.0879C7.76013 16.0683 7.78122 16.0472 7.80593 16.0225L4.9775 13.1941ZM7.80593 16.0225C7.8144 15.9886 7.82164 15.9597 7.82839 15.9329C7.8351 15.9063 7.84068 15.8845 7.84556 15.8659C7.85043 15.8472 7.85407 15.8337 7.8568 15.8239C7.85813 15.8192 7.85914 15.8157 7.85984 15.8132C7.86054 15.8108 7.86088 15.8097 7.86088 15.8097C7.86087 15.8098 7.86046 15.8111 7.85965 15.8136C7.85884 15.8161 7.85758 15.8198 7.85588 15.8247C7.85246 15.8345 7.84713 15.849 7.8397 15.8672C7.8322 15.8856 7.82284 15.9071 7.81141 15.9308C7.79993 15.9547 7.78717 15.9792 7.77316 16.0039L4.29236 14.0332C4.06071 14.4423 3.96637 14.8883 3.92536 15.0524L7.80593 16.0225Z" fill="#8F99B3" mask="url(#path-1-outside-1_1154_12363)"></path>
                                            <path d="M12.5 7.5L15.5 5.5L18.5 8.5L16.5 11.5L12.5 7.5Z" fill="#8F99B3"></path>
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={(e) => {
                                        e.preventDefault();
                                    }}
                                        className="btn-sml"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#confirm_${row.id}`}
                                    >



                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 15L10 12" stroke="#8F99B3" strokeWidth="2" strokeLinecap="round"></path>
                                            <path d="M14 15L14 12" stroke="#8F99B3" strokeWidth="2" strokeLinecap="round"></path>
                                            <path d="M3 7H21V7C20.0681 7 19.6022 7 19.2346 7.15224C18.7446 7.35523 18.3552 7.74458 18.1522 8.23463C18 8.60218 18 9.06812 18 10V16C18 17.8856 18 18.8284 17.4142 19.4142C16.8284 20 15.8856 20 14 20H10C8.11438 20 7.17157 20 6.58579 19.4142C6 18.8284 6 17.8856 6 16V10C6 9.06812 6 8.60218 5.84776 8.23463C5.64477 7.74458 5.25542 7.35523 4.76537 7.15224C4.39782 7 3.93188 7 3 7V7Z" stroke="#8F99B3" strokeWidth="2" strokeLinecap="round"></path>
                                            <path d="M10.0681 3.37059C10.1821 3.26427 10.4332 3.17033 10.7825 3.10332C11.1318 3.03632 11.5597 3 12 3C12.4403 3 12.8682 3.03632 13.2175 3.10332C13.5668 3.17033 13.8179 3.26427 13.9319 3.37059" stroke="#8F99B3" strokeWidth="2" strokeLinecap="round"></path>
                                        </svg>
                                    </a>
                                    <ConfirmModal
                                        id={row.id}
                                        name={""}
                                        yes={(id) => {
                                            dispatch(deleteTransportRentList({ id: row.id, name: "", user_id: userId, party_id: row.party }));
                                        }}

                                    />
                                </li>
                            </ul>


                        </>

                    );
                },
            },
        ],
        [props.transportRow]
    );

    useEffect(() => {
        if (props.transportRow.party) {
            let newName = props.transportRow.party.split(" ");
            let firstC = newName[0][0];
            let lastC = "";
            if (newName[1]) {
                lastC = newName[1][0].toUpperCase();
            }
            setPartyShort(firstC + lastC);
        }
    }, [props.transportRow])
    return (
        <div className="body-content">
            <div className="usermanagement-main">

                {props.transportRow.party ?

                    <div className='row'>

                        <div className='col-md-12'>
                            <div className="nav inline-div">
                                <div className='two-row-content'>
                                    <div className={`user-wrap`}>
                                        <h5 className="user-icon">{partyNameShort}</h5>
                                        <div className="user-detail">
                                            <span className='pay-rent-btn'>{titleCase(props.transportRow.party)}
                                                <button
                                                    className={`${totalPaid >= props.transportRow.total_rent ? "anchor pay-btn paid-btn" : "anchor pay-btn"}`}
                                                    data-bs-toggle={`${totalPaid >= props.transportRow.total_rent ? false : "modal"}`}
                                                    data-bs-target={`${totalPaid >= props.transportRow.total_rent ? false : "#payRent"}`}
                                                >
                                                    {totalPaid >= props.transportRow.total_rent ? "Paid" : "Pay"}
                                                </button></span>
                                            <div className='user-payment'>{lastPaid.amount ? `Last paid on` : ""} {lastPaid.amount ? <b>{formatDate(lastPaid.date)}</b> : ""} {lastPaid.amount ? `amount was` : ""} {lastPaid.amount ? <b>{priceFormatter(lastPaid.amount)}</b> : ""}</div>
                                        </div>

                                    </div>



                                    <p className='total-am'><span>Pending Amount   </span> <label className='badge rounded-pill bg-text text-bg-warning xl-text'>{"₹" + parseInt(props.transportRow.total_rent - totalPaid).toLocaleString("en-IN")}</label></p>
                                    {/* <div className="datatable-filter-right">
                                        {props.transportRow.party_id ?
                                            <ul className="btn-group">
                                                <li>

                                                    
                                                </li>
                                                { <li>
                                                    <button
                                                        className="btn btn-primary"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#addtransportrent"
                                                    >
                                                        Add Transport
                                                    </button>
                                                </li> }
                                                </ul> : ""}
                                    </div> */}
                                </div>

                            </div>
                        </div>

                    </div>
                    : ""}
                {props.transportRow.party ? <div><div className="datatable-filter-wrap">
                    <div className="datatable-search">
                        <input
                            type="text"
                            placeholder="Search transport details..."
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
                                    primary25: 'rgb(0 120 219 / 10%);',
                                    primary: '#0078db',
                                },
                            })}
                        />

                    </div>

                </div><div className={`${!isDisplayDate ? "d-none" : "date-filter"}`}>
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
                    </div></div> : ""}
            </div>

            <EditTransportRent {...props} row_data={transportRow} row_id={id} partyList={partyList} />
            <EditParty {...props} row_id={props.partyDetails.id} row_data={props.partyDetails} btnPending={btnPending} />
            <PayRent {...props} row_data={props.transportRow} filterValue={valueFilter} userId={userId} pendingAmount={parseInt(props.transportRow.total_rent - totalPaid)} />


            <DataTable
                columns={columns}
                data={transRentDetails}
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
export default TransportDetails;
