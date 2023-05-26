import React from 'react'
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import {  useParams } from 'react-router-dom';
import {  deleteAccountDetails, getAccountById, getAccountDetails, getAccountList } from '../../actions/accounts';
import ConfirmModal from '../../common/confirmModal';
import CustomLoader from '../Customloader';
import AddAccountDetails from './AddAccountDetails';
import { formatDate } from '../../actions/common';
import EditAccountDetails from './EditAccountDetails';

const AccountDetails = (props) => {
    const {accountid} = useParams();
    console.log(accountid);
    const userId = props.auth.userdata.id;
    const accountDetailsAll = useSelector((state)=>state.accountReducer).accountDetails;
    const dispatch = useDispatch();
    const [filterText, setFilter] = useState("");
    const [accountDetails, setList] = useState([...accountDetailsAll]);
    const [accountListRow, setAccountRow] = useState({});
    const [id, setId] = useState("");
    const [isExpandable, setisExpandable] = useState(false);
    const [accType,setType] = useState("");
    const [remainAmount,setRemainAmount] = useState(0);
    const handleSort = (column, sortDirection) =>
        console.log(column.selector, sortDirection);

    useEffect(()=>{
        dispatch(getAccountDetails({user_id:userId,id:accountid}));
        dispatch(getAccountById(accountid));
    },[accountid])

    const ExpandedComponent = ({ data }) => {
        if (window.innerWidth <= 599) {
            return (
                <>
                    <p>
                        <b>Credit:</b> {data.credit ? <span className='credit'>+ {"₹"+parseInt(data.credit).toLocaleString("en-IN")}</span>:""}
                    </p>
                    <p>
                        <b>Debit:</b> {data.debit ? <span className='debit'>- {"₹"+parseInt(data.debit).toLocaleString("en-IN")}</span>:""}
                    </p>
                    <p>
                        <b>Description:</b> {data.description}
                    </p>
                 
                </>
            );
        } else if(window.innerWidth <= 991){
            return (
            <>
            <p>
                <b>Credit:</b> {data.credit ? <span className='credit'>+ {"₹"+parseInt(data.credit).toLocaleString("en-IN")}</span>:""}
            </p>
        </>)
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
        dispatch(getAccountList(userId));
        if (window.innerWidth <= 599 || window.innerWidth <= 959) {
            setisExpandable(true);
        } else {
            setisExpandable(false);
        }
    }, []);

    useEffect(() => {
        if (filterText) {
            let tmp = accountDetailsAll.filter((item) => {
                if (
                    item.credit?.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.debit?.toLowerCase().includes(filterText.toLowerCase()) ||
                    formatDate(item.date)?.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.description.toLowerCase().includes(filterText.toLowerCase())
                ) {
                    return true;
                }
                return false;
            });
            setList([...tmp]);
        } else {
            setList([...accountDetailsAll]);
        }
        balanceAmount();
    }, [filterText,accountDetailsAll]);

    const hanndleSearch = (value) => {
        setFilter(value);
    };

    const balanceAmount = () => {
        let totalCredit = 0;
        let totalDebit = 0;
        accountDetailsAll.forEach((item,index)=>{
            totalCredit+=item.credit?parseInt(item.credit):0;  
            totalDebit+=item.debit?parseInt(item.debit):0;
        })
        setRemainAmount(totalCredit-totalDebit);
    }

    // const hideColumns = () => {};

    const columns = useMemo(
        () => [
            {
                name: "Sr no.",
                selector: (row,index) => index+1,
                sortable: false,
                width: "100px",
                hide:"sm"
            },
            
            {
                name: "Date",
                selector: (row) => formatDate(row.date),
                sortable: true,
             
            },
              
          {
            name: "Credit",
            selector: (row) => row.credit ? <span className='credit'>+ {"₹"+parseInt(row.credit).toLocaleString("en-IN")}</span>:"",
            sortable: true,
            hide:"md"
        },
           
        {
            name: "Debit",
            selector: (row) =>  row.debit ? <span className='debit'>- {"₹"+parseInt(row.debit).toLocaleString("en-IN")}</span>:"",
            sortable: true,
            hide:"sm"
        },
        {
            name: "Description",
            selector: (row) => row.description,
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
                                            setAccountRow(row);
                                            setId(row.id);
                                            
                                        }}
                                            className="active-user"
                                            data-bs-toggle="modal"
                                            data-bs-target="#editaccountdetails"
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
                                    dispatch(deleteAccountDetails({id:row.id,accountid:accountid,name:row.name,user_id:userId}));
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
                            placeholder="Search..."
                            className="form-control"
                            onChange={(e) => hanndleSearch(e.target.value)}
                        />
                    </div>
                    <div>
                        Balance amount: {remainAmount >= 0 ? <span className='credit'>{"₹"+parseInt(remainAmount).toLocaleString("en-IN")}</span>:<span className='debit'>{"₹"+parseInt(remainAmount).toLocaleString("en-IN")}</span>}
                    </div>
                    <div className="datatable-filter-right">
                        <ul className="btn-group">
                        
                            <li>
                                <button
                                    className="btn btn-success"
                                    data-bs-toggle="modal"
                                    data-bs-target="#addaccountdetails"
                                    onClick={()=>setType('Credit')}
                                >
                                    
                                Credit
                                </button>
                            </li>
                            <li className='ms-2'>
                                <button
                                    className="btn btn-danger"
                                    data-bs-toggle="modal"
                                    data-bs-target="#addaccountdetails"
                                    onClick={()=>setType('Debit')}

                                >
                                Debit
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <AddAccountDetails {...props} accountid={accountid} accType={accType} />
            <EditAccountDetails {...props} accountid={accountid} row_id={id} row_data={accountListRow} />
            
            <DataTable
                columns={columns}
                data={accountDetails}
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
export default AccountDetails;
