import React from 'react'
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGoDownList } from '../../actions/godown';
import GoDown from '.';
import Header from '../Header/Header';
import StockDetails from './StockDetails';
import { priceFormatter } from '../../actions/common';
const Stocks = (props) => {
    const hanndleSearch = (value) => {
        setFilter(value);
    };
    const godownListAll = useSelector((state)=>state.godownReducer).godownList;
    const userId = props.auth.userdata.id;

    const dispatch = useDispatch();
    const [filterText, setFilter] = useState("");
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

    useEffect(()=>{
        if(Object.keys(godownListRow).length){
            let godownList = godownListAll.filter((item)=>item.id.toString() == godownListRow.id);
            if(godownList.length){
                setGodownRow(godownList[0]); 
            }
        }
     
    
    },[godownListAll])
  

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
                  <a className={`anchor ${row.id == godownListRow.id?"active":""}`} onClick={
                    ()=>{
                        setGodownRow(row);
                        
                    }
                }>
                    <div className="user-wrap">
                        <div className="user-detail">{row.name}</div>
                    </div>
                    </a>
                );
            },
            sortable: true,
         
        },
        {
            name: "Total Amount",
            selector: (row) => <span class="badge rounded-pill bg-text text-bg-warning">{priceFormatter(row.total)}</span>,
            sortable: true,
          
        },
          
        ],
        [godownListRow]
    );




    return (
        <>
          <Header heading="Stock Management" {...props} />
           <div className='row'>
        <div className='col-md-3'>
        <div className="body-content st-fixed">
        <GoDown {...props} columns={columns} isExpandable={isExpandable} ExpandedComponent={ExpandedComponent} godownListAll={godownListAll} />
        </div>
        </div>
        <div className='col-md-9'>
        <div className="body-content">
        <StockDetails {...props} godownListRow={godownListRow}  godownListAll={godownListAll}/>
        </div>
        </div>
        </div>
            
         </>
    )
}
export default Stocks;
