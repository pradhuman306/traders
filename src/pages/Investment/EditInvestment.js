import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateInvestment } from '../../actions/investment';
import { updateItems } from '../../actions/items';
import ButtonLoader from '../Customloader/ButtonLoader';


const EditInvestment = (props) => {
  const elementRef = useRef(null);
  const nav = useNavigate();
  const user_id = props.auth.userdata.id;
  const dispatch = useDispatch();
  const [dataList, setdataList] = useState(props.row_data);
  const [error, setError] = useState({});
  useEffect(() => {
    setdataList({ ...props.row_data });

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
                    amount:dataList.amount,
                    date:dataList.date,
                    description:dataList.description

                  }}
                  validate={(values) => {
                    const errors = {};
                    if(!values.amount){
                      errors.amount = "Please enter amount!"
                     }
                     if(!values.date){
                      errors.date = "Please select date!"
                     }
                    setError({ ...errors });
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    values.user_id = user_id;
                    values.id = dataList.id;
                    props.setBtnPending(true);
                    dispatch(updateInvestment(values, elementRef, props.setBtnPending));
                    console.log(values);
                    setSubmitting(false);
                  }}
                >
                  {({ values, isSubmitting, dirty, handleReset, touched }) => (
                    <Form action="" id="newcustomer">
              <div className="modal-head">
                <h4>Edit investment</h4>
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
                        <div className="form-group">
                          <label>
                            
                          Amount <span className="error-badge">*</span>
                          </label>
                          <Field
                          placeholder="₹"
                            type="number"
                            name="amount"
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
                        <div className="form-group">
                          <label>
                            
                          Date <span className="error-badge">*</span>
                          </label>
                          <Field
                          placeholder="₹"
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
                        <div className="form-group">
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
                     
                   
              </div> 
              <div className='modal-footer'>
              <button
                              type="submit"
                              disabled={isSubmitting}
                              className="btn btn-primary m-auto"
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

export default EditInvestment;
