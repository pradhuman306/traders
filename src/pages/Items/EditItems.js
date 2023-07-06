import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { onvalChange } from '../../actions/common';
import { updateItems } from '../../actions/items';
import ButtonLoader from '../Customloader/ButtonLoader';


const EditItems = (props) => {
  const elementRef = useRef(null);
  const nav = useNavigate();
  const user_id = props.auth.userdata.id;
  const dispatch = useDispatch();
  const [dataList, setdataList] = useState(props.row_data);
  const [error, setError] = useState({});
  const [imgEdit, setImgEdit] = useState("");


  const handleChangeEdit = (e, setFieldValue) => {
    setFieldValue("image", e.currentTarget.files[0]);
    setImgEdit(URL.createObjectURL(e.currentTarget.files[0]));
    
  }

  useEffect(() => {
    setdataList({ ...props.row_data });
    setImgEdit(props.row_data.image);
    
  }, [props.row_id])
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
                    item: dataList.item,
                    image:""

                  }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.item) {
                      errors.item = "Please enter item name!"
                    }
                    setError({ ...errors });
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    if (!values.image) {
                      values.old_image = dataList.image;
                      delete values.image;
                    }
                    values.user_id = user_id;
                    values.id = dataList.id;
                    props.setBtnPending(true);
                    dispatch(updateItems(values, elementRef, props.setBtnPending));
        
                    setSubmitting(false);
                  }}
                >
                  {({ values, isSubmitting, dirty, handleReset, touched, setFieldValue }) => (
                    <Form action="" id="newcustomer">
              <div className="modal-head">
                <h4>Edit Item</h4>
              
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
                                className={`form-control ${touched.item && error.item
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
                                      name="letter_pad1"
                                      id="letter_pad1"
                                      className=""
                                      placeholder="Enter letter_pad1"
                                      onChange={(e) => handleChangeEdit(e, setFieldValue)}
                                    />
                                    <input
                                      type="hidden"
                                      name="old_letter_pad1"
                                      id="old_letter_pad1"
                                      value=""
                                    />
                                    <label htmlFor="letter_pad1" className="image-button">
                                      <img src="/assets/images/icon-image.svg" alt="" />
                                      {"Upload Icon"}
                                    </label>
                                  </div>
                                </div>
                                <div className="col-sm-3">
                                  <div className="logo-wrapper">
                                    {imgEdit && <img className="preview-img" src={imgEdit} alt="" />}
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
                              {props.btnPending ? <ButtonLoader /> : "Update"}
                            </button>
              </div>
              
              </Form>
                  )}
                </Formik> </div> : ""}

        </div>
      </div>
    </div>
  )
}

export default EditItems;
