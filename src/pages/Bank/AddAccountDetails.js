import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAccountDetails } from '../../actions/accounts';
import { formatDate, handleLangChange, onvalChange } from '../../actions/common';
import ButtonLoader from '../Customloader/ButtonLoader';


const AddAccountDetails = (props) => {
    const elementRef = useRef(null);
    const user_id = props.auth.userdata.id;
    const accountid = props.accountid;
    const dispatch = useDispatch();
    const [error, setError] = useState({});
  const [isHindi,setHindi]=useState(false);
  const [descPlaceHolder, setDescPlaceHolder] = useState("Please enter description");


  return (
    <div
    className="modal fade"
    id="addaccountdetails"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
      <Formik
              initialValues={{
                date:formatDate(new Date(),'yyyy-mm-dd'),
                amount:"",
                credit:"",
                debit:"",
                description:""
             
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
                values.account_id = accountid;
                values.credit = props.accType === 'Credit' ? values.amount:"";
                values.debit = props.accType === 'Debit' ? values.amount :"";
                props.setBtnPending(true);
                dispatch(addAccountDetails(values,elementRef,props.setBtnPending,resetForm));
                setSubmitting(false);
              }}
            >
              {({  isSubmitting, touched, values, setFieldValue }) => (
                <Form action="" id="newcustomer">
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
            <img src="/assets/images/close.svg" alt="" />
          </a>
        </div>
        <div className="modal-body">
    
                  <div className="form-fields-wrap">
                 
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label>
                            
                          Amount <span className="error-badge">*</span>
                          </label>
                          <Field

                            type="text"
                            name="amount"
                            placeholder="Please enter amount"
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
                        <label className='d-flex align-items-center justify-content-between'>
                                                        Description
                                                        <div className="form-check">
                                                        <input type="checkbox" className="form-check-input" onChange={(e) => handleLangChange(e,setHindi,setDescPlaceHolder)} id="lang" /><label htmlFor="lang" className="form-check-label"><span>In hindi</span></label></div>
                                                    </label>
                          <Field
                            as="textarea"
                            name="description"
                            className={`form-control ${values.description
                              ? "description"
                              : ""
                            }`}
                            placeholder={descPlaceHolder}
                            onChange={(e) => onvalChange(e, 'description', setFieldValue, false, isHindi)}
                            onBlur={(e) => onvalChange(e, 'description', setFieldValue, true, isHindi)}
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
                          className="btn btn-primary m-auto d-flex justify-content-center align-items-center"
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

export default AddAccountDetails;
