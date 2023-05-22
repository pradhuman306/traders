import React, { useState, useCallback, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { ResetEmailSend } from "../../actions/auth";
import Footer from "../Footer";
import { Link, useNavigate } from "react-router-dom";
import ButtonLoader from "../Customloader/ButtonLoader";
function ResetPassword(props) {
  const nav = useNavigate();
  const [error, setError] = useState({});
  const dispatch = useDispatch();



  return (
    <>
      <section className="login-main">
        <div className="login-main-wrapper">
        <div className="column after-layer before-layer">
          <div className="login-head text-center mb-4">
            <a href="">
              <img src="/assets/images/logo.svg" className="image" />
            </a>
          </div>
          <div className="c-card">
            <div className="c-card-wrap">
              <div className="form-header text-center mb-4">
                <h1>Reset Password</h1>
                <div>Enter the email address and we'll send you a link to reset password.</div>
              </div>
              <div className="login-form">
                <Formik
                  initialValues={{ email: "" }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                      errors.email = "Please enter email address";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test (
                        values.email
                      )
                    ) {
                      errors.email = "Invalid email address";
                    }
                    setError({ ...errors });
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    props.setBtnPending(true);
                    dispatch(ResetEmailSend(values, nav,props.setBtnPending));
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting, dirty, handleReset }) => (
                    <Form action="" id="loginForm">
                      <div className="form-group mb-3">
                        <label>Email Address</label>
                        <Field
                          type="text"
                          name="email"
                          className={`form-control icon icon-email ${
                            error.email ? "input-error" : ""
                          }`}
                          placeholder="Enter your email"
                        />
                        <ErrorMessage
                          className="error"
                          name="email"
                          component="span"
                        />
                      </div>
                   
                      <div className="form-group">
                        <button
                          type="submit"
                         
                          className="btn btn-primary w-100"
                        >
                         {props.btnPending?<ButtonLoader/>:"Send"}
                        </button>
                      </div>
                      
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
          <p className="extra-stuff">Back to<Link to="/signin">Login</Link></p>
        </div>
        <Footer />
        </div>
      </section>
    </>
  );
}

export default ResetPassword;
