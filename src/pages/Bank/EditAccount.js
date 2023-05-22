import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAccount, updateAccount } from '../../actions/accounts';
import ButtonLoader from '../Customloader/ButtonLoader';


const EditAccount = (props) => {
  console.log(props);
    const elementRef = useRef(null);
    const nav = useNavigate();
    const user_id = props.auth.userdata.id;
    const dispatch = useDispatch();
    const [dataList, setdataList] = useState(props.row_data);
    const [error, setError] = useState({});
    useEffect(()=>{
        setdataList({...props.row_data});
 
    },[props.row_id])
  return (
    <div
    className="modal right fade"
    id="editaccount"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content right-modal">
        <div className="modal-head">
          <h4>Edit Account</h4>
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
         {Object.keys(dataList).length != 0 ?   <div className="modal-body">
    <Formik
    enableReinitialize
              initialValues={{
                name:dataList.name
             
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
                values.id = dataList.id;
                props.setBtnPending(true);
                dispatch(updateAccount(values,elementRef,props.setBtnPending));
                console.log(values);
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
            </div> : ""}
      
        </div>
      </div>
    </div>
  )
}

export default EditAccount;
