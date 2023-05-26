import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAccountDetails } from '../../actions/accounts';
import ButtonLoader from '../Customloader/ButtonLoader';


const AddAccountDetails = (props) => {
    const elementRef = useRef(null);
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
          <h4>{props.accType}</h4>
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
                amount:"",
                credit:"",
                debit:"",
                description:""
             
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
                values.account_id = accountid;
                values.credit = props.accType === 'Credit' ? values.amount:"";
                values.debit = props.accType === 'Debit' ? values.amount :"";
                props.setBtnPending(true);
                dispatch(addAccountDetails(values,elementRef,props.setBtnPending,resetForm));
                setSubmitting(false);
              }}
            >
              {({  isSubmitting, touched }) => (
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
                            placeholder="₹"
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
                         {props.btnPending?<ButtonLoader/>:"Add"}
                        </button>
                      </div>
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
