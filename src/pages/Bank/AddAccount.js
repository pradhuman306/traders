import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAccount } from '../../actions/accounts';
import ButtonLoader from '../Customloader/ButtonLoader';


const AddAccount = (props) => {
    const elementRef = useRef(null);
    const nav = useNavigate();
    const user_id = props.auth.userdata.id;
    const dispatch = useDispatch();
    const [error, setError] = useState({});
  return (
    <div
    className="modal right fade"
    id="addaccount"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content right-modal">
        <div className="modal-head">
          <h4>Add new account</h4>
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
                name:"",
             
              }}
              validate={(values) => {
                const errors = {};
               if(!values.name){
                errors.name = "Please fill account name !"
               }
                setError({ ...errors });
                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                values.user_id = user_id;
                props.setBtnPending(true);
                dispatch(addAccount(values,elementRef,props.setBtnPending,resetForm));
                setSubmitting(false);
              }}
            >
              {({ values, isSubmitting, dirty, handleReset, touched }) => (
                <Form action="" id="newcustomer">
                  <div className="form-fields-wrap">
                 
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group mb-4">
                          <label>
                            
                          Account name <span className="error">*</span>
                          </label>
                          <Field
                            type="text"
                            name="name"
                            className={`form-control ${
                              touched.name && error.name
                                ? "input-error"
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            className="error"
                            name="name"
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

export default AddAccount;
