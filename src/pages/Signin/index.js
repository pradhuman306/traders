import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import {  Link} from "react-router-dom";
import * as Cokkie from "../../common/Cookies";
import ButtonLoader from "../Customloader/ButtonLoader";
const Signin = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.toasterReducer);
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
  }, []);

  useEffect(() => {
    setPendingLogin(false);
  }, [message]);

 
  return (
    <>
      <section className="login-main">
      <div className="login-main-wrapper">
          <div className="column">
            <div className="login-head text-center mb-4">
              <a href="#">
                <img
                  src="/assets/images/logo.svg"
                  className="image"
                />
              </a>
            </div>
            <div className="c-card  after-layer before-layer">
              <div className="c-card-wrap">
                <div className="form-header text-center mb-4">
                  <h1>Login</h1>
                  <div>Welcome to Pankaj Traders</div>
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
                        errors.email = "Invalid email address";
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
                    {({ isSubmitting, dirty, handleReset, touched }) => (
                      <Form action="" id="loginForm">
                        <div className="form-group mb-3">
                          <label>Email Address</label>
                          <Field
                            type="text"
                            name="email"
                            className={`form-control icon icon-email ${
                              touched.email && error.email ? "input-error" : ""
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
                          <label>Password</label>
                          <Field
                            type="password"
                            name="password"
                            className={`form-control icon icon-lock ${
                              touched.password && error.password
                                ? "input-error"
                                : ""
                            }`}
                            placeholder="Enter your password"
                          />
                          <ErrorMessage
                            className="error"
                            name="password"
                            component="span"
                          />
                        </div>
                        <div>
                     
                      </div>
                        <div className="form-group d-flex align-items-center justify-content-between cus-pd">
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
                          <Link to="/reset-password">Forgot Password</Link>
                        </div>
                       
                        <div className="form-group">
      
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary w-100"
                          >
                            {pendingLogin ? <ButtonLoader /> : "Login"}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
      
        <Footer />
        </div>
      </section>
      
    </>
  );
};

export default Signin;
