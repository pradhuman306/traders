import React from 'react'
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteAccount, getAccountList } from '../../actions/accounts';
import { deleteTransportRentList, getTransportRentList } from '../../actions/transportrent';
import ConfirmModal from '../../common/confirmModal';
import CustomLoader from '../Customloader';
import EditGoDown from './EditGoDown';
import AddGoDown from './AddGoDown';
import { deleteGoDown, getGoDownList } from '../../actions/godown';

const GoDown = (props) => {
    const userId = props.auth.userdata.id;
    const godownListAll = useSelector((state)=>state.godownReducer).godownList;
    const dispatch = useDispatch();
    const [filterText, setFilter] = useState("");
    const [godownList, setList] = useState([...godownListAll]);
    const [godownListRow, setGodownRow] = useState({});
    const [id, setId] = useState("");
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
                        <b>Place:</b> {data.place}
                    </p>
                 
                </>
            );
        } 
    };

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
        dispatch(getGoDownList(userId));
        if (window.innerWidth <= 599) {
            setisExpandable(true);
        } else {
            setisExpandable(false);
        }
    }, []);

    useEffect(() => {
        if (filterText) {
            let tmp = godownListAll.filter((item) => {
                if (
                    item.name?.toLowerCase().includes(filterText.toLowerCase()) 
                ) {
                    return true;
                }
                return false;
            });
            setList([...tmp]);
        } else {
            setList([...godownListAll]);
        }
    }, [filterText,godownListAll]);

    const hanndleSearch = (value) => {
        setFilter(value);
    };

    // const hideColumns = () => {};

    const columns = useMemo(
        () => [
          
          {
            name: "Name",
            selector: (row) => {
                let newName = row.name.split(" ");
                let firstC = newName[0][0];
                let lastC = "";
                if (newName[1]) {
                    lastC = newName[1][0].toUpperCase();
                }
                return (
                  <Link to={`/stockdetails/${row.id}`}>
                    <div className="user-wrap">
                        <h5 className="user-icon">{firstC.toUpperCase() + lastC}</h5>
                        <div className="user-detail">{row.name}</div>
                    </div>
                    </Link>
                );
            },
            sortable: true,
         
        },

        {
            name: "Place",
            selector: (row) => row.place,
            sortable: true,
            hide:"sm"
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
                                            setGodownRow(row);
                                            setId(row.id);
                                            
                                        }}
                                            className="active-user"
                                            data-bs-toggle="modal"
                                            data-bs-target="#editaccount"
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
                                name={row.name}
                                yes={(id) => {
                                    dispatch(deleteGoDown({id:row.id,name:row.name,user_id:userId}));
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
                            placeholder="Search godown..."
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
                                    data-bs-target="#addaccount"
                                >
                            
                                  Add Godown
                                
                                
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <AddGoDown {...props}/>
            <EditGoDown {...props} row_id={id} row_data={godownListRow} />
            <DataTable
                columns={columns}
                data={godownList}
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
export default GoDown;
