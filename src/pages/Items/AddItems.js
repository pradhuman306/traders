import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAccount } from '../../actions/accounts';
import { onvalChange } from '../../actions/common';
import { addItems } from '../../actions/items';
import ButtonLoader from '../Customloader/ButtonLoader';


const AddItems = (props) => {
    const elementRef = useRef(null);
    const nav = useNavigate();
    const user_id = props.auth.userdata.id;
    const dispatch = useDispatch();
    const [error, setError] = useState({});
    const [img, setImg] = useState("");
   
    const handleChange = (e, setFieldValue) => {
      setFieldValue("image", e.currentTarget.files[0]);
      setImg(URL.createObjectURL(e.currentTarget.files[0]));

    }
  return (
    <div
    className="modal  fade"
    id="addaccount"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
      <Formik
              initialValues={{
                item:"",
                image:""
              }}
              validate={(values) => {
                const errors = {};
               if(!values.item){
                errors.item = "Please enter item name!"
               }
                setError({ ...errors });
                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                values.user_id = user_id;
              
                props.setBtnPending(true);
                dispatch(addItems(values,elementRef,props.setBtnPending,resetForm));
                setSubmitting(false);
              }}
            >
              {({ values, isSubmitting, dirty, handleReset, touched, setFieldValue }) => (
                <Form action="" id="newcustomer">
        <div className="modal-head">
          <h4>Add new Item</h4>
      
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
                        <div className="form-group mb-4">
                          <label>
                            
                          Item <span className="error-badge">*</span>
                          </label>
                          <Field
                          placeholder="Please enter item name"
                            type="text"
                            name="item"
                            className={`form-control ${
                              touched.item && error.item
                                ? "input-error"
                                : ""
                            } ${values.item
                              ? "filled"
                              : ""
                            }`}
                     
                          />
                          <ErrorMessage
                            className="error"
                            name="item"
                            component="span"
                          />
                        </div>
                      </div>
                 
                      <div className='form-group mb-4'>
                      <label>
                            
                            Icon 
                            </label>
                      <div className='row'>
                      <div className="col-sm-9">
                                  <div
                                    className="image-input"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-bs-original-title="Upload image"
                                  >
                                    <input
                                      type="file"
                                      name="letter_pad"
                                      id="letter_pad"
                                      className=""
                                      placeholder="Enter letter_pad"
                                      onChange={(e) => handleChange(e, setFieldValue)}
                                    />
                                    <input
                                      type="hidden"
                                      name="old_letter_pad"
                                      id="old_letter_pad"
                                      value=""
                                    />
                                    <label htmlFor="letter_pad" className="image-button">
                                      <img src="/assets/images/icon-image.svg" alt="" />
                                      {"Upload Icon"}
                                    </label>
                                  </div>
                                  </div>
                                <div className="col-sm-3">
                                  <div className="logo-wrapper">
                                    {img && <img className="preview-img" src={img} alt="" />}
                                  </div>
                                </div>
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

export default AddItems;
