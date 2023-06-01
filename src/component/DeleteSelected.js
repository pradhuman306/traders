import React from 'react'

export default function DeleteSelected({selectedRows}) {
  return (
    <>
    {selectedRows.length > 0 ?     <li>
        <button
            className="btn btn-danger ms-1"
            data-bs-toggle="modal"
            data-bs-target={`#confirm_selectedRowDelete`}
            
        >
    
      Delete {selectedRows.length}     
        
        </button>
    </li>:""} 
    </>
  )
}