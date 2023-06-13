import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';
const GoDown = (props) => {
    const godownListAll = useSelector((state)=>state.godownReducer).godownList;
    const handleSort = (column, sortDirection) =>
        console.log(column.selector, sortDirection);
        const [godownList, setList] = useState([...godownListAll]);
        const [filterText, setFilter] = useState("");
        const hanndleSearch = (value) => {
            setFilter(value);
        };
        
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
                onSort={handleSort}
            
            />
        </div>
        </>
    )
}
export default GoDown;
