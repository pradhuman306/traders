import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import authContext from '../context/authContext';
import ButtonLoader from '../pages/Customloader/ButtonLoader';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { UpdateProfile, getLogo, updateLogo } from '../actions/auth';



const AccountInfo = (props) => {

    const auth = useContext(authContext);
    const [img, setImg] = useState(props.profilePic);
    const dispatch = useDispatch();
    const [error, setError] = useState({});
    var { name, mobile, email, id } =
    auth && auth.userdata ? auth.userdata : undefined;

  const handleChange = (e, setFieldValue) => {
    setFieldValue("logo", e.currentTarget.files[0]);
    setImg(URL.createObjectURL(e.currentTarget.files[0]));
  }
  useEffect(() => {
    dispatch(getLogo());
  }, [])
  return (
  <>
         <Formik
                    initialValues={{
                      email,
                      name,
                      mobile,
                      logo: "",
                    }}
                    validate={(values) => {
                      const errors = {};
                      if (
                        values.email &&
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                      ) {
                        errors.email = "Please enter valid email address!";
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
                      dispatch(UpdateProfile(values, props.setBtnPending));


                      if (!values.logo) {
                        values.old_logo = img;
                        delete values.logo;
                      }
                      dispatch(updateLogo(values, props.setBtnPending));
                    
                      setSubmitting(false);
                    }}
                  >
                    {({ isSubmitting, dirty, handleReset, touched, setFieldValue, values }) => (
                      <Form action="" id="profile-form">
                        <div className='nav card'>
                        <div className="row">
                          <div className="col-md-6 col-sm-6">
                            <div className="form-group mb-3">
                              <label htmlFor="">Name</label>
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
                        <div className="row">

                          <div className="col-md-12 col-sm-12">
                            <div className="form-group mb-3">


                              <div className="row d-flex align-items-center">
                                <div className="col-md-6">
                                  <div
                                    className="image-input"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-bs-original-title="Upload image"
                                  >
                                    <input
                                      type="file"
                                      name="letter_pad"
                                      id="letter_pad"
                                      className=""
                                      placeholder="Enter letter_pad"
                                      onChange={(e) => handleChange(e, setFieldValue)}
                                    />
                                    <input
                                      type="hidden"
                                      name="old_letter_pad"
                                      id="old_letter_pad"
                                      value=""
                                    />
                                    <label htmlFor="letter_pad" className="image-button">
                                      <img src="/assets/images/icon-image.svg" alt="" />
                                      {"Upload profile picture"}
                                    </label>
                                  </div>
                                  <ErrorMessage
                                    className="error"
                                    name="logo"
                                    component="span"
                                  />
                                </div>
                                <div className="col-md-3">
                                  <div className="logo-wrapper">
                                    {img && <img className="preview-img" src={img} alt="" />}
                                  </div>
                                </div>
                              </div>

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
                  </Formik>
  </>
  )
}

export default AccountInfo