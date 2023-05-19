import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getParty } from '../../actions/balancesheet';
import { formatDate } from '../../actions/common';
import { addTransportRent, getTransportRentList, updateTransportRent } from '../../actions/transportrent';
import Select from 'react-select';


const EditTransportRent = (props) => {
  const transRentList = useSelector((state) => state.transportRentReducer).transportRentList;
  const partyList = useSelector((state) => state.balanceSheetReducer).partyList;
  const { id } = useParams();
  console.log(id);
  const nav = useNavigate();
  const user_id = props.auth.userdata.id;
  const dispatch = useDispatch();
  const [transRentListAll, setTransrentList] = useState([...transRentList]);
  const [error, setError] = useState({});
  const [partyListOpt, setPartyListOptions] = useState([]);
  const [editData, setEditData] = useState({});
  const [valueParty,setValueParty] = useState({});

  useEffect(() => {
    if (transRentList.length > 0) {
      let editDataTemp = transRentList.filter((item) => item.id.toString() === id);
      editDataTemp[0].date = formatDate(editDataTemp[0].date);
      setEditData({ ...editDataTemp[0] });
      console.log(editDataTemp[0]);
      let newPartyList = [];
      partyList.forEach((item) => {
        newPartyList.push({ label: item.name, value: item.id });
        if(item.id.toString() === editDataTemp[0].party_id.toString()){
          setValueParty({ label: item.name, value: item.id });
        }
      })

      setPartyListOptions([...newPartyList]);

    }
  }, [id, transRentList, partyList])

  useEffect(() => {
    dispatch(getTransportRentList(user_id));
    dispatch(getParty(user_id));
  }, [])


  const handleSelectChange = (e, setFieldValue) => {
    setFieldValue('party', e.value);
    console.log(e.value);
    setValueParty(e);
  }

  // const setOptionsValue = (val) => {
  //   let tmp = [];
  //   if (val) {
  //     tmp = partyList.filter((item) => {
  //       if (item.value.toString() === val.toString()) {
  //         return true;
  //       }

  //     }


  //     )
  //   }
  //   console.log(tmp);
  // }


  return (
    <div className="body-content">
      <div className="usermanagement-main">
        <h2>Edit Transport Rent</h2>
        <Formik
          enableReinitialize
          initialValues={{
            party: editData.party_id,
            destination: editData.destination,
            rate: editData.rate,
            advance: editData.advance,
            date: editData.date,
            description: editData.description
          }}
          validate={(values) => {
            const errors = {};
            if (!values.party) {
              errors.party = "Please select Party!"
            }
            if (!values.destination) {
              errors.destination = "Please fill Destination!"
            }
            if (!values.rate) {
              errors.rate = "Please fill Rate!"
            } 
            if (!values.advance) {
              errors.advance = "Please fill Advance!"
            }
            if (!values.date) {
              errors.date = "Please fill Date!"
            }

            setError({ ...errors });

            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            values.user_id = user_id;
            values.id = id;
            dispatch(updateTransportRent(values, nav));
            setSubmitting(false);
          }}
        >
          {({ values, isSubmitting, dirty, handleReset, touched, setFieldValue }) => (
            <Form action="" id="newcustomer">
              <div className="form-fields-wrap">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label>
                        Party <span className="error">*</span>
                      </label>
                      <Select
                        className={`form-control ${touched.party && error.party
                          ? "input-error"
                          : ""
                          }`}
                        options={partyListOpt}
                        name="party"
                        onChange={(e) => handleSelectChange(e, setFieldValue)}
                        value={valueParty}
                      />
                      <ErrorMessage
                        className="error"
                        name="party"
                        component="span"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label>
                        Destination
                        <span className="error">*</span>
                      </label>
                      <Field
                        type="text"
                        name="destination"
                        className={`form-control ${touched.destination && error.destination
                          ? "input-error"
                          : ""
                          }`}
                      />
                      <ErrorMessage
                        className="error"
                        name="destination"
                        component="span"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label>
                        Rate <span className="error">*</span>
                      </label>
                      <Field
                        type="text"
                        name="rate"
                        className={`form-control ${touched.rate && error.rate
                          ? "input-error"
                          : ""
                          }`}
                      />
                      <ErrorMessage
                        className="error"
                        name="rate"
                        component="span"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label>
                        Advance <span className="error">*</span>

                      </label>
                      <Field
                        type="text"
                        name="advance"
                        className={`form-control ${touched.advance && error.advance
                          ? "input-error"
                          : ""
                          }`}
                      />
                      <ErrorMessage
                        className="error"
                        name="advance"
                        component="span"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label>
                        Date <span className="error">*</span>

                      </label>

                      <div className="input-group date" id="datepicker1">
                        <Field
                          type="date"
                          className={`form-control ${touched.date &&
                            error.date
                            ? "input-error"
                            : ""
                            }`}
                          name="date"

                        />

                      </div>
                      <ErrorMessage
                        className="error"
                        name="date"
                        component="span"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label>
                        Description
                      </label>

                      <Field
                        type="text"
                        name="description"
                        className="form-control"
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

export default EditTransportRent
