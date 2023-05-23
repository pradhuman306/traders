import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getParty, updateParty } from '../../actions/balancesheet';
import ButtonLoader from '../Customloader/ButtonLoader';

const EditParty = (props) => {
  const elementRef = useRef(null);
  const user_id = props.auth.userdata.id;
  const dispatch = useDispatch();
  const [dataList, setdataList] = useState(props.row_data);
  const [error, setError] = useState({});
  const [btnPending, setBtnPending] = useState(false);
  useEffect(() => {
    setdataList({ ...props.row_data });
  }, [props.row_data])


  return (
    <div
      className="modal right fade"
      id="editparty"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content right-modal">
          <div className="modal-head">
            <h4>Edit Party</h4>
            <a
              onClick={(e) => e.preventDefault()}
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref={elementRef}
            >
              <img src="/assets/images/icon-close.svg" alt="" />
            </a>
          </div>
          <div className="modal-body">
            {Object.keys(dataList).length != 0 ?
              <Formik
                enableReinitialize
                initialValues={{
                  name: dataList.name,
                  mobile: dataList.mobile,
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.name) {
                    errors.name = "Please fill Party !"
                  }


                  setError({ ...errors });

                  return errors;
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  values.user_id = user_id;
                  values.id = props.row_id;
                  setBtnPending(true);
                  dispatch(updateParty(values, elementRef, setBtnPending));
                  setSubmitting(false);
                }}
              >
                {({ values, isSubmitting, dirty, handleReset, touched }) => (
                  <Form action="" id="newcustomer">
                    <div className="form-fields-wrap">

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group mb-4">
                            <label>
                              Party <span className="error">*</span>
                            </label>
                            <Field
                              type="text"
                              name="name"
                              className={`form-control ${touched.name && error.name
                                ? "input-error"
                                : ""
                                }`}
                            />
                            <ErrorMessage
                              className="error"
                              name="name"
                              component="span"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-4">
                            <label>
                              Mobile
                            </label>
                            <Field
                              type="number"
                              name="mobile"
                              className={`form-control`}
                            />

                          </div>
                        </div>

                      </div>

                    </div>
                    <div className='frm-btn-wrap'>
                      <div className='row'>

                        <div className="col-md-12 text-center mt-4">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary m-auto"
                          >
                            {btnPending ? <ButtonLoader /> : "Update"}
                          </button>
                        </div>
                      </div>
                    </div>

                  </Form>
                )}
              </Formik> : ""}

          </div>
        </div>
      </div>
    </div>
  )
}

export default EditParty;