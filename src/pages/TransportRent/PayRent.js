import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { payRentAmount } from "../../actions/transportrent";
import ButtonLoader from "../Customloader/ButtonLoader";
const PayRent = (props) => {
    const elementRef = useRef(null);
    const [error, setError] = useState({});
    const [btnPending, setBtnPending] = useState(false);
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log("ROW DATA",props.row_data);
    },[props.row_data])
  return (
    <div
      className="modal fade"
      id="payRent"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content ">
          <Formik
          enableReinitialize
            initialValues={{
              amount: "",
              date:"",
              description:""
            }}
            validate={(values) => {
              const errors = {};
              if (!values.amount) {
                errors.amount = "Please enter amount!";
              }
              if (!values.date) {
                errors.date = "Please enter date!";
              }
             
           
              setError({ ...errors });
              return errors;
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              values.id = props.row_data.party_id;
              values.user_id = props.userId;
              setBtnPending(true);
              console.log(values);
              dispatch(payRentAmount(values,elementRef,setBtnPending,resetForm,props.filterValue));
              setSubmitting(false);
            }}
          >
            {({ values, isSubmitting, dirty, handleReset, touched,setFieldValue }) => (
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
                <div className="">
                    <div className="modal-body-row">
                      <h6>Pending Amount:</h6>
                      <p className="badge rounded-pill bg-text text-bg-warning xl-text">
                        ₹
                        {parseInt(props.pendingAmount).toLocaleString("en-IN")}
                      </p>
                    </div>
                    </div>
                  <div className="form-fields-wrap">
                    <div className="row">
                      <div className="col-md-6">
                 
                        <div className="form-group mb-3">
                          <label>
                            Enter Amount<span className="error-badge">*</span>
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
                        <div className="">
         
                        
                          
                        </div>
                      </div>
                      <div className="col-md-6">
                 
                 <div className="form-group mb-3">
                   <label>
                     Date<span className="error-badge">*</span>
                   </label>
                   <Field
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
                 <div className="form-group mb-3">
                   <label>
                     Description 
                   </label>
                   <Field
                     as="textarea"
                     name="description"
                     className={`form-control`}
                   />
             
                 </div>
                 
                   
                 </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
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
  );
};

export default PayRent;
