import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTransportRent } from '../../actions/transportrent';
import Select from 'react-select';
import { useEffect } from 'react';
import { getParty } from '../../actions/balancesheet';
import { useRef } from 'react';
import ButtonLoader from '../Customloader/ButtonLoader';


const AddTransportRent = (props) => {
    const nav = useNavigate();
    const elementRef = useRef(null);
    const partyList = useSelector((state)=>state.balanceSheetReducer).partyList;
    const user_id = props.auth.userdata.id;
    const dispatch = useDispatch();
    const [error, setError] = useState({});
    const [partyListOpt, setPartyListOptions] = useState([]);
    useEffect(()=>{
dispatch(getParty(user_id));
    },[])
    useEffect(()=>{
      let newPartyList = [];
      partyList.forEach((item)=>{
        newPartyList.push({label:item.name,value:item.id});
      })
      setPartyListOptions([...newPartyList]);
    },[partyList])

    const handleSelectChange = (e,setFieldValue) => {
      setFieldValue('party',e.value);
      console.log(e.value);
    } 
  return (
    <div
    className="modal right fade"
    id="addtransportrent"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content right-modal">
        <div className="modal-head">
          <h4>Add Transport Rent</h4>
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
    <Formik
              initialValues={{
                party:"",
                destination:"",
                rate:"",
                advance:"",
                date:"",
                description:""
              }}
              validate={(values) => {
                const errors = {};
               if(!values.party){
                errors.party = "Please select Party !"
               }
               if(!values.destination){
                errors.destination = "Please fill Destination !"
               }
               if(!values.rate){
                errors.rate = "Please fill Rate !"
               }
               if(!values.advance){
                errors.advance = "Please fill Advance !"
               }
               if(!values.date){
                errors.date = "Please fill Date !"
               }
              
                setError({ ...errors });

                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                props.setBtnPending(true);
                values.user_id = user_id;
                dispatch(addTransportRent(values,elementRef,props.setBtnPending));
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
                          {/* <Field
                            type="text"
                            name="party"
                            className={`form-control ${
                              touched.party && error.party
                                ? "input-error"
                                : ""
                            }`}
                          /> */}
                           <Select 
                           className={`${
                              touched.party && error.party
                                ? "input-error"
                                : ""
                            }`} 
                            options={partyListOpt} 
                            name="party" 
                      
                            onChange={(e)=>handleSelectChange(e,setFieldValue)}
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
                            className={`form-control ${
                              touched.destination && error.destination
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
                            className={`form-control ${
                              touched.rate && error.rate
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
                            className={`form-control ${
                              touched.advance && error.advance
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
                              className={`form-control ${
                                touched.date &&
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
                          {props.btnPending?<ButtonLoader/>:"Add"}
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
  )
}

export default AddTransportRent
