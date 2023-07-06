import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addParty } from '../../actions/balancesheet';
import { onvalChange } from '../../actions/common';
import ButtonLoader from '../Customloader/ButtonLoader';


const AddParty = (props) => {
  const elementRef = useRef(null);
  const user_id = props.auth.userdata.id;
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [btnPending, setBtnPending] = useState(false);


  return (
    <div
      className="modal fade"
      id="addparty"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content ">
        <Formik
              initialValues={{
                name: "",
                mobile: ""

              }}
              validate={(values) => {
                const errors = {};
                if (!values.name) {
                  errors.name = "Please enter party name!"
                }



                setError({ ...errors });

                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                values.user_id = user_id;
                setBtnPending(true);
                dispatch(addParty(values, elementRef, setBtnPending, resetForm));
                setSubmitting(false);

              }}
            >
              {({ values, isSubmitting, dirty, handleReset, touched , setFieldValue}) => (
                <Form action="" id="newcustomer">
          <div className="modal-head">
            <h4>Add New Party</h4>
        
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
                        <div className="form-group mb-3">
                          <label>
                            Party Name <span className="error-badge">*</span>
                          </label>
                          <Field
                          placeholder="Enter party name"
                            type="text"
                            name="name"
                            className={`form-control ${touched.name && error.name
                                ? "input-error"
                                : ""
                              } ${values.name
                                ? "filled"
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
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>
                            Mobile
                          </label>
                          <Field
                          placeholder="Enter party mobile number"
                            type="number"
                            name="mobile"
                            className={`form-control ${values.mobile
                              ? "filled"
                              : ""
                            }`}
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
                            {btnPending ? <ButtonLoader /> : "Add Party"}

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

export default AddParty;
