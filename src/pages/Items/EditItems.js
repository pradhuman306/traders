import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateItems } from '../../actions/items';
import ButtonLoader from '../Customloader/ButtonLoader';


const EditItems = (props) => {
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
          <h4>Edit Item</h4>
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
                item:dataList.item
             
              }}
              validate={(values) => {
                const errors = {};
               if(!values.item){
                errors.item = "Please fill item name !"
               }
                setError({ ...errors });
                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                values.user_id = user_id;
                values.id = dataList.id;
                props.setBtnPending(true);
                dispatch(updateItems(values,elementRef,props.setBtnPending));
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
                            
                          Item <span className="error">*</span>
                          </label>
                          <Field
                            type="text"
                            name="item"
                            className={`form-control ${
                              touched.item && error.item
                                ? "input-error"
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

export default EditItems;
