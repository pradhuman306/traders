import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import AuthContext from "../../context/authContext";
import { UpdateProfile, UpdatePassword } from "../../actions/auth";
import ButtonLoader from "../Customloader/ButtonLoader";
function Setting(props) {
  console.log(props);
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const [error, setError] = useState({});

  var { name, mobile, email, id } =
    auth && auth.userdata ? auth.userdata : undefined;

  return (
    <>

      <div className="body-content">
        <div className="setting-form row">

          <div className="col-md-3">
            <div className="nav card">
            
              <a
                className="active"
                id="nav-customer-tab"
                data-bs-toggle="tab"
                href="#customer"
                role="tab"
                aria-controls="nav-customer"
                aria-selected="true"
        
              >
                Basic info
              </a>

              <a
                className=""
                id="nav-user-tab"
                data-bs-toggle="tab"
                href="#user"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
            Change password
              </a>

              <a
                className=""
                id="nav-logo-tab"
                data-bs-toggle="tab"
                href="#logo"
                role="tab"
                aria-controls="nav-logo"
                aria-selected="false"
              >
            Update Logo
              </a>

            </div>
          </div>

          <div className="col-md-9">

            <div className="tab-content">
             
           
              <div
                className="tab-pane show active"
                id="customer"
                aria-labelledby="nav-customer-tab"
              >
                 <Formik
              initialValues={{
                email,
                name,
                mobile,
              }}
              validate={(values) => {
                const errors = {};
                if (
                  values.email &&
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Please enter valid email address";
                }

                if (!values.name) {
                  errors.name =
                   "Please enter name";
                }

            

                if (
                  !values.mobile
                ) {
                  errors.mobile =
                   "Please enter mobile number";
                }
                setError({ ...errors });
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                values.user_id = id;
                props.setBtnPending(true);
                dispatch(UpdateProfile(values,props.setBtnPending));
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, dirty, handleReset, touched }) => (
                <Form action="" id="profile-form">

                  <h2 className="mb-4">Basic info</h2>
                  <div className="row">
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group mb-3">
                        <label htmlFor="">First name</label>
                        <Field
                          type="text"
                          name="name"
                          className={`form-control icon ${touched.name && error.name
                              ? "input-error"
                              : ""
                            }`}
                          placeholder="Enter your name"
                        />
                        <ErrorMessage
                          className="error"
                          name="name"
                          component="span"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group mb-3">
                        <label htmlFor="">Mobile No</label>
                        <Field
                          type="number"
                          className={`form-control icon ${touched.mobile && error.mobile ? "input-error" : ""
                            }`}
                          placeholder="Enter your number"
                          name="mobile"
                        />
                        <ErrorMessage
                          className="error"
                          name="mobile"
                          component="span"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group mb-3">
                        <label htmlFor="">Email address</label>
                        <Field
                          type="email"
                          className={`form-control icon ${touched.email && error.email ? "input-error" : ""
                            }`}
                          placeholder="Enter your email"
                          name="email"
                        />
                        <ErrorMessage
                          className="error"
                          name="email"
                          component="span"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-12">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary"
                      >
                           {props.btnPending?<ButtonLoader/>:"Update"}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>

              </div>
              <div
                      className="tab-pane"
                      id="user"
                      aria-labelledby="nav-user-tab"
                    >
                      <Formik
              initialValues={{
                current_password: "",
                new_password: "",
                confirm_password: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.current_password) {
                  errors.current_password =
                    "Enter current Password"
                }
                if (!values.new_password) {
                  errors.new_password = "Enter new Password";
                } 
                if (
                  values.new_password &&
                  values.confirm_password &&
                  values.new_password != values.confirm_password
                ) {
                  errors.confirm_password = "Password does not match";
                }
                setError({ ...errors });
                return errors;
              }}
              onSubmit={(values, { setSubmitting,resetForm }) => {
                values.user_id = id;
                props.setBtnPending(true);
                dispatch(UpdatePassword(values,resetForm,props.setBtnPending));
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, dirty, handleReset, touched }) => (
                <Form>
                  <h2 className="mb-4">Change password</h2>
                  <div className="row">

                    <div className="col-md-6 col-sm-6">
                      <div className="form-group mb-3">
                        <label htmlFor="">Current password</label>
                        <Field
                          type="password"
                          className={`form-control icon icon-lock ${touched.current_password && error.current_password
                              ? "input-error"
                              : ""
                            }`}
                          placeholder="Enter current password"
                          name="current_password"
                        />
                        <ErrorMessage
                          className="error"
                          name="current_password"
                          component="span"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group mb-3">
                        <label htmlFor="">New password</label>
                        <Field
                          type="password"
                          className={`form-control icon icon-lock ${touched.new_password && error.new_password
                              ? "input-error"
                              : ""
                            }`}
                          placeholder="Enter new password"
                          name="new_password"
                        />
                        <ErrorMessage
                          className="error"
                          name="new_password"
                          component="span"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group mb-3">
                        <label htmlFor="">Confirm new password</label>
                        <Field
                          type="password"
                          className={`form-control icon icon-lock ${touched.confirm_password && error.confirm_password
                              ? "input-error"
                              : ""
                            }`}
                          placeholder="Enter confirm password"
                          name="confirm_password"
                        />
                        <ErrorMessage
                          className="error"
                          name="confirm_password"
                          component="span"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-12">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary"
                      >
                    {props.btnPending?<ButtonLoader/>:"Update"}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
                      </div>

                      <div
                      className="tab-pane"
                      id="logo"
                      aria-labelledby="nav-logo-tab"
                    >
                      <Formik
              initialValues={{
                current_password: "",
                new_password: "",
                confirm_password: "",
                file:{}
              }}
              validate={(values) => {
                const errors = {};
                console.log(values.file);
                if (!values.current_password) {
                  errors.current_password =
                    "Enter current Password"
                }
                if (!values.new_password) {
                  errors.new_password = "Enter new Password";
                } 
                if (
                  values.new_password &&
                  values.confirm_password &&
                  values.new_password != values.confirm_password
                ) {
                  errors.confirm_password = "Password does not match";
                }
                setError({ ...errors });
                return errors;
              }}
              onSubmit={(values, { setSubmitting,resetForm }) => {
                values.user_id = id;
                props.setBtnPending(true);
                dispatch(UpdatePassword(values,resetForm,props.setBtnPending));
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, dirty, handleReset, touched,setFieldValue }) => (
                <Form>
                  <h2 className="mb-4">Update Logo</h2>
                  <div className="row">

                    <div className="col-md-6 col-sm-6">
                      <div className="form-group mb-3">
                        <label htmlFor="">Current password</label>
                        <Field
                          type="password"
                          className={`form-control icon icon-lock ${touched.current_password && error.current_password
                              ? "input-error"
                              : ""
                            }`}
                          placeholder="Enter current password"
                          name="current_password"
                        />
                        <ErrorMessage
                          className="error"
                          name="current_password"
                          component="span"
                        />
                        <input id="file" name="file" type="file" onChange={(event) => {
  setFieldValue("file", event.currentTarget.files[0]);
}} />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group mb-3">
                        <label htmlFor="">New password</label>
                        <Field
                          type="password"
                          className={`form-control icon icon-lock ${touched.new_password && error.new_password
                              ? "input-error"
                              : ""
                            }`}
                          placeholder="Enter new password"
                          name="new_password"
                        />
                        <ErrorMessage
                          className="error"
                          name="new_password"
                          component="span"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group mb-3">
                        <label htmlFor="">Confirm new password</label>
                        <Field
                          type="password"
                          className={`form-control icon icon-lock ${touched.confirm_password && error.confirm_password
                              ? "input-error"
                              : ""
                            }`}
                          placeholder="Enter confirm password"
                          name="confirm_password"
                        />
                        <ErrorMessage
                          className="error"
                          name="confirm_password"
                          component="span"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-12">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary"
                      >
                    {props.btnPending?<ButtonLoader/>:"Update"}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
                      </div>
            </div>

           


            
          </div>
        </div>
      </div>
    </>
  );
}

export default Setting;
