import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { useEffect } from 'react';
import { getParty } from '../../actions/balancesheet';
import { useRef } from 'react';
import ButtonLoader from '../Customloader/ButtonLoader';
import { addBuy, addSell } from '../../actions/buysell';
import { titleCase } from '../../actions/common';


const AddBuySell = (props) => {
    const elementRef = useRef(null);
    const itemSelectRef = useRef("");
    const godownSelectRef = useRef("");
    const firmSelectRef = useRef("");
    const partySelectRef = useRef("");
    const user_id = props.auth.userdata.id;
    const dispatch = useDispatch();
    const [error, setError] = useState({});
    const [isActive, setIsActive] = useState({ ...props.isActive });
    const [partyListOpt, setPartyListOptions] = useState([]);
    const [newListItems, setNewListItems] = useState([]);
    const [partyValue, setPartyValue] = useState({});
    const [itemValue, setItemValue] = useState({});

    const [godown,setGoDownList]=useState([]);
    const [firm,setFirmList]=useState([]);

    const [godownValue,setGodownValue]=useState({});
    

    
    const handleSelectChangeItem = (e, setFieldValue) => {
        if (e) {
            setFieldValue('item', e.value);
            setItemValue(e);
          
        }

    }
    const handleSelectChangeFirm = (e, setFieldValue) => {
        if (e) {
            setFieldValue('firm', e.value);
        }

    }
    useEffect(() => {
        dispatch(getParty(user_id));
    }, [])
    useEffect(() => {
        setIsActive({ ...props.isActive });
    }, [props.isActive])
    useEffect(() => {
        let newPartyList = [];
        props.partyList.forEach((item) => {
            newPartyList.push({ label: titleCase(item.name), value: item.id });
        })
        setPartyListOptions([...newPartyList]);
    }, [props.partyList])

    useEffect(() => {
        let godownList = [];
        let firmList = [];
        props.godownListAll.forEach((item) => {
            godownList.push({ label: titleCase(item.name), value: item.id });
        })
        setGoDownList([...godownList]);

        props.firmListAll.forEach((item) => {
            firmList.push({ label: titleCase(item.name), value: item.id });
        })
        setFirmList([...firmList]);

    }, [props.godownListAll,props.firmListAll])

    const handleSelectChange = (e, setFieldValue) => {
        if (e) {
            setFieldValue('party', e.value);
            setPartyValue(e);
        }
    }

    const handleSelectChangeGoDown = (e, setFieldValue) => {
        if (e) {
            setFieldValue('godown', e.value);
            setGodownValue(e);
        }
    }

    useEffect(() => {
        let newItemsList = [];
        props.itemListAll.forEach(element => {
            newItemsList.push({ label: titleCase(element.item), value: element.id })
        });
        setNewListItems(newItemsList);
    }, [props.itemListAll])

    const handleRadioChange = (e) => {

        let newActive = { ...isActive };
        if (e == 'buy') {
            newActive.buy = true;
            newActive.sell = false;
        } else if(e=='sell'){
            newActive.sell = true;
            newActive.buy = false;
        }else {
            newActive.urd = !newActive.urd;
        }

        setIsActive({ ...newActive });
    }

    return (
        <div
            className="modal right fade"
            id="addbuysell"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content right-modal">
                <Formik
                          
                            initialValues={{
                                party: "",
                                bill_no: "",
                                godown:"",
                                rate: "",
                                firm:"",
                                amount: "",
                                debit: "",
                                gst: "",
                                item: "",
                                weight: "",
                                commission: "",
                                description: "",
                                totalamount: 0,
                                date: ""
                            }}
                            validate={(values) => {
                                const errors = {};
                                if (!values.party) {
                                    errors.party = "Please select party!"
                                }
                                if (!values.item) {
                                    errors.item = "Please select item!"
                                }
                                if (!values.date) {
                                    errors.date = "Please select date!"
                                }
                                if (!values.godown) {
                                    errors.godown = "Please select godown!"
                                }


                                setError({ ...errors });

                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting, resetForm, setFieldValue }) => {
                                props.setBtnPending(true);
                                values.user_id = user_id;
                                values.URD = isActive.urd;
                                console.log(values);
                                itemSelectRef.current.clearValue();
                                partySelectRef.current.clearValue();
                                godownSelectRef.current.clearValue();
                             
                                if (isActive.buy) {
                                    dispatch(addBuy(values, elementRef, props.setBtnPending, resetForm,props.isActive));
                                } else if(isActive.sell) {
                                    dispatch(addSell(values, elementRef, props.setBtnPending, resetForm,props.isActive));
                                }   

                                setSubmitting(false);
                            }}
                        >
                            {({ values, isSubmitting, dirty, handleReset, touched, setFieldValue }) => (
                                <Form action="" id="newcustomer">
                    <div className="modal-head">
                        <h4>Add Entry</h4>

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
                                        <div className='row'>
                                            <div className='col-md-12'>
                                                <div className='group-field'>
                                                    <div className='gf-in'>
                                                        <div className='form-check'>
                                                            <Field className="form-check-input" type="radio" id="buy" name="picked" value="buy" onClick={(e) => handleRadioChange("buy")} checked={isActive.buy} />
                                                            <label htmlFor='buy' className='form-check-label'>
                                                                Buy
                                                            </label>
                                                        </div>

                                                        <div className='form-check'>
                                                            <Field className="form-check-input" type="radio" id="sell" name="picked" value="sell" onClick={(e) => handleRadioChange("sell")} checked={isActive.sell} />
                                                            <label htmlFor='sell' className='form-check-label'>
                                                                Sell
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="form-check">
                                                        <Field
                                                            type="checkbox"
                                                            onClick={(e) => handleRadioChange("urd")}
                                                            checked={isActive.urd}
                                                            className='form-check-input'
                                                            id="URD"
                                                          
                                                        />
                                                        <label htmlFor='URD' className='form-check-label'>
                                                            <span>Unregisterd Dealer</span>
                                                        </label>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
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
                                                        options={partyListOpt}
                                                        name="party"
                                                        isSearchable={true}
                                                        isClearable={true}
                                                        ref={partySelectRef}
                                                        onChange={(e) => handleSelectChange(e, setFieldValue)}
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
                                                        Bill no.

                                                    </label>
                                                    <Field
                                                    placeholder="Enter bill number"
                                                        type="text"
                                                        name="bill_no"
                                                        className={`form-control ${touched.bill_no && error.bill_no
                                                            ? "input-error"
                                                            : ""
                                                            } ${values.bill_no
                                                                ? "filled"
                                                                : ""
                                                              }`}
                                                    />
                                                    <ErrorMessage
                                                        className="error"
                                                        name="bill_no"
                                                        component="span"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                        <div className='col-md-6'>
                                                <div className="form-group mb-4">
                                                    <label>

                                                        Firm 
                                                    </label>

                                                    <Select
                                                        className={`${touched.firm && error.firm
                                                            ? "input-error"
                                                            : ""
                                                            } ${values.firm
                                                                ? "filled"
                                                                : ""
                                                              }`}
                                                        options={firm}
                                                        isSearchable={true}
                                                        isClearable={true}
                                                        name="firm"
                                                        ref={firmSelectRef}
                                                        onChange={(e) => handleSelectChangeFirm(e, setFieldValue)}
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

                                                
                                                </div>
                                            </div>
                                        <div className='col-md-6'>
                                                <div className="form-group mb-4">
                                                    <label>

                                                        Godown <span className="error-badge">*</span>
                                                    </label>

                                                    <Select
                                                        className={`${touched.godown && error.godown
                                                            ? "input-error"
                                                            : ""
                                                            } ${values.godown
                                                                ? "filled"
                                                                : ""
                                                              }`}
                                                        options={godown}
                                                        isSearchable={true}
                                                        isClearable={true}
                                                        name="godown"
                                                        ref={godownSelectRef}
                                                        onChange={(e) => handleSelectChangeGoDown(e, setFieldValue)}
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
                                                        name="godown"
                                                        component="span"
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className="form-group mb-4">
                                                    <label>

                                                        Item <span className="error-badge">*</span>
                                                    </label>

                                                    <Select
                                                        className={`${touched.item && error.item
                                                            ? "input-error"
                                                            : ""
                                                            } ${values.item
                                                                ? "filled"
                                                                : ""
                                                              }`}
                                                        options={newListItems}
                                                        isSearchable={true}
                                                        isClearable={true}
                                                        name="item"
                                                        ref={itemSelectRef}
                                                        onChange={(e) => handleSelectChangeItem(e, setFieldValue)}
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
                                                        name="item"
                                                        component="span"
                                                    />
                                                </div>
                                            </div>
                                           
                                            <div className="col-md-6">
                                                <div className="form-group mb-4">
                                                    <label>

                                                        Weight <span className='badge rounded-pill text-bg-primary'>in Quintal</span>
                                                    </label>

                                                    <Field
                                                    placeholder="Enter item weight"
                                                        type="number"
                                                        name="weight"
                                                        className={`form-control ${touched.weight && error.weight
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
                                                    ₹ Rate
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
                                                        placeholder="₹"


                                                    />

                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-4">
                                                    <label>
                                                    ₹ Amount
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="amount"
                                                        className={`form-control ${touched.amount && error.amount
                                                            ? "input-error"
                                                            : ""
                                                            }`}
                                                        value={values.amount = values.rate * values.weight}
                                                        placeholder="₹"
                                                        // disabled

                                                    />
                                                   
                                                    {/* <ErrorMessage
                                                        className="error"
                                                        name="amount"
                                                        component="span"
                                                    /> */}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-4">
                                                    <label>
                                                        Debit Note

                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="debit"
                                                        className={`form-control ${touched.debit && error.debit
                                                            ? "input-error"
                                                            : ""
                                                            } ${values.debit
                                                                ? "filled"
                                                                : ""
                                                              }`}
                                                        placeholder="₹"
                                                    // onChange={(e)=>handleChangeValues('debit',e,setFieldValue,values)}
                                                    />
                                                    {/* <ErrorMessage
                                                        className="error"
                                                        name="debit"
                                                        component="span"
                                                    /> */}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-4">
                                                    <label>
                                                        commission %

                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="commission"
                                                        className={`form-control ${touched.commission && error.commission
                                                            ? "input-error"
                                                            : ""
                                                            } ${values.commission
                                                                ? "filled"
                                                                : ""
                                                              }`}
                                                        placeholder="%"


                                                    />
                                                    {/* <ErrorMessage
                                                        className="error"
                                                        name="commision"
                                                        component="span"
                                                    /> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">

                                           
                                            
                                            <div className="col-md-6">
                                                <div className="form-group mb-4">
                                                    <label>
                                                        GST %
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="gst"
                                                        className={`form-control ${touched.gst && error.gst
                                                            ? "input-error"
                                                            : ""
                                                            } ${values.gst
                                                                ? "filled"
                                                                : ""
                                                              }`}
                                                        placeholder="%"
                                                    />
                                                    {/* <ErrorMessage
                                                        className="error"
                                                        name="gst"
                                                        component="span"
                                                    /> */}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>
                                                        Total Amount

                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="totalamount"
                                                        className={`form-control`}
                                                        disabled={true}
                                                        placeholder="₹"
                                                        value={
                                                     
                                                            values.commission/100 == 0 ? "₹"+(values.rate*values.weight - values.debit) :
                                                            "₹"+((values.rate*values.weight- values.debit)+parseInt([(values.rate*values.weight - values.debit)*(values.commission/100)])).toLocaleString("en-IN")
                                                            
                                                        }
                                                    />
                                                    {/* <ErrorMessage
                                                        className="error"
                                                        name="commision"
                                                        component="span"
                                                    /> */}
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
                                                    {props.btnPending ? <ButtonLoader /> : "Add"}
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

export default AddBuySell;
