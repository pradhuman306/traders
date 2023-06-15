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
import { titleCase } from '../../actions/common';


const AddTransportRent = (props) => {
  console.log(props);
    const elementRef = useRef(null);
    const partyRef = useRef(null);
    const partyList = useSelector((state)=>state.balanceSheetReducer).partyList;
    const user_id = props.auth.userdata.id;
    const dispatch = useDispatch();
    const [error, setError] = useState({});
    const [partyListOpt, setPartyListOptions] = useState([]);
    const [valueParty, setValueParty] = useState([]);
    
    useEffect(()=>{
dispatch(getParty(user_id));
    },[])
    useEffect(()=>{
      let newPartyList = [];
      partyList.forEach((item)=>{
        newPartyList.push({label:titleCase(item.name),value:item.id});
      })
      setPartyListOptions([...newPartyList]);
  
    },[partyList])

    useEffect(()=>{
   
      setValueParty({label:props.transportRow.party,value:props.transportRow.party_id});
  
    },[props.transportRow])

    const handleSelectChange = (e,setFieldValue) => {

      if(e){
        setFieldValue('party',e.value);
        setValueParty(e);
      }
    
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
      <Formik
      enableReinitialize
              initialValues={{
                party:props.transportRow.party_id,
                destination:"",
                rate:"",
                advance:"",
                weight:"",
                date:"",
                description:""
              }}
              validate={(values) => {
                const errors = {};
               if(!values.party){
                errors.party = "Please select party!"
               }
               if(!values.destination){
                errors.destination = "Please enter destination!"
               }
               if(!values.date){
                errors.date = "Please enter date!"
               }
              
                setError({ ...errors });

                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                props.setBtnPending(true);
                values.user_id = user_id;
                dispatch(addTransportRent(values,elementRef,props.setBtnPending,resetForm,partyRef,props.transportRow));
                
                setSubmitting(false);
              }}
            >
              {({ values, isSubmitting, dirty, handleReset, touched, setFieldValue }) => (
                <Form action="" id="newcustomer">
        <div className="modal-head">
          <h4>Add Transport</h4>
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
                           className={`${
                              touched.party && error.party
                                ? "input-error"
                                : ""
                            } ${values.party
                              ? "filled"
                              : ""
                            }`} 
                            isSearchable={true}
                            options={partyListOpt} 
                            ref={partyRef}
                            value={valueParty}
                            name="party" 
                            onChange={(e)=>handleSelectChange(e,setFieldValue)}
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
                            className={`form-control ${
                              touched.destination && error.destination
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
                            } ${values.weight
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
                            placeholder="₹"
                            className={`form-control ${
                              touched.rate && error.rate
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
                            placeholder="₹"
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
                     
                      <div className="col-md-12">
                        <div className="form-group mb-4">
                          <label>
                            Date <span className="error-badge">*</span>
                            
                          </label>
                       
                          <div className="input-group date" id="datepicker1">
                            <Field
                              type="date"
                              className={`form-control ${
                                touched.date &&
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
                     
                    </div>
                    <div className="row">
                  
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
                          {props.btnPending?<ButtonLoader/>:"Add"}
                        </button>
            </div>
            </Form>
              )}
            </Formik>
        </div>
      </div>
    </div>
  )
}

export default AddTransportRent
