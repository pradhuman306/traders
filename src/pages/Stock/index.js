import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';
import { makePositive } from '../../actions/common';
const GoDown = (props) => {

   
        const [godownList, setList] = useState([...props.godownListAll]);
        const [filterText, setFilter] = useState("");
        const hanndleSearch = (value) => {
            setFilter(value);
        };
        const sortGodown = (data) => {
            data.sort(function(a, b) {
              var keyA = makePositive(a.total),
                keyB = makePositive(b.total);
        
              if (keyA > keyB) return -1;
              if (keyA < keyB) return 1;
              return 0;
            });
          }
      


    useEffect(() => {
        if (filterText) {
            let tmp = props.godownListAll.filter((item) => {
                if (
                    item.name?.toLowerCase().includes(filterText.toLowerCase()) 
                ) {
                    return true;
                }
                return false;
            });
            
            setList([...tmp]);
        } else {
      
            setList([...props.godownListAll]);
        }
    }, [filterText,props.godownListAll]);


    sortGodown(godownList);


    return (
        <>

        <div className="body-content">
            <div className="usermanagement-main">
                <div className="datatable-filter-wrap">
                    <div className="datatable-search w-100">
                        <input
                            type="text"
                            placeholder="Search godown..."
                            className="form-control"
                            onChange={(e) => hanndleSearch(e.target.value)}
                        />
                    </div>
                   
                </div>
            </div>
          
         
            <DataTable
                columns={props.columns}
                data={godownList}
                expandableRows={props.isExpandable}
                expandableRowsComponent={props.ExpandedComponent}
               
            
            />
        </div>
        </>
    )
}
export default GoDown;
