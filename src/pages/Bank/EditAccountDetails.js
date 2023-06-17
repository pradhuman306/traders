import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  updateAccountDetails } from '../../actions/accounts';
import ButtonLoader from '../Customloader/ButtonLoader';


const EditAccountDetails = (props) => {
    const elementRef = useRef(null);
    const user_id = props.auth.userdata.id;
    const accountid = props.accountid;
    const dispatch = useDispatch();
    const [dataList, setdataList] = useState(props.row_data);
    const [error, setError] = useState({});
    useEffect(()=>{
      setdataList({...props.row_data});
  },[props.row_id])

  return (
    <div
    className="modal fade"
    id="editaccountdetails"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
       
        {Object.keys(dataList).length != 0 ?
        <div>
              <Formik
    enableReinitialize
              initialValues={{
                date:dataList.date,
                credit:dataList.credit,
                debit:dataList.debit,
                description:dataList.description,
                amount:dataList.credit != "" ? dataList.credit : dataList.debit != "" ? dataList.debit :""
             
              }}
              validate={(values) => {
                const errors = {};
          
               if(!values.date){
                errors.date = "Please enter date!"
               }
               if(!values.amount){
                errors.amount = "Please enter amount!"
               }
           
                setError({ ...errors });
                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                values.user_id = user_id;
                values.id = props.row_id;
                values.accountid = accountid;
                values.credit = dataList.credit != '' ? values.amount:"";
                values.debit = dataList.debit != '' ? values.amount :"";
                props.setBtnPending(true);
                dispatch(updateAccountDetails(values,elementRef,props.setBtnPending));
                setSubmitting(false);
              }}
            >
              {({ values, isSubmitting, dirty, handleReset, touched }) => (
                <Form action="" id="newcustomer">
           <div className="modal-head">
          <h4>{dataList.debit != '' ? 'Debit' : dataList.credit != "" ? "Credit" :"" }</h4>
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
                            
                          Amount <span className='error-badge'>*</span>
                          </label>
                          <Field
                          placeholder="Please enter amount"
                            type="text"
                            name="amount"
                            className={`form-control ${
                              touched.amount && error.amount
                                ? "input-error"
                                : ""
                            } ${values.amount
                              ? "filled"
                              : ""
                            }`}
                          />
                          <ErrorMessage
                            className="error"
                            name="amount"
                            component="span"
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
                            } ${values.date
                              ? "filled"
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
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>
                            
                          Description
                          </label>
                          <Field
                            as="textarea"
                            name="description"
                            className={`form-control ${values.description
                              ? "filled"
                              : ""
                            }`}
                          />
                          <ErrorMessage
                            className="error"
                            name="description"
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
                         {props.btnPending?<ButtonLoader/>:"Update"}
                        </button>
            </div>
             </Form>
              )}
            </Formik></div>:""}
        </div>
      </div>
    </div>
  )
}

export default EditAccountDetails;
