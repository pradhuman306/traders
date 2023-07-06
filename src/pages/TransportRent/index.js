import React from 'react'
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate, makePositive, priceFormatter , titleCase} from '../../actions/common';
import { getRentHistoryByParty, getTransportRentList, setEmptyTransDetails } from '../../actions/transportrent';
import Header from '../Header/Header';
import AddTransportRent from './AddTransportRent';
import TransportDetails from './TransportDetails';

const TransportRent = (props) => {
    const userId = props.auth.userdata.id;
    const transRentList = useSelector((state) => state.transportRentReducer).transportRentList;
    const partyList = useSelector((state) => state.balanceSheetReducer).partyList;
    const dispatch = useDispatch();
    const [filterText, setFilter] = useState("");
    const [transportRentList, setList] = useState([...transRentList]);
    const [transportRow, setTransportRow] = useState({});
    const [partyDetails, setPartyDetails] = useState({});
    const [id, setId] = useState({});
    const [isExpandable, setisExpandable] = useState(false);
    const [totalPending, setTotalPending] = useState(0);
    const [totalAllPaid, setTotalAllPaid] = useState(0);



    // data provides access to your row data
    useEffect(() => {
        dispatch(setEmptyTransDetails());
    }, [])
    const ExpandedComponent = ({ data }) => {
    
        if (window.innerWidth <= 599) {
            let totalPaid = 0;
            if (data.rent_paid) {
                let rent_paid = JSON.parse(data.rent_paid);
                totalPaid = rent_paid.reduce((accumulator, object) => {
                    return accumulator + parseInt(object.amount);
                }, 0);
            }
            return (
                <>
                    <p>
                        <b>Total:</b>   <span className="badge rounded-pill bg-text text-bg-light">{priceFormatter(data.total_rent - totalPaid)}</span>
                    </p>
                  
                </>
            );
        } 
    };

    const sortBuyAmount = (transData) => {
        transData.sort(function(a, b) {
            let totalPaida = 0;
            let totalPaidb = 0;
            
            if (a.rent_paid) {
                let rent_paid = JSON.parse(a.rent_paid);
                totalPaida = rent_paid.reduce((accumulator, object) => {
                    return accumulator + parseInt(object.amount);
                }, 0);
            }
            if (b.rent_paid) {
                let rent_paid = JSON.parse(b.rent_paid);
                totalPaidb = rent_paid.reduce((accumulator, object) => {
                    return accumulator + parseInt(object.amount);
                }, 0);
            }
          var keyA = makePositive(parseInt(a.total_rent)-parseInt(totalPaida)),
            keyB = makePositive(parseInt(b.total_rent)-parseInt(totalPaidb));
       
          if (keyA > keyB) return -1;
          if (keyA < keyB) return 1;
          return 0;
        });
      }
    useEffect(() => {
        let tmp = partyList.filter((item) => item.id.toString() === transportRow.party_id);
    
        if (tmp.length) {
            setPartyDetails(tmp[0]);
        }
        if (Object.keys(transportRow).length) {
            let transList = transRentList.filter((item) => item.party_id.toString() == transportRow.party_id);
            if (transList.length) {
                setTransportRow(transList[0]);
            }
        }

     

    }, [transportRow, partyList, transRentList])

    var onresize = function () {
        //your code here
        //this is just an example
        if (window.innerWidth <= 599) {
            setisExpandable(true);
        } else {
            setisExpandable(false);
        }
    };
    window.addEventListener("resize", onresize);

    useEffect(() => {
        dispatch(getTransportRentList(userId));


        if (window.innerWidth <= 599) {
            setisExpandable(true);
        } else {
            setisExpandable(false);
        }

    }, []);

    useEffect(() => {
        if (filterText) {
            let tmp = transRentList.filter((item) => {
                if (
                    item.party?.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.destination?.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.rate?.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.advance?.toLowerCase().includes(filterText.toLowerCase()) ||
                    formatDate(item.date)?.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.description?.toLowerCase().includes(filterText.toLowerCase())
                ) {
                    return true;
                }
                return false;
            });
            sortBuyAmount(tmp);
      
            setList([...tmp]);
        } else {
           
            sortBuyAmount(transRentList);
       
            setList([...transRentList]);
        }
        let total = 0;
        let totalPaid = 0;
        transRentList.map((item) => {
            total += item.total_rent;

            if (item.rent_paid) {

                let rent_paid = JSON.parse(item.rent_paid);
                rent_paid.map((paid) => {
                    totalPaid += parseInt(paid.amount)
                })
            }
        })
        setTotalPending(total);
        setTotalAllPaid(totalPaid);
    }, [filterText, transRentList]);

    const hanndleSearch = (value) => {
        setFilter(value);
    };



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

                        <a className={`anchor ${transportRow.party_id === row.party_id ? 'active' : ""}`} onClick={
                            () => {
                                dispatch(getRentHistoryByParty(row.party_id, "1m"));
                                setTransportRow(row);

                            }
                        }>
                            <div className={`user-wrap`}>
                                {/* <h5 className="user-icon">{firstC.toUpperCase() + lastC}</h5> */}
                                <div className="user-detail">{titleCase(row.party)}</div>
                            </div>
                        </a>
                    );
                },
                sortable: true,

            },

            {
                name: "Total Amount",
                selector: (row) => {
                    let totalPaid = 0;
                    if (row.rent_paid) {
                        let rent_paid = JSON.parse(row.rent_paid);
                        totalPaid = rent_paid.reduce((accumulator, object) => {
                            return accumulator + parseInt(object.amount);
                        }, 0);
                    }
                    return (
                        <span className="badge rounded-pill bg-text text-bg-light">{priceFormatter(row.total_rent - totalPaid)}</span>
                    )

                },
                sortable: true,
                hide:"sm"
            },


        ],
        [transportRow]
    );

    return (
        <div className='ts-rent'>
            <Header heading="Transport Management" {...props} />
            <div className="mr-minus">
                <div className="usermanagement-main">
                    <div className="extra-stuff">
                        <div className="amount-dtl stock-am-dtl justify-content-end align-items-center">
                        <p className="pending-am">
                            
                            <span>Total Pending Amount</span>
                            <label className="badge rounded-pill bg-text text-bg-warning xl-text">{(priceFormatter(totalPending - totalAllPaid))}
                            </label>
                        </p>
                        <button
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#addtransportrent"
                        >
                            Add Transport
                        </button>
                    </div>
                    </div>
                </div>
            </div>
            <div className='row wrap-div'>
                <div className='col-lg-4 col-md-3'>
                    <div className="body-content st-fixed">
                        <div className="datatable-filter-wrap">
                            <div className="datatable-search w-100">
                                <input
                                    type="text"
                                    placeholder="Search parties..."
                                    className="form-control"
                                    onChange={(e) => hanndleSearch(e.target.value)}
                                />
                            </div>

                        </div>
                        <DataTable
                            columns={columns}
                            data={transportRentList}
                            expandableRows={isExpandable}
                            expandableRowsComponent={ExpandedComponent}
                        

                        />
                    </div>
                </div>
                <div className='col-lg-8 col-md-9'>
                    <TransportDetails transRentList={transRentList} partyDetails={partyDetails} {...props} transportRow={transportRow} totalPending={totalPending} totalAllPaid={totalAllPaid} />
                </div>
            </div>
            <AddTransportRent {...props} partyList={partyList} transportRow={transportRow} setTransportRow={setTransportRow} />
        </div>
    )
}
export default TransportRent;
