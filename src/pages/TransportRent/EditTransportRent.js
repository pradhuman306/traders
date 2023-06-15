import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import {  updateTransportRent } from '../../actions/transportrent';
import Select from 'react-select';
import { useRef } from 'react';
import ButtonLoader from '../Customloader/ButtonLoader';
import { useNavigate } from 'react-router-dom';
import { titleCase } from '../../actions/common';


const EditTransportRent = (props) => {
  const nav = useNavigate();
  const elementRef = useRef(null);
  const user_id = props.auth.userdata.id;
  const dispatch = useDispatch();
  const [dataList, setdataList] = useState(props.row_data);
  const [newListParty, setNewListParty] = useState([]);
  const [valueParty, setValueParty] = useState({});
  const [error, setError] = useState({});
  useEffect(() => {
    setdataList({ ...props.row_data });
    setValueParty({ label: titleCase(props.row_data.party_name), value: props.row_data.party });
    console.log(props.row_data);
  }, [props.row_id])
  useEffect(() => {
    let newPartyList = [];
    props.partyList.forEach(element => {
      console.log(element);
      newPartyList.push({ label: titleCase(element.name), value: element.id })
    });
    setNewListParty(newPartyList);
  }, [props.partyList])

  const handleSelectChange = (e, setFieldValue) => {
    setFieldValue('party', e.value);
    setValueParty(e);
    console.log(e.value);
  }


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
        {Object.keys(dataList).length != 0 ? 
            <>
            
            <Formik
              enableReinitialize
              initialValues={{
                party: dataList.party,
                destination: dataList.destination,
                rate: dataList.rate,
                advance: dataList.advance,
                date: dataList.date,
                weight:dataList.weight,
                description: dataList.description
              }}
              validate={(values) => {
                const errors = {};
                if (!values.party) {
                  errors.party = "Please select party!"
                }
                if (!values.destination) {
                  errors.destination = "Please enter destination!"
                }
           
           
                if (!values.date) {
                  errors.date = "Please enter date!"
                }

                setError({ ...errors });

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                values.user_id = user_id;
                values.id = props.row_id;
                props.setBtnPending(true);
                dispatch(updateTransportRent(values, elementRef, props.setBtnPending, props.row_data));
                setSubmitting(false);
              }}
            >
              {({ values, isSubmitting, touched, setFieldValue }) => (
                <Form action="" id="newcustomer">
          <div className="modal-head">
            <h4>Edit Transport</h4>
            <a
              onClick={(e) => e.preventDefault()}
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref={elementRef}
            >
              <img src="/assets/images/close.svg" alt="" />
            </a>
          </div>
          <div className="modal-body">
           
                  <div className="form-fields-wrap">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label>
                            Party <span className="error-badge">*</span>
                          </label>
                          <Select
                            className={`${touched.party && error.party
                              ? "input-error"
                              : ""
                              } ${values.party
                                ? "filled"
                                : ""
                              }`}
                            options={newListParty}
                            name="party"
                            onChange={(e) => handleSelectChange(e, setFieldValue)}
                            value={valueParty}
                            theme={(theme) => ({
                              ...theme,
                              borderRadius: 8,
                              colors: {
                                ...theme.colors,
                                primary25: 'rgb(0 120 219 / 10%);',
                                primary: '#0078db',
                              },
                            })}
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
                            <span className="error-badge">*</span>
                          </label>
                          <Field
                            type="text"
                            name="destination"
                            className={`form-control ${touched.destination && error.destination
                              ? "input-error"
                              : ""
                              } ${values.destination
                                ? "filled"
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
                          Weight <span className='badge rounded-pill text-bg-primary'>in quintal</span>
                          </label>
                          <Field
                            type="text"
                            name="weight"
                            placeholder="qt"
                            className={`form-control ${
                              touched.weight && error.weight
                                ? "input-error"
                                : ""
                            }  ${values.weight
                              ? "filled"
                              : ""
                            }`}
                          />
                       
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label>
                            Rate 
                          </label>
                          <Field
                            type="text"
                            name="rate"
                            className={`form-control ${touched.rate && error.rate
                              ? "input-error"
                              : ""
                              } ${values.rate
                                ? "filled"
                                : ""
                              }`}
                          />
                      
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label>
                            Advance 

                          </label>
                          <Field
                            type="text"
                            name="advance"
                            className={`form-control ${touched.advance && error.advance
                              ? "input-error"
                              : ""
                              } ${values.advance
                                ? "filled"
                                : ""
                              }`}
                          />
                    
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label>
                          Pending amount 
                            
                          </label>
                          <Field
                            type="text"
                            name="remainamount"
                            placeholder="₹"
                            className={`form-control`}
                            value={"₹"+parseInt((values.weight*values.rate)-values.advance).toLocaleString("en-IN")}
                            disabled
                          />
                       
                        </div>
                      </div>
                    </div>
                    <div className="row">
                 
                      <div className="col-md-12">
                        <div className="form-group mb-4">
                          <label>
                            Date <span className="error-badge">*</span>

                          </label>

                          <div className="input-group date" id="datepicker1">
                            <Field
                              type="date"
                              className={`form-control ${touched.date &&
                                error.date
                                ? "input-error"
                                : ""
                                } ${values.date
                                  ? "filled"
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
                      <div className="col-md-12">
                        <div className="form-group mb-4">
                          <label>
                            Description
                          </label>

                          <Field
                            as="textarea"
                            name="description"
                            className={`form-control ${values.description
                              ? "filled"
                              : ""
                            }`}
                          />
                        </div>
                      </div>
                    </div>


                  </div>
                  

                
          </div>
          <div className='modal-footer'>
          <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-primary m-auto"
                        >
                          {props.btnPending ? <ButtonLoader /> : "Update"}
                        </button>
          </div>
          </Form>
              )}
            </Formik></> : ""}
        </div>
      </div>
    </div>
  )
}

export default EditTransportRent
