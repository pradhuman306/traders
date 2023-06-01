import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addParty, payAmount } from '../../actions/balancesheet';
import ButtonLoader from '../Customloader/ButtonLoader';


const PaySlip= (props) => {
  const elementRef = useRef(null);
  const user_id = props.auth.userdata.id;
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [btnPending, setBtnPending] = useState(false);
  return (
    <div
      className="modal fade"
      id="paySlip"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content ">
        <Formik
              initialValues={{
              amount:""

              }}
              validate={(values) => {
                const errors = {};
                if (!values.amount) {
                  errors.amount = "Please enter amount!"
                }



                setError({ ...errors });

                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                values.user_id = user_id;
                values.id = props.rowData.id;
                setBtnPending(true);
                console.log(values);
                dispatch(payAmount(values, elementRef, setBtnPending, resetForm, props.rowData.type,props.filterValue,props.partyid));
                setSubmitting(false);

              }}
            >
              {({ values, isSubmitting, dirty, handleReset, touched }) => (
                <Form action="" id="newcustomer">
          <div className="modal-head">
            <h4>Pay amount</h4>
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
                            Amount<span className="error-badge">*</span>
                          </label>
                          <Field
                          placeholder="₹"
                            type="text"
                            name="amount"
                            className={`form-control ${touched.amount && error.amount
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
                 
                    </div>



                  </div>
                 
                
          </div>
          <div className='modal-footer'>
          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary m-auto"
                          >
                            {btnPending ? <ButtonLoader /> : "Pay"}

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

export default PaySlip;
