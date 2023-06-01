import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAccount, addAccountDetails, updateAccountDetails } from '../../actions/accounts';
import Select from 'react-select';
import { updateStockDetails } from '../../actions/godown';
import ButtonLoader from '../Customloader/ButtonLoader';


const EditStockDetails = (props) => {
  const elementRef = useRef(null);
  const user_id = props.auth.userdata.id;
  const stockid = props.stockid;
  const dispatch = useDispatch();
  const [dataList, setdataList] = useState(props.row_data);
  const [newListItems, setNewListItems] = useState([]);
  const [newListFirm, setNewListFirm] = useState([]);
  const [newListGodown, setNewGodownList] = useState([]);
  const [valueItem, setValueItem] = useState({});
  const [valueFirm, setValueFirm] = useState({});
  const [valueGoDown, setValueGoDown] = useState({});


  const [error, setError] = useState({});
  useEffect(() => {
    setdataList({ ...props.row_data });
    setValueItem({ label: props.row_data.item, value: props.row_data.id });
    setValueFirm({ label: props.row_data.firm, value: props.row_data.firm_id });
    setValueGoDown({ label: props.row_data.stock, value: props.row_data.stock_id });
    console.log(props.row_data);
  }, [props.row_id])
  useEffect(()=>{
    let newItemsList = [];
    let newFirmList = [];
    let newGoDownList = [];
    props.itemListAll.forEach(element => {
      newItemsList.push({label:element.item,value:element.id})
    });
    props.firmListAll.forEach(element => {
      newFirmList.push({label:element.name,value:element.id})
    });
    props.godownListAll.forEach(element => {
      newGoDownList.push({label:element.name,value:element.id})
    });
    setNewGodownList(newGoDownList);
    setNewListItems(newItemsList);
    setNewListFirm(newFirmList);
  },[props.itemListAll,props.firmListAll,props.godownListAll])

  const handleSelectChange = (e, setFieldValue) => {
    setFieldValue('item', e.value);
    setValueItem(e);
    console.log(e.value);
  }
  const handleSelectChangeFirm = (e, setFieldValue) => {
    setFieldValue('firm', e.value);
    setValueFirm(e);
    console.log(e.value);
  }

  const handleSelectChangeGoDown = (e,setFieldValue) => {
    if(e){
      setFieldValue('godown',e.value);
      setValueGoDown(e);
    }
  } 

  return (
    <div
      className="modal right fade"
      id="editaccountdetails"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content right-modal">



          {Object.keys(dataList).length != 0 ?
            <div>
              <Formik
                enableReinitialize
                initialValues={{
                  firm: dataList.firm,
                  godown:dataList.stock_id,
                  item: dataList.item,
                  quantity: dataList.quantity,
                  weight: dataList.weight,
                  rate: dataList.rate,
                  vehicle_no: dataList.vehicle_no,
                  date: dataList.date

                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.item) {
                    errors.item = "Please select item!"
                  }
                  if (!values.date) {
                    errors.date = "Please enter date!"
                  }
                  if (!values.godown) {
                    errors.godown = "Please select godown!"
                  }

                  setError({ ...errors });
                  return errors;
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  values.user_id = user_id;
                  values.stock_id = values.godown;
                  values.id = props.row_id;
                  props.setBtnPending(true);
                  dispatch(updateStockDetails(values, elementRef, props.setBtnPending));
                  setSubmitting(false);
                }}
              >
                {({ values, isSubmitting, dirty, handleReset, touched, setFieldValue }) => (
                  <Form action="" id="newcustomer">
                    <div className="modal-head">
                      <h4>Edit Stock</h4>
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
                            
                          GoDown
                          </label>
                          <Select 
                            className={`${
                              touched.godown && error.godown
                                ? "input-error"
                                : ""
                            }`} 
                            options={newListGodown} 
                            isSearchable={true}
                            value={valueGoDown}
                            name="godown" 
                            onChange={(e)=>handleSelectChangeGoDown(e,setFieldValue)}
                            theme={(theme) => ({
                              ...theme,
                              borderRadius: 8,
                              colors: {
                                ...theme.colors,
                                primary25: 'rgba(5,131,107,0.1)',
                                primary: '#05836b',
                              },
                            })}
                            />
                          
                          <ErrorMessage
                            className="error"
                            name="godown"
                            component="span"
                          />
                       
                        </div>
                      </div>
                          <div className="col-md-6">
                            <div className="form-group mb-4">
                              <label>

                                Item
                              </label>
                              <Select
                                className={`${touched.item && error.item
                                    ? "input-error"
                                    : ""
                                  }`}
                                options={newListItems}
                                name="item"
                                onChange={(e) => handleSelectChange(e, setFieldValue)}
                                value={valueItem}
                                theme={(theme) => ({
                                  ...theme,
                                  borderRadius: 8,
                                  colors: {
                                    ...theme.colors,
                                    primary25: 'rgba(5,131,107,0.1)',
                                    primary: '#05836b',
                                  },
                                })}
                              />

                              <ErrorMessage
                                className="error"
                                name="item"
                                component="span"
                              />

                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group mb-4">
                              <label>

                                firm
                              </label>
                              <Select
                                className={`${touched.firm && error.firm
                                    ? "input-error"
                                    : ""
                                  }`}
                                options={newListFirm}
                                name="firm"
                                onChange={(e) => handleSelectChangeFirm(e, setFieldValue)}
                                value={valueFirm}
                                theme={(theme) => ({
                                  ...theme,
                                  borderRadius: 8,
                                  colors: {
                                    ...theme.colors,
                                    primary25: 'rgba(5,131,107,0.1)',
                                    primary: '#05836b',
                                  },
                                })}
                              />

                              <ErrorMessage
                                className="error"
                                name="firm"
                                component="span"
                              />

                            </div>
                          </div>

                      
                          <div className="col-md-6">
                            <div className="form-group mb-4">
                              <label>

                                Quantity
                              </label>
                              <Field
                                type="number"
                                name="quantity"
                                className={`form-control`}
                              />

                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group mb-4">
                              <label>

                                Weight <span className='badge bg-secondary'>in quintal</span>
                              </label>
                              <Field
                                type="number"
                                name="weight"
                                className={`form-control`}
                              />

                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group mb-4">
                              <label>

                                Rate
                              </label>
                              <Field
                                type="number"
                                name="rate"
                                className={`form-control`}
                                placeholder="₹"
                              />

                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group mb-4">
                              <label>

                                Amount
                              </label>
                              <Field
                                type="text"
                                name="amount"
                                className={`form-control`}
                                placeholder="₹"
                                value={"₹" + parseInt(values.weight * values.rate).toLocaleString("en-IN")}
                                disabled
                              />

                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group mb-4">
                              <label>

                                Vehicle no.
                              </label>
                              <Field
                                type="text"
                                name="vehicle_no"
                                className={`form-control`}
                              />

                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group mb-4">
                              <label>

                                Date <span className="error-badge">*</span>
                              </label>
                              <Field
                                type="date"
                                name="date"
                                className={`form-control ${touched.date && error.date
                                    ? "input-error"
                                    : ""
                                  }`}
                              />
                              <ErrorMessage
                                className="error"
                                name="date"
                                component="span"
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
              </Formik></div> : ""}

        </div>
      </div>
    </div>
  )
}

export default EditStockDetails;
