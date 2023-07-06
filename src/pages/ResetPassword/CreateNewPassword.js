import React, {useState} from "react";
import Footer from "../Footer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ResetPassword } from "../../actions/auth";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ButtonLoader from "../Customloader/ButtonLoader";
function CreateNewPassword(props) {
  const [error, setError] = useState({})
  const params = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  return (
    <>
      <section className="login-main">
      <div className="column">
        <div className="column after-layer before-layer">
          <div className="c-card">
            <div className="c-card-wrap">
              <div className="form-header">
               <img src="/assets/images/icon.svg" className="image" />
                <h1>Reset Password</h1>
              </div>
              <div className="login-form">
                <Formik
                  initialValues={{ password:"", password_confirmation: "" }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.password) {
                      errors.password = "Please enter your password";
                    }
                    if(!values.password_confirmation) {
                      errors.password_confirmation = "Please enter confirm password";
                    }
                    if (
                      values.password &&
                      values.password_confirmation &&
                      values.password != values.password_confirmation
                    ) {
                      errors.password_confirmation = "Password does not match!";
                    
                    }
                    setError({...errors})
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    values.token = params.token;
                    props.setBtnPending(true);
                    dispatch(ResetPassword(values,nav,props.setBtnPending))
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting, dirty, handleReset, touched, values }) => (
                    <Form action="" id="loginForm">
                      <div className="form-group mb-3">
                        <label>Password <span className="error-badge">*</span></label>
                        <Field
                          type="password"
                          name="password"
                          className={`form-control icon icon-lock ${touched.password && error.password ? "input-error" : ""} ${values.password
                            ? "filled"
                            : ""
                          }`}
                          placeholder="Enter your password"
                        />
                        <ErrorMessage className="error" name="password" component="span" />
                      </div>
                      <div className="form-group mb-3">
                        <label>Confirm Password <span className="error-badge">*</span></label>
                        <Field
                          type="password"
                          name="password_confirmation"
                          className={`form-control icon icon-lock ${touched.password_confirmation && error.password_confirmation ? "input-error" : ""} ${values.password_confirmation
                            ? "filled"
                            : ""
                          }`}
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
                           {props.btnPending?<ButtonLoader/>:"Submit"}
                        </button>
                      </div>
                     
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <p className="extra-stuff"><Link to="/signin"> <img
                    src="/assets/images/back.svg" alt=""
                 
                  />Back to Login </Link></p>
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
      </section>
      <Footer />
    </>
  );
}

export default CreateNewPassword;
