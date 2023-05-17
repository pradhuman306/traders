import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAccount, addAccountDetails } from '../../actions/accounts';


const AddAccountDetails = (props) => {
    const elementRef = useRef(null);
    const nav = useNavigate();
    const user_id = props.auth.userdata.id;
    const accountid = props.accountid;
    const dispatch = useDispatch();
    const [error, setError] = useState({});
  return (
    <div
    className="modal right fade"
    id="addaccountdetails"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content right-modal">
        <div className="modal-head">
          <h4>Add New Account Details</h4>
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
        <div className="modal-body">
    <Formik
              initialValues={{
                date:"",
                credit:"",
                debit:"",
                description:""
             
              }}
              validate={(values) => {
                const errors = {};
          
               if(!values.date){
                errors.date = "Please fill date !"
               }
           
                setError({ ...errors });
                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                values.user_id = user_id;
                values.account_id = accountid;
                dispatch(addAccountDetails(values,elementRef));
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
                            
                          Credit
                          </label>
                          <Field
                            type="text"
                            name="credit"
                            className={`form-control ${
                              touched.credit && error.credit
                                ? "input-error"
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            className="error"
                            name="credit"
                            component="span"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label>
                            
                          Debit
                          </label>
                          <Field
                            type="text"
                            name="debit"
                            className={`form-control ${
                              touched.debit && error.debit
                                ? "input-error"
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            className="error"
                            name="debit"
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
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label>
                            
                          Description
                          </label>
                          <Field
                            type="text"
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
                  
                
                    <div className="col-md-12 text-center mt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-primary m-auto"
                        >
                            Add
                        </button>
                      </div>
                  </div>
              
                </Form>
              )}
            </Formik>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AddAccountDetails;
