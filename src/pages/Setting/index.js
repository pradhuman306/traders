import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import AuthContext from "../../context/authContext";
import { UpdateProfile, UpdatePassword } from "../../actions/auth";
function Setting(props) {
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const [error, setError] = useState({});

  var { firstname, lastname, phone, mobile, searchable_expire, email, id } =
    auth && auth.userdata ? auth.userdata : undefined;

  return (
    <>

      <div className="body-content">
        <div className="setting-form row">

          <div className="col-md-3">
            <div className="nav card">
            <a
                className="active"
                id="nav-item-tab"
                data-bs-toggle="tab"
                href="#item"
                role="tab"
                aria-controls="nav-item"
                aria-selected="true"
        
              >
               Items
              </a>
              <a
                className=""
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

            </div>
          </div>

          <div className="col-md-9">

            <div className="tab-content">
             
              <div
                className="tab-pane show active"
                id="item"
                aria-labelledby="nav-item-tab"
              >
                 <Formik
              initialValues={{
                item:""

              }}
              validate={(values) => {
                const errors = {};
            

                if (!values.item) {
                  errors.item =
                   "Please enter item name!";
                }

                setError({ ...errors });
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                console.log(values);
                // values.user_id = id;
                // dispatch(UpdateProfile(values));
                // setSubmitting(false);
              }}
            >
              {({ isSubmitting, dirty, handleReset, touched }) => (
                <Form action="" id="profile-form">

                  <h2 className="mb-4">Items</h2>
                  <div className="row">
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group mb-3">
                        <label htmlFor="">Items</label>
                        <Field
                          type="text"
                          name="item"
                          className={`form-control icon ${touched.item && error.item
                              ? "input-error"
                              : ""
                            }`}
                          placeholder="Enter your item"
                        />
                        <ErrorMessage
                          className="error"
                          name="item"
                          component="span"
                        />
                      </div>
                    </div>
                    
                  </div>
                  <div className="row mt-2">
                    <div className="col-12">
                      <button
                        type="submit"
                     
                        className="btn btn-primary"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>

              </div>
              <div
                className="tab-pane"
                id="customer"
                aria-labelledby="nav-customer-tab"
              >
                 <Formik
              initialValues={{
                email,
                firstname,
                lastname,
                phone,
                searchable_expire: searchable_expire
                  ? new Date(searchable_expire).toISOString().substr(0, 16)
                  : "",
              }}
              validate={(values) => {
                const errors = {};
                if (
                  values.email &&
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }

                if (values.firstname && values.firstname.length < 3) {
                  errors.firstname =
                   "Please enter valid first name";
                }

                if (values.lastname && values.lastname.length < 3) {
                  errors.lastname =
                    "Please enter valid last name";
                }

                if (
                  values.phone &&
                  (values.phone > 9999999999 || values.phone < 1000000000)
                ) {
                  errors.phone =
                   "Please enter valid phone number";
                }
                setError({ ...errors });
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                values.user_id = id;
                dispatch(UpdateProfile(values));
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
                          name="firstname"
                          className={`form-control icon ${touched.firstname && error.firstname
                              ? "input-error"
                              : ""
                            }`}
                          placeholder="Enter your name"
                        />
                        <ErrorMessage
                          className="error"
                          name="firstname"
                          component="span"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group mb-3">
                        <label htmlFor="">Last name</label>
                        <Field
                          type="text"
                          className={`form-control icon ${touched.lastname && error.lastname
                              ? "input-error"
                              : ""
                            }`}
                          placeholder="Enter your lastname"
                          name="lastname"
                        />
                        <ErrorMessage
                          className="error"
                          name="lastname"
                          component="span"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group mb-3">
                        <label htmlFor="">Phone No</label>
                        <Field
                          type="number"
                          className={`form-control icon ${touched.phone && error.phone ? "input-error" : ""
                            }`}
                          placeholder="Enter your number"
                          name="phone"
                        />
                        <ErrorMessage
                          className="error"
                          name="phone"
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
                        Update
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
                current_password: undefined,
                new_password: undefined,
                confirm_password: undefined,
              }}
              validate={(values) => {
                const errors = {};
                if (!values.current_password) {
                  errors.current_password =
                    "Enter current Password"
                }
                if (!values.new_password) {
                  errors.new_password = "Enter new Password";
                } else if (
                  !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i.test(
                    values.new_password
                  )
                ) {
                  errors.new_password = "Password strength text";
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
              onSubmit={(values, { setSubmitting }) => {
                values.user_id = id;
                dispatch(UpdatePassword(values));
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
                        Update
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
