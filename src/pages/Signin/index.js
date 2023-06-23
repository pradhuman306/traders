import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import { getLogo, login } from "../../actions/auth";
import { Link } from "react-router-dom";
import * as Cokkie from "../../common/Cookies";
import ButtonLoader from "../Customloader/ButtonLoader";
const Signin = (props) => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.toasterReducer);
  // const logo = useSelector((state) => state.logoReducer).logo;
  const email = Cokkie.getCookie("email") ? Cokkie.getCookie("email") : "";
  const password = Cokkie.getCookie("password")
    ? Cokkie.getCookie("password")
    : "";
  const remember =
    Cokkie.getCookie("email") && Cokkie.getCookie("password") ? true : false;

  const [pendingLogin, setPendingLogin] = useState(false);
  const [error, setError] = useState({});
  const [signInPending, setsignInPending] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setsignInPending(false);
    }, 1000);
    // dispatch(getLogo());
  }, []);

  useEffect(() => {
    setPendingLogin(false);
  }, [message]);

  return (
    <>
      <section className="login-main">
        <div className="login-main-wrapper">
          <div className="column">
            <div className="c-card after-layer before-layer">
              <div className="c-card-wrap">
                <div className="form-header">
                  <img src="/assets/images/icon.svg" alt="" className="image" />
                  <h1>Login</h1>
                  <h4>Welcome to Pankaj Traders</h4>
                </div>
                <div className="login-form">
                  <Formik
                    initialValues={{
                      email: email,
                      password: password,
                      rememberme: remember,
                    }}
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

                      if (!values.password) {
                        errors.password = "Please enter password";
                      }
                      setError({ ...errors });
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      setPendingLogin(true);
                      dispatch(login(values));
                      setSubmitting(false);
                    }}
                  >
                    {({
                      isSubmitting,
                      dirty,
                      handleReset,
                      touched,
                      values,
                    }) => (
                      <Form action="" id="loginForm">
                        <div className="form-group mb-3">
                          <label>
                            Email Address <span className="error-badge">*</span>
                          </label>
                          <Field
                            type="text"
                            name="email"
                            className={`form-control icon icon-email ${
                              touched.email && error.email ? "input-error" : ""
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
                          <label>
                            Password <span className="error-badge">*</span>
                          </label>
                          <Field
                            type="password"
                            name="password"
                            className={`form-control icon icon-lock ${
                              touched.password && error.password
                                ? "input-error"
                                : ""
                            } ${values.password ? "filled" : ""}`}
                            placeholder="Enter your password"
                          />
                          <ErrorMessage
                            className="error"
                            name="password"
                            component="span"
                          />
                        </div>
                        <div></div>
                        <div className="mb-3 mt-3 form-group d-flex align-items-center justify-content-between cus-pd">
                          <div className="form-check">
                            <Field
                              className="form-check-input"
                              type="checkbox"
                              name="rememberme"
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexCheckDefault"
                            >
                              Remember me
                            </label>
                          </div>
                          <Link to="/reset-password" className="f-name">
                            Forgot Password?
                          </Link>
                        </div>

                        <div className="form-group">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary w-100 center-btn"
                          >
                            {pendingLogin ? <ButtonLoader /> : "Login"}
                          </button>
                        </div>
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
};

export default Signin;
