import React from 'react'
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteParty, getParty } from '../../actions/balancesheet';
import { deleteTransportRentList, getTransportRentList } from '../../actions/transportrent';
import ConfirmModal from '../../common/confirmModal';
import CustomLoader from '../Customloader';

const BalanceSheet = (props) => {
    const userId = props.auth.userdata.id;
    const partyData = useSelector((state)=>state.balanceSheetReducer).partyList;
    const dispatch = useDispatch();
    const [filterText, setFilter] = useState("");
    const [partyList, setList] = useState([...partyData]);
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
                        <b>Party name:</b> {data.email}
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
        dispatch(getParty(userId));
        if (window.innerWidth <= 599 || window.innerWidth <= 959) {
            setisExpandable(true);
        } else {
            setisExpandable(false);
        }
    }, []);

    useEffect(() => {
        if (filterText) {
            let tmp = partyList.filter((item) => {
                if (
                    item.name?.toLowerCase().includes(filterText.toLowerCase()) 
                ) {
                    return true;
                }
                return false;
            });
            setList([...tmp]);
        } else {
            setList([...partyData]);
        }
    }, [filterText,partyData]);

    const hanndleSearch = (value) => {
        setFilter(value);
    };

    // const hideColumns = () => {};

    const columns = useMemo(
        () => [

            {
                name: "Party",
                selector: (row) => {
                    let newName = row.name.split(" ");
                    let firstC = newName[0][0];
                    let lastC = "";
                    if (newName[1]) {
                        lastC = newName[1][0].toUpperCase();
                    }
                    return (
                      <Link to="">
                        <div className="user-wrap">
                            <h5 className="user-icon">{firstC.toUpperCase() + lastC}</h5>
                            <div className="user-detail">{row.name}</div>
                        </div>
                        </Link>
                    );
                },
                sortable: true,
                width: "50%",
            },

            {
              name: "Mobile",
              selector: (row) => row.mobile,
              sortable: true,
            
          },
         
            {
                name: "Actions",
                width: "10%",
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
                              
                                 
                                        {/* <a onClick={(e) => {
                                            e.preventDefault();
                                            setTransportRow(row);
                                            setId(row.id);
                                            
                                        }}
                                            className="active-user"
                                            data-bs-toggle="modal"
                                            data-bs-target="#editcustomer"
                                        >

                                         Edit
                                        </a> */}
                                           <Link to={`/editparty/${row.id}`}>
                                            Edit
                                            </Link>
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
                                name={row.name}
                                yes={(id) => {
                                    dispatch(deleteParty({id:row.id,name:row.name,user_id:userId}));
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
                            placeholder="Search party..."
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
                                    data-bs-target="#addcustomer"
                                >
                                  <Link to="/addparty">
                                  Add Party
                                  </Link>
                                
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={partyList}
                progressPending={false}
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
export default BalanceSheet;
