import React from 'react'
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDate } from '../../actions/common';
import { deleteTransportRentList, getRentHistoryByParty, getTransportRentList, setEmptyTransDetails } from '../../actions/transportrent';
import ConfirmModal from '../../common/confirmModal';
import CustomLoader from '../Customloader';
import Header from '../Header/Header';
import AddTransportRent from './AddTransportRent';
import EditTransportRent from './EditTransportRent';
import TransportDetails from './TransportDetails';

const TransportRent = (props) => {
    const userId = props.auth.userdata.id;
    const transRentList = useSelector((state)=>state.transportRentReducer).transportRentList;
    const partyList = useSelector((state)=>state.balanceSheetReducer).partyList;
    const dispatch = useDispatch();
    const [filterText, setFilter] = useState("");
    const [transportRentList, setList] = useState([...transRentList]);
    const [transportRow,setTransportRow]= useState({});
    const [partyDetails,setPartyDetails]= useState({});
    const [id,setId]= useState({});
    const [isExpandable, setisExpandable] = useState(false);
  
    
    const handleSort = (column, sortDirection) =>
        console.log(column.selector, sortDirection);
    // data provides access to your row data
    useEffect(()=>{
        dispatch(setEmptyTransDetails());
    },[])
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

    useEffect(()=>{
        let tmp = partyList.filter((item)=>item.id.toString() === transportRow.party_id);
        console.log(tmp,'partyFilter');
        if(tmp.length){
            setPartyDetails(tmp[0]); 
        }
        if(Object.keys(transportRow).length){
            let transList = transRentList.filter((item)=>item.party_id.toString() === transportRow.party_id);
            if(transList.length){
                setTransportRow(transList[0]); 
             
            }
        }else{
            if(transRentList.length){
  setTransportRow(transRentList[0]); 
  dispatch(getRentHistoryByParty(transRentList[0].party_id));
            }
          

        }
     
  
    },[transportRow,partyList,transRentList])

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
        
                    <a className={`anchor ${transportRow.party_id === row.party_id ? 'active':""}`} onClick={
                        ()=>{
                        dispatch(getRentHistoryByParty(row.party_id));
                        setTransportRow(row);
                   
                        }
                    }>
                        <div className={`user-wrap`}>
                        <h5 className="user-icon">{firstC.toUpperCase() + lastC}</h5>
                            <div className="user-detail">{row.party}</div>
                        </div>
                        </a>
                    );
                },
                sortable: true,
              
            },
            
    
        
        ],
        [transportRow]
    );

    return (
        <>
            <Header heading="Transport Management" {...props} />
       <div className='row'>
        <div className='col-md-3'>
        <div className="body-content">
            
            <AddTransportRent {...props} partyList={partyList} transportRow={transportRow} setTransportRow={setTransportRow}  />

    
            <DataTable
                columns={columns}
                data={transportRentList}
                expandableRows={isExpandable}
                expandableRowsComponent={ExpandedComponent}
                onSort={handleSort}
           
            />
        </div>
        </div>
        <div className='col-md-9'>
            <TransportDetails partyDetails={partyDetails} {...props} transportRow={transportRow}  />
        </div>
       </div>
        </>
    )
}
export default TransportRent;
