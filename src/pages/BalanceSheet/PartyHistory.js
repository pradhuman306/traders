import React from 'react'
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import {  useParams } from 'react-router-dom';
import CustomLoader from '../Customloader';
import { formatDate } from '../../actions/common';
import { getPartyById, getPartyHistory } from '../../actions/balancesheet';


const PartyHistory = (props) => {
    const {partyid} = useParams();
    
    const userId = props.auth.userdata.id;
    const partyHistoryAll = useSelector((state)=>state.balanceSheetReducer).partyHistory;
    const partySingle = useSelector((state)=>state.balanceSheetReducer).partySingle;
    const dispatch = useDispatch();
    const [filterText, setFilter] = useState("");
    const [historyDetails, setList] = useState([...partyHistoryAll]);
    const [partyDetails, setPartySingle] = useState({...partySingle});
    const [id, setId] = useState("");
    const [isExpandable, setisExpandable] = useState(false);
    const handleSort = (column, sortDirection) =>
        console.log(column.selector, sortDirection);
    // data provides access to your row data


    useEffect(()=>{
        dispatch(getPartyHistory({user_id:userId,id:partyid}));
        dispatch(getPartyById(partyid));
        
    },[partyid])





    const ExpandedComponent = ({ data }) => {
        // window.innerWidth <= 599 ? <></> : "";
        if (window.innerWidth <= 599) {
            return (
                <>
                    <p>
                        <b>Account name:</b> {data.account}
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
    }, []);

    useEffect(() => {
        if (filterText) {
            let tmp = partyHistoryAll.filter((item) => {
                if (
                    item.credit?.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.debit?.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.date?.toLowerCase().includes(filterText.toLowerCase())
                ) {
                    return true;
                }
                return false;
            });
            setList([...tmp]);
        } else {
            setList([...partyHistoryAll]);
        }
    }, [filterText,partyHistoryAll]);

    const hanndleSearch = (value) => {
        setFilter(value);
    };

    // const hideColumns = () => {};

    const columns = useMemo(
        () => [
            {
                name: "Sr no.",
                selector: (row,index) => index+1,
                sortable: false,
                width: "100px",
            },
          
          {
            name: "Credit",
            selector: (row) => row.credit,
            sortable: true,
         
        },
           
        {
            name: "Debit",
            selector: (row) => row.debit,
            sortable: true,
         
        },
        {
            name: "Description",
            selector: (row) => row.description,
            sortable: true,
         
        },
           
        {
            name: "Date",
            selector: (row) => formatDate(row.date),
            sortable: true,
         
        },
          
  
            // {
            //     name: "Actions",
            //     width: "166px",
            //     selector: (row) => {
            //         return (
            //             <ul className="table-drop-down">

            //                 <li>

            //                     <a
            //                         href=""
            //                         role="button"
            //                         id="tableMenu"
            //                         data-bs-toggle="dropdown"
            //                         aria-expanded="false"
            //                         className="action-btn"
            //                     >


            //                         <svg width="24px" height="24px" viewBox="0 0 24 24" id="_24x24_On_Light_Dots" data-name="24x24/On Light/Dots" xmlns="http://www.w3.org/2000/svg">
            //                             <rect id="view-box" width="24" height="24" fill="#141124" opacity="0" />
            //                             <path id="Shape" d="M12,1.5A1.5,1.5,0,1,1,13.5,3,1.5,1.5,0,0,1,12,1.5Zm-6,0A1.5,1.5,0,1,1,7.5,3,1.5,1.5,0,0,1,6,1.5Zm-6,0A1.5,1.5,0,1,1,1.5,3,1.5,1.5,0,0,1,0,1.5Z" transform="translate(4.5 11)" fill="#141124" />
            //                         </svg>


            //                     </a>
            //                     <ul className="dropdown-menu" aria-labelledby="tableMenu">


            //                         <li>
                              
                                 
            //                             <a onClick={(e) => {
            //                                 e.preventDefault();
            //                                 setAccountRow(row);
            //                                 setId(row.id);
                                            
            //                             }}
            //                                 className="active-user"
            //                                 data-bs-toggle="modal"
            //                                 data-bs-target="#editaccountdetails"
            //                             >

            //                              Edit
            //                             </a>
                                        
            //                         </li>

            //                         <li>
            //                             <a onClick={(e) => {
            //                                 e.preventDefault();
            //                             }}
            //                                 className="active-user delete-u"
            //                                 data-bs-toggle="modal"
            //                                 data-bs-target={`#confirm_${row.id}`}
            //                             >

            //                               Delete
            //                             </a>
            //                         </li>

            //                     </ul>
            //                 </li>
            //                 <ConfirmModal
            //                     id={row.id}
            //                     name={row.name}
            //                     yes={(id) => {
            //                         dispatch(deleteAccountDetails({id:row.id,accountid:partyid,name:row.name,user_id:userId}));
            //                     }}
                             
            //                 />
            //             </ul>


            //         );
            //     },
            // },
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
                            placeholder="Search history..."
                            className="form-control"
                            onChange={(e) => hanndleSearch(e.target.value)}
                        />
                    </div>
                    <div>
                        {partyDetails.name}
                    </div>
              
                </div>
            </div>
  
            
            <DataTable
                columns={columns}
                data={historyDetails}
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
export default PartyHistory;
