import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getParty, updateParty } from '../../actions/balancesheet';

const EditParty = (props) => {
  const partyList = useSelector((state)=>state.balanceSheetReducer).partyList;
  const { id } = useParams();
  console.log(id);
  const nav = useNavigate();
  const user_id = props.auth.userdata.id;
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (partyList.length > 0) {
      let editDataTemp = partyList.filter((item) => item.id.toString() === id);
      setEditData({...editDataTemp[0]});
    }
    console.log(partyList);
  }, [id,partyList])

  useEffect(() => {
    dispatch(getParty(user_id));
  }, [])


 

  return (
    <div className="body-content">
      <div className="usermanagement-main">
        <h2>Edit Party</h2>
        <Formik
          enableReinitialize
          initialValues={{
            name: editData.name,
            mobile: editData.mobile,
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
            values.id = id;
            dispatch(updateParty(values, nav));
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
              
                <div className="col-md-12 text-center mt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary m-auto"
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
  )
}

export default EditParty;
