import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateAccount } from '../../actions/accounts';
import { onvalChange } from '../../actions/common';
import ButtonLoader from '../Customloader/ButtonLoader';


const EditAccount = (props) => {

    const elementRef = useRef(null);
    const nav = useNavigate();
    const user_id = props.auth.userdata.id;
    const dispatch = useDispatch();
    const [dataList, setdataList] = useState(props.row_data);
    const [error, setError] = useState({});
    const [isHindi,setHindi]=useState(false);

    useEffect(()=>{
        setdataList({...props.row_data});
 
    },[props.row_id])
  return (
    <div
    className="modal fade"
    id="editaccount"
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
                name:dataList.name
             
              }}
              validate={(values) => {
                const errors = {};
               if(!values.name){
                errors.name = "Please enter account name!"
               }
                setError({ ...errors });
                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                values.user_id = user_id;
                values.id = dataList.id;
                props.setBtnPending(true);
                dispatch(updateAccount(values,elementRef,props.setBtnPending));
           
                setSubmitting(false);
              }}
            >
              {({ values, isSubmitting, dirty, handleReset, touched, setFieldValue }) => (
                <Form action="" id="newcustomer">
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
            <img src="/assets/images/close.svg" alt="" />
          </a>
        </div>
         
         <div className="modal-body">
    
                  <div className="form-fields-wrap">
                 
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>
                            
                          Account name <span className="error-badge">*</span>
                          </label>
                          <Field
                          placeholder="Enter account name"
                            type="text"
                            name="name"
                            className={`form-control ${
                              touched.name && error.name
                                ? "input-error"
                                : ""
                            } ${values.name
                              ? "filled"
                              : ""
                            }`}
                            onChange={(e)=>onvalChange(e,'name',setFieldValue,false,isHindi)}
                            onBlur={(e)=>onvalChange(e,'name',setFieldValue,true,isHindi)}
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
              
              
            </div>
            <div className='modal-footer'>
            <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-primary m-auto d-flex justify-content-center align-items-center"
                        >
                             {props.btnPending?<ButtonLoader/>:"Update"}
                        </button>
            </div>
              </Form>
              )}
            </Formik></div> : ""}
      
        </div>
      </div>
    </div>
  )
}

export default EditAccount;
