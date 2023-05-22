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
import { useRef } from 'react';
import ButtonLoader from '../Customloader/ButtonLoader';


const EditTransportRent = (props) => {
  const elementRef = useRef(null);
  const user_id = props.auth.userdata.id;
  const stockid = props.stockid;
  const dispatch = useDispatch();
  const [dataList, setdataList] = useState(props.row_data);
  const [newListParty, setNewListParty] = useState([]);
  const [error, setError] = useState({});
  useEffect(()=>{
    setdataList({...props.row_data});
    setValueParty({label:props.row_data.party,value:props.row_data.id});
    console.log(props.row_data);
},[props.row_id])
useEffect(()=>{
  let newPartyList = [];
  props.partyList.forEach(element => {
    console.log(element);
    newPartyList.push({label:element.name,value:element.id})
  });
  setNewListParty(newPartyList);
},[props.partyList])

const handleSelectChange = (e,setFieldValue) => {
  setFieldValue('party',e.value);
  setValueParty(e);
  console.log(e.value);
} 
const [valueParty,setValueParty] = useState({});

  return (
    <div
    className="modal right fade"
    id="edittransportrent"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content right-modal">
        <div className="modal-head">
          <h4>Edit Transport Rent</h4>
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
        {Object.keys(dataList).length != 0 ? <Formik
          enableReinitialize
          initialValues={{
            party: dataList.party_id,
            destination: dataList.destination,
            rate: dataList.rate,
            advance: dataList.advance,
            date: dataList.date,
            description: dataList.description
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
            values.id = props.row_id;
            props.setBtnPending(true);
            dispatch(updateTransportRent(values, elementRef,props.setBtnPending));
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
                        options={newListParty}
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
                 {props.btnPending?<ButtonLoader/>:"Update"}
                  </button>
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

export default EditTransportRent
