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


const AddBuySell = (props) => {
    const elementRef = useRef(null);
    const itemSelectRef = useRef("");
    const partySelectRef = useRef("");
    const user_id = props.auth.userdata.id;
    const dispatch = useDispatch();
    const [error, setError] = useState({});
    const [isActive, setIsActive] = useState({ ...props.isActive });
    const [partyListOpt, setPartyListOptions] = useState([]);
    const [newListItems, setNewListItems] = useState([]);
    const [partyValue, setPartyValue] = useState({});
    const [itemValue, setItemValue] = useState({});
    const handleSelectChangeItem = (e, setFieldValue) => {
        if (e) {
            setFieldValue('item', e.value);
            setItemValue(e);
            console.log(e.value);
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
            newPartyList.push({ label: item.name, value: item.id });
        })
        setPartyListOptions([...newPartyList]);
    }, [props.partyList])

    const handleSelectChange = (e, setFieldValue) => {
        if (e) {
            setFieldValue('party', e.value);
            setPartyValue(e);
        }
    }

    useEffect(() => {
        let newItemsList = [];
        props.itemListAll.forEach(element => {
            newItemsList.push({ label: element.item, value: element.id })
        });
        setNewListItems(newItemsList);
    }, [props.itemListAll])

    const handleRadioChange = (e) => {

        let newActive = { ...isActive };
        if (e == 'buy') {
            newActive.buy = true;
            newActive.sell = false;
        } else {
            newActive.sell = true;
            newActive.buy = false;
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
                    <div className="modal-head">
                        <h4>Add Buy Sell</h4>

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
                                party: "",
                                bill_no: "",
                                amount: "",
                                debit: "",
                                gst: "",
                                item: "",
                                weight: "",
                                commission: "",
                                URD: "",
                                description: "",
                                totalamount: 0,
                                date: ""
                            }}
                            validate={(values) => {
                                const errors = {};
                                if (!values.party) {
                                    errors.party = "Please select party !"
                                }
                                if (!values.item) {
                                    errors.item = "Please select item !"
                                }
                                if (!values.date) {
                                    errors.date = "Please select Date !"
                                }


                                setError({ ...errors });

                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting, resetForm, setFieldValue }) => {
                                props.setBtnPending(true);
                                values.user_id = user_id;
                                console.log(values);
                                console.log(itemSelectRef);
                                itemSelectRef.current.clearValue();
                                partySelectRef.current.clearValue();
                                if (isActive.buy) {
                                    dispatch(addBuy(values, elementRef, props.setBtnPending, resetForm));
                                } else {
                                    dispatch(addSell(values, elementRef, props.setBtnPending, resetForm));
                                }

                                setSubmitting(false);
                            }}
                        >
                            {({ values, isSubmitting, dirty, handleReset, touched, setFieldValue }) => (
                                <Form action="" id="newcustomer">
                                    <div className="form-fields-wrap">
                                        <div className='row'>
                                            <div className='col-md-12'>
                                                <div className='group-field'>
                                                    <div>
                                                        <Field type="radio" id="buy" name="picked" value="buy" onClick={(e) => handleRadioChange("buy")} checked={isActive.buy} />
                                                        <label htmlFor='buy'>
                                                            Buy
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <Field type="radio" id="sell" name="picked" value="sell" onClick={(e) => handleRadioChange("sell")} checked={isActive.sell} />
                                                        <label htmlFor='sell'>
                                                            Sell
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group mb-4">


                                                    <Field
                                                        type="checkbox"
                                                        name="URD"
                                                        className={`form-control ${touched.URD && error.URD
                                                            ? "input-error"
                                                            : ""
                                                            }`}
                                                        id="URD"
                                                    />
                                                    <label htmlFor='URD'>
                                                        Unregisterd Dealer
                                                    </label>

                                                </div>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">

                                                <div className="form-group mb-4">
                                                    <label>

                                                        Party <span className="error">*</span>
                                                    </label>

                                                    <Select
                                                        className={`${touched.party && error.party
                                                            ? "input-error"
                                                            : ""
                                                            }`}
                                                        options={partyListOpt}
                                                        name="party"
                                                        isSearchable={true}
                                                        isClearable={true}
                                                        ref={partySelectRef}
                                                        onChange={(e) => handleSelectChange(e, setFieldValue)}
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
                                                        Bill no

                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="bill_no"
                                                        className={`form-control ${touched.bill_no && error.bill_no
                                                            ? "input-error"
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

                                                        Item <span className="error">*</span>
                                                    </label>

                                                    <Select
                                                        className={`${touched.item && error.item
                                                            ? "input-error"
                                                            : ""
                                                            }`}
                                                        options={newListItems}
                                                        isSearchable={true}
                                                        isClearable={true}
                                                        name="item"
                                                        ref={itemSelectRef}
                                                        onChange={(e) => handleSelectChangeItem(e, setFieldValue)}
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
                                                        Amount
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="amount"
                                                        className={`form-control ${touched.amount && error.amount
                                                            ? "input-error"
                                                            : ""
                                                            }`}
                                                        placeholder="₹"
                                                    //  onChange={(e)=>handleChangeValues('amount',e,setFieldValue,values)}

                                                    />
                                                    {/* <ErrorMessage
                                                        className="error"
                                                        name="amount"
                                                        component="span"
                                                    /> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">

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
                                                        commission

                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="commission"
                                                        className={`form-control ${touched.commission && error.commission
                                                            ? "input-error"
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
                                            <div className="col-md-6">
                                                <div className="form-group mb-4">
                                                    <label>
                                                        GST
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="gst"
                                                        className={`form-control ${touched.gst && error.gst
                                                            ? "input-error"
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
                                                <div className="form-group mb-4">
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
                                                            isActive.buy ?
                                                                values.commission / 100 == 0 ? "₹" + (values.amount - values.debit) :
                                                                    "₹" + ((values.amount) - [(values.amount - values.debit) * (values.commission / 100)]).toLocaleString("en-IN") : values.commission / 100 == 0 ? "₹" + (values.amount - values.debit) :
                                                                    "₹" + (parseInt(values.amount) + parseInt([(values.amount - values.debit) * (values.commission / 100)])).toLocaleString("en-IN")

                                                        } 
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
                                                        Weight

                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="weight"
                                                        className={`form-control ${touched.weight && error.weight
                                                            ? "input-error"
                                                            : ""
                                                            }`}
                                                    />
                                                    {/* <ErrorMessage
                                                        className="error"
                                                        name="weight"
                                                        component="span"
                                                    /> */}
                                                </div>
                                            </div>

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
                                                        className="form-control"
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
                                                    {props.btnPending ? <ButtonLoader /> : "Add"}
                                                </button>
                                            </div>
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

export default AddBuySell;
