import React from 'react'
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDate } from '../../actions/common';
import { deleteTransportRentList, getTransportRentList } from '../../actions/transportrent';
import ConfirmModal from '../../common/confirmModal';
import CustomLoader from '../Customloader';
import AddTransportRent from './AddTransportRent';
import EditTransportRent from './EditTransportRent';

const TransportRent = (props) => {
    const userId = props.auth.userdata.id;
    const transRentList = useSelector((state)=>state.transportRentReducer).transportRentList;
    const partyList = useSelector((state)=>state.balanceSheetReducer).partyList;
    const dispatch = useDispatch();
    const [filterText, setFilter] = useState("");
    const [transportRentList, setList] = useState([...transRentList]);
    const [transportRow,setTransportRow]= useState({});
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
                        <b>Destination:</b> {data.destination}
                    </p>
                    <p>
                        <b>Rate:</b> {"₹"+parseInt(data.rate).toLocaleString("en-IN")}
                    </p>
                    <p>
                        <b>Advance:</b> {"₹"+parseInt(data.advance).toLocaleString("en-IN")}
                    </p>
                    <p>
                        <b>Remaining amount:</b> {"₹"+parseInt(data.rate - data.advance).toLocaleString("en-IN")}
                    </p>
                    <p>
                        <b>Date:</b> {formatDate(data.date)}
                    </p>
                </>
            );
        } else if (window.innerWidth <= 959) {
            return (
                <>
               
                    <p>
                        <b>Rate:</b> {"₹"+parseInt(data.rate).toLocaleString("en-IN")}
                    </p>
                    <p>
                        <b>Advance:</b> {"₹"+parseInt(data.advance).toLocaleString("en-IN")}
                    </p>
                    <p>
                        <b>Remaining amount:</b> {"₹"+parseInt(data.rate - data.advance).toLocaleString("en-IN")}
                    </p>
                    <p>
                        <b>Date:</b> {formatDate(data.date)}
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
        dispatch(getTransportRentList(userId));
        if (window.innerWidth <= 599 || window.innerWidth <= 959) {
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
            setList([...tmp]);
        } else {
            setList([...transRentList]);
        }

    }, [filterText,transRentList]);

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
                            <div className="user-detail">{row.party}</div>
                        </div>
                    );
                },
                sortable: true,
                width: "250px",
            },
            {
                name: "Destination",
                selector: (row) => row.destination,
                sortable: true,
                // width: "200px",
                hide: "sm",
            },
          
            {
                name: "Rate",
                selector: (row) =>"₹"+parseInt(row.rate).toLocaleString("en-IN"),
                sortable: true,
                hide: "md",
            },
            {
                name: "Advance",
                selector: (row) => "₹"+parseInt(row.advance).toLocaleString("en-IN"),
                sortable: true,
                hide: "md",
            },
            {
                name: "Remaining Amount",
                selector: (row) => "₹"+parseInt(row.rate - row.advance).toLocaleString("en-IN"),
                sortable: true,
                hide: "md",
            },
            {
                name: "Date",
                selector: (row) => formatDate(row.date),
                sortable: true,
                hide: "md",
            },
            {
              name: "Description",
              selector: (row) => row.description,
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
                                            setTransportRow(row);
                                            setId(row.id);
                                            
                                        }}
                                            className="active-user"
                                            data-bs-toggle="modal"
                                            data-bs-target="#edittransportrent"
                                        >

                                         Edit
                                        </a>
                                           {/* <Link to={`/edittransportrent/${row.id}`}>
                                            Edit
                                    </Link> */}
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
                                    dispatch(deleteTransportRentList({id:row.id,name:row.party,user_id:userId}));
                                }}
                             
                            />
                        </ul>


                    );
                },
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
                            placeholder="Search transport rent..."
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
                                    data-bs-target="#addtransportrent"
                                >
                         
                                  Add Transport Rent
                                 
                                
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <AddTransportRent {...props} partyList={partyList} />
            <EditTransportRent {...props} row_data={transportRow} row_id={id} partyList={partyList} />
            <DataTable
                columns={columns}
                data={transportRentList}
                progressPending={props.pendingData}
                progressComponent={<CustomLoader/>}
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
export default TransportRent;
