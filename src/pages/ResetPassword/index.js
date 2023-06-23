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
          <div className="column">
            <div className="c-card after-layer before-layer">
              <div className="c-card-wrap">
                <div className="form-header ">
                  <img src="/assets/images/icon.svg" alt="" className="image" />
                  <h1>Reset Password</h1>
                  <h4>
                    Enter the email address and we'll send you a link to reset
                    password.
                  </h4>
                </div>
                <div className="login-form">
                  <Formik
                    initialValues={{ email: "" }}
                    validate={(values) => {
                      const errors = {};
                      if (!values.email) {
                        errors.email = "Please enter email address";
                      } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                          values.email
                        )
                      ) {
                        errors.email = "Invalid email address!";
                      }
                      setError({ ...errors });
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      props.setBtnPending(true);
                      dispatch(
                        ResetEmailSend(values, nav, props.setBtnPending)
                      );
                      setSubmitting(false);
                    }}
                  >
                    {({ isSubmitting, dirty, handleReset, values }) => (
                      <Form action="" id="loginForm">
                        <div className="form-group mb-3">
                          <label>
                            Email Address <span className="error-badge">*</span>
                          </label>
                          <Field
                            type="text"
                            name="email"
                            className={`form-control icon icon-email ${
                              error.email ? "input-error" : ""
                            } ${values.email ? "filled" : ""}`}
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
                            className="btn btn-primary w-100 center-btn"
                          >
                            {props.btnPending ? <ButtonLoader /> : "Send"}
                          </button>
                        </div>
                        
              <p className="extra-stuff text-center">
                <Link to="/signin">
                  {" "}
                  <img src="/assets/images/back.svg" alt="" />
                  Back to Login{" "}
                </Link>
              </p>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
              <div className="mobile-footer">
                <Footer />
              </div>
            </div>
            <div className="login-head text-center">
              <div className="login-in">
                <div className="login-logo">
                  <img src="/assets/images/logo.svg" alt="" />
                </div>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ResetPassword;
