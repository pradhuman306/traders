import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addParty } from '../../actions/balancesheet';


const AddParty = (props) => {
    const nav = useNavigate();
    const user_id = props.auth.userdata.id;
    const dispatch = useDispatch();
    const [error, setError] = useState({});
  return (
    <div className="body-content">
    <div className="usermanagement-main">
    <h2>Add Party</h2>
    <Formik
              initialValues={{
                name:"",
                mobile:""
              
              }}
              validate={(values) => {
                const errors = {};
               if(!values.name){
                errors.name = "Please fill Party !"
               }
           
           
           
                setError({ ...errors });

                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                values.user_id = user_id;
                dispatch(addParty(values,nav));
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
                          Party <span className="error">*</span>
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
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label>
                          Mobile 
                          </label>
                          <Field
                            type="number"
                            name="mobile"
                            className={`form-control`}
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
  )
}

export default AddParty;
