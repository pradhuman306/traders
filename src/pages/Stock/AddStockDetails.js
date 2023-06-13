import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  addAccountDetails } from '../../actions/accounts';
import Select from 'react-select';
import { addStockDetails } from '../../actions/godown';
import ButtonLoader from '../Customloader/ButtonLoader';


const AddStockDetails = (props) => {
    const elementRef = useRef(null);
    const nav = useNavigate();
    const itemRef = useRef(null);
    const firmRef = useRef(null);
    const godownRef = useRef(null);
    const user_id = props.auth.userdata.id;
    const stockid = props.stockid;
    const dispatch = useDispatch();
    const [error, setError] = useState({});
    const [newListItems, setNewListItems] = useState([]);
    const [newListFirm, setNewListFirm] = useState([]);
    const [newListGodown, setNewGodownList] = useState([]);
    const [valueGodown, setValueGodown] = useState({});

    
    const handleSelectChange = (e,setFieldValue) => {
      if(e){
        setFieldValue('item',e.value);
      }
    } 

    const handleSelectChangeFirm = (e,setFieldValue) => {
      if(e){
        setFieldValue('firm',e.value);
      }
    } 
    const handleSelectChangeGoDown = (e,setFieldValue) => {
      if(e){
        setFieldValue('godown',e.value);
        setValueGodown(e);
      }
    } 

    

    useEffect(()=>{
      let newItemsList = [];
      let newFirmList = [];
      let newGodownList = [];

      props.itemListAll.forEach(element => {
        newItemsList.push({label:element.item,value:element.id})
      });
      props.firmListAll.forEach(element => {
        newFirmList.push({label:element.name,value:element.id})
      });
      props.godownListAll.forEach(element => {
        newGodownList.push({label:element.name,value:element.id})
      });
      setNewListItems(newItemsList);
      setNewListFirm(newFirmList);
      setNewGodownList(newGodownList);
    },[props.itemListAll,props.firmListAll,props.godownListAll])
    useEffect(()=>{
   
      setValueGodown({label:props.godownList.name,value:props.godownList.id});
  
    },[props.godownList])
  return (
    <div
    className="modal right fade"
    id="addstockdetails"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content right-modal">
      <Formik
                enableReinitialize
              initialValues={{
                // firm:"",
                godown:props.godownList.id,
                item:"",
                quantity:"",
                weight:"",
                vehicle_no:"",
                rate:"",
                date:""
             
              }}
              validate={(values) => {
                const errors = {};
                if(!values.item){
                  errors.item = "Please select item!"
                 }
                if(!values.date){
                  errors.date = "Please enter date!"
                 }
                 if(!values.godown){
                  errors.godown = "Please select godown!"
                 }
           
                setError({ ...errors });
                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                values.user_id = user_id;
                values.stock_id = values.godown;
                
                props.setBtnPending(true); 
                dispatch(addStockDetails(values,elementRef,props.setBtnPending,resetForm,itemRef,props.godownList.id));
                setSubmitting(false);
              }}
            >
              {({ values, isSubmitting, dirty, handleReset, touched, setFieldValue }) => (
                <Form action="" id="newcustomer">
        <div className="modal-head">
          <h4>Add Stock</h4>
          <a
            onClick={(e) => e.preventDefault()}
            type="button"
            className="close"
            data-bs-dismiss="modal"
            aria-label="Close"
            ref={elementRef}
          >
            <img src="/assets/images/close.svg" alt="" />
          </a>
        </div>
        <div className="modal-body">
    
                  <div className="form-fields-wrap">
                 
                    <div className="row">
                     
                    <div className="col-md-6">
                      <div className="form-group mb-4">
                          <label>
                            
                          GoDown
                          </label>
                          <Select 
                            className={`${
                              touched.godown && error.godown
                                ? "input-error"
                                : ""
                            }`} 
                            options={newListGodown} 
                            isSearchable={true}
                            ref={godownRef}
                            name="godown" 
                            value={valueGodown}
                            onChange={(e)=>handleSelectChangeGoDown(e,setFieldValue)}
                            theme={(theme) => ({
                              ...theme,
                              borderRadius: 8,
                              colors: {
                                ...theme.colors,
                                primary25: 'rgba(5,131,107,0.1)',
                                primary: '#05836b',
                              },
                            })}
                            />
                          
                          <ErrorMessage
                            className="error"
                            name="godown"
                            component="span"
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
                            isSearchable={true}
                            ref={itemRef}
                            name="item" 
                            onChange={(e)=>handleSelectChange(e,setFieldValue)}
                            theme={(theme) => ({
                              ...theme,
                              borderRadius: 8,
                              colors: {
                                ...theme.colors,
                                primary25: 'rgba(5,131,107,0.1)',
                                primary: '#05836b',
                              },
                            })}
                            />
                          
                          <ErrorMessage
                            className="error"
                            name="item"
                            component="span"
                          />
                       
                        </div>
                      </div>
                      {/* <div className="col-md-6">
                      <div className="form-group mb-4">
                          <label>
                            
                          Firm
                          </label>
                          <Select 
                            className={`${
                              touched.firm && error.firm
                                ? "input-error"
                                : ""
                            }`} 
                            options={newListFirm} 
                            isSearchable={true}
                            ref={firmRef}
                            name="firm" 
                            onChange={(e)=>handleSelectChangeFirm(e,setFieldValue)}
                            theme={(theme) => ({
                              ...theme,
                              borderRadius: 8,
                              colors: {
                                ...theme.colors,
                                primary25: 'rgba(5,131,107,0.1)',
                                primary: '#05836b',
                              },
                            })}
                            />
                          
                          <ErrorMessage
                            className="error"
                            name="item"
                            component="span"
                          />
                       
                        </div>
                      </div> */}

                    
                   
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label>
                            
                          Quantity
                          </label>
                          <Field
                            type="number"
                            name="quantity"
                            className={`form-control`}
                          />
                     
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label>
                            
                          Weight <span className='badge bg-secondary'>in quintal</span>
                          </label>
                          <Field
                            type="number"
                            name="weight"
                            className={`form-control`}
                          />
                     
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label>
                            
                          Rate
                          </label>
                          <Field
                            type="number"
                            name="rate"
                            className={`form-control`}
                            placeholder="₹"
                          />
                     
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label>
                            
                          Amount
                          </label>
                          <Field
                            type="text"
                            name="amount"
                            className={`form-control`}
                            placeholder="₹"
                            value={"₹"+parseInt(values.weight*values.rate).toLocaleString("en-IN")}
                            disabled
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
                            
                          Date <span className="error-badge">*</span>
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
                  
                
                  
                  </div>
                 
               
            </div>
            <div className='modal-footer'>
            <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-primary m-auto"
                        >
                          {props.btnPending?<ButtonLoader/>:"Add"}
                        </button>
            </div>
            
            </Form>
              )}
            </Formik>
        </div>
      </div>
    </div>
  )
}

export default AddStockDetails;
