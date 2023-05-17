import React, {useState} from "react";
import Footer from "../Footer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ResetPassword } from "../../actions/auth";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
function CreateNewPassword() {
  const [error, setError] = useState({})
  const params = useParams();
  const dispatch = useDispatch();
  return (
    <>
      <section className="login-main">
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
              </div>
              <div className="login-form">
                <Formik
                  initialValues={{ password:"", password_confirmation: "" }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.password) {
                      errors.password = "Enter Password";
                    }else if(
                      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i.test(
                        values.password
                      )
                    ){
                      errors.password = "The password should be min 8 and max 20 characters. It should have atleast a smallcase, uppercase, number and special character without white spaces"
                    }
                    if(!values.password_confirmation) {
                      errors.password_confirmation = "Enter Confirm Password";
                    }
                    if (
                      values.password &&
                      values.password_confirmation &&
                      values.password != values.password_confirmation
                    ) {
                      errors.password_confirmation = "Password does not match";
                      // errors.password = "Password does not match ";
                    }
                    setError({...errors})
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    values.token = params.token
                    dispatch(ResetPassword(values))
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting, dirty, handleReset, touched }) => (
                    <Form action="" id="loginForm">
                      <div className="form-group mb-3">
                        <label>Password</label>
                        <Field
                          type="password"
                          name="password"
                          className={`form-control icon icon-lock ${touched.password && error.password ? "input-error" : ""}`}
                          placeholder="Enter your password"
                        />
                        <ErrorMessage className="error" name="password" component="span" />
                      </div>
                      <div className="form-group mb-3">
                        <label>Confirm Password</label>
                        <Field
                          type="password"
                          name="password_confirmation"
                          className={`form-control icon icon-lock ${touched.password_confirmation && error.password_confirmation ? "input-error" : ""}`}
                          placeholder="Enter your password"
                        />
                        <ErrorMessage className="error"
                          name="password_confirmation"
                          component="span"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-primary w-100"
                        >
                          Submit
                        </button>
                      </div>
                      <div className="form-group">
                        <p className="text-center">Back to <Link to="/">Login</Link></p>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default CreateNewPassword;
