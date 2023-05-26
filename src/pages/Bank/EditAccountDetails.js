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
  console.log(dataList);
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
          <h4>{dataList.debit != '' ? 'Debit' : dataList.credit != "" ? "Credit" :"" }</h4>
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
                date:dataList.date,
                credit:dataList.credit,
                debit:dataList.debit,
                description:dataList.description,
                amount:dataList.credit != "" ? dataList.credit : dataList.debit != "" ? dataList.debit :""
             
              }}
              validate={(values) => {
                const errors = {};
          
               if(!values.date){
                errors.date = "Please fill date !"
               }
               if(!values.amount){
                errors.amount = "Please fill amount !"
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
                  <div className="form-fields-wrap">
                 
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label>
                            
                          Amount
                          </label>
                          <Field
                            type="text"
                            name="amount"
                            className={`form-control ${
                              touched.amount && error.amount
                                ? "input-error"
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
                      <div className="col-md-12">
                        <div className="form-group mb-4">
                          <label>
                            
                          Description
                          </label>
                          <Field
                            as="textarea"
                            name="description"
                            className={`form-control`}
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
                  <div className='frm-btn-wrap'>
                    <div className='row'>
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

export default EditAccountDetails;
