import React from 'react'
import { UpdatePassword } from '../actions/auth';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import authContext from '../context/authContext';
import ButtonLoader from '../pages/Customloader/ButtonLoader';
import { useContext } from 'react';
import { useState } from 'react';
const UpdatePass = (props) => {
  const auth = useContext(authContext);
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  var { id } =
    auth && auth.userdata ? auth.userdata : undefined;
  return (
    <>
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
              "Enter current password"
          }
          if (!values.new_password) {
            errors.new_password = "Enter new password";
          }
          if (
            values.new_password &&
            values.confirm_password &&
            values.new_password != values.confirm_password
          ) {
            errors.confirm_password = "Password does not match!";
          }
          setError({ ...errors });
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          values.user_id = id;
          props.setBtnPending(true);
          dispatch(UpdatePassword(values, resetForm, props.setBtnPending));
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, dirty, handleReset, touched,values }) => (
          <Form>
            <div className='nav card'>
              <div className="row">

                <div className="col-md-6 col-sm-6">
                  <div className="form-group mb-3">
                    <label htmlFor="">Current password <span className="error-badge">*</span></label>
                    <Field
                      type="password"
                      className={`form-control icon icon-lock ${touched.current_password && error.current_password
                        ? "input-error"
                        : ""
                        } ${values.current_password
                          ? "filled"
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
                    <label htmlFor="">New password <span className="error-badge">*</span></label>
                    <Field
                      type="password"
                      className={`form-control icon icon-lock ${touched.new_password && error.new_password
                        ? "input-error"
                        : ""
                        } ${values.new_password
                          ? "filled"
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
                        } ${values.confirm_password
                          ? "filled"
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
                    className="btn btn-primary d-flex justify-content-center align-items-center"
                  >
                    {props.btnPending ? <ButtonLoader /> : "Update"}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik></>
  )
}

export default UpdatePass