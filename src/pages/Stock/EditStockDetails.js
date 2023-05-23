import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAccount, addAccountDetails, updateAccountDetails } from '../../actions/accounts';
import Select from 'react-select';
import { updateStockDetails } from '../../actions/godown';
import ButtonLoader from '../Customloader/ButtonLoader';


const EditStockDetails = (props) => {
    const elementRef = useRef(null);
    const nav = useNavigate();
    const user_id = props.auth.userdata.id;
    const stockid = props.stockid;
    const dispatch = useDispatch();
    const [dataList, setdataList] = useState(props.row_data);
    const [newListItems, setNewListItems] = useState([]);
    const [error, setError] = useState({});
    useEffect(()=>{
      setdataList({...props.row_data});
    setValueItem({label:props.row_data.item,value:props.row_data.id});
  },[props.row_id])
  useEffect(()=>{
    let newItemsList = [];
    props.itemListAll.forEach(element => {
      newItemsList.push({label:element.item,value:element.id})
    });
    setNewListItems(newItemsList);
  },[props.itemListAll])

  const handleSelectChange = (e,setFieldValue) => {
    setFieldValue('item',e.value);
    setValueItem(e);
    console.log(e.value);
  } 
  const [valueItem,setValueItem] = useState({});
  return (
    <div
    className="modal right fade"
    id="editaccountdetails"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content right-modal">
        <div className="modal-head">
          <h4>Edit Stock Details</h4>
          <a
            onClick={(e) => e.preventDefault()}
            type="button"
            className="close"
            data-bs-dismiss="modal"
            aria-label="Close"
            ref={elementRef}
          >
            <img src="/assets/images/icon-close.svg" alt="" />
          </a>
        </div>
        {Object.keys(dataList).length != 0 ?  <div className="modal-body">
        <Formik
        enableReinitialize
              initialValues={{
                firm:dataList.firm,
                item:dataList.item,
                quantity:dataList.quantity,
                weight:dataList.weight,
                vehicle_no:dataList.vehicle_no,
                date:dataList.date
             
              }}
              validate={(values) => {
                const errors = {};
                if(!values.item){
                  errors.item = "Please select item!"
                 }
                if(!values.date){
                  errors.date = "Please fill date!"
                 }
           
                setError({ ...errors });
                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                values.user_id = user_id;
                values.stock_id = stockid;
                values.id = props.row_id;
                props.setBtnPending(true);
                dispatch(updateStockDetails(values,elementRef,props.setBtnPending));
                setSubmitting(false);
              }}
            >
              {({ values, isSubmitting, dirty, handleReset, touched, setFieldValue }) => (
               <Form action="" id="newcustomer">
               <div className="form-fields-wrap">
              
                 <div className="row">
                   <div className="col-md-6">
                     <div className="form-group mb-4">
                       <label>
                         
                       firm
                       </label>
                       <Field
                         type="text"
                         name="firm"
                         className={`form-control`}
                       />
                    
                     </div>
                   </div>

                   <div className="col-md-6">
                     <div className="form-group mb-4">
                       <label>
                         
                       Item
                       </label>
                       <Select 
                         className={`${
                          touched.item && error.item
                            ? "input-error"
                            : ""
                        }`} 
                         options={newListItems} 
                         name="item" 
                         onChange={(e)=>handleSelectChange(e,setFieldValue)}
                         value={valueItem}
                         />
                       
                       <ErrorMessage
                         className="error"
                         name="item"
                         component="span"
                       />
                    
                     </div>
                   </div>
                
                   <div className="col-md-6">
                     <div className="form-group mb-4">
                       <label>
                         
                       Quantity
                       </label>
                       <Field
                         type="text"
                         name="quantity"
                         className={`form-control`}
                       />
                  
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group mb-4">
                       <label>
                         
                       Weight
                       </label>
                       <Field
                         type="text"
                         name="weight"
                         className={`form-control`}
                       />
                  
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group mb-4">
                       <label>
                         
                       Vehicle no.
                       </label>
                       <Field
                         type="text"
                         name="vehicle_no"
                         className={`form-control`}
                       />
                  
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group mb-4">
                       <label>
                         
                       Date <span className="error">*</span>
                       </label>
                       <Field
                         type="date"
                         name="date"
                         className={`form-control ${
                           touched.date && error.date
                             ? "input-error"
                             : ""
                         }`}
                       />
                       <ErrorMessage
                         className="error"
                         name="date"
                         component="span"
                       />
                     </div>
                   </div>
                 
                 </div>
               
             
                 <div className="col-md-12 text-center mt-4">
                     <button
                       type="submit"
                       disabled={isSubmitting}
                       className="btn btn-primary m-auto"
                     >
                    {props.btnPending?<ButtonLoader/>:"Update"}
                     </button>
                   </div>
               </div>
           
             </Form>
              )}
            </Formik>
            </div>:""}
        </div>
      </div>
    </div>
  )
}

export default EditStockDetails;
