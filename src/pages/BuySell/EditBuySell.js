import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useEffect } from 'react';
import { getParty } from '../../actions/balancesheet';
import { useRef } from 'react';
import ButtonLoader from '../Customloader/ButtonLoader';
import { updateBuy, updateSell } from '../../actions/buysell';


const EditBuySell = (props) => {
    console.log(props.row_data);
    console.log(props.row_id);
    const elementRef = useRef(null);
    const partyList = useSelector((state) => state.balanceSheetReducer).partyList;
    const user_id = props.auth.userdata.id;
    const dispatch = useDispatch();
    const [error, setError] = useState({});
    const [isActive, setIsActive] = useState({ ...props.isActive });
    const [partyListOpt, setPartyListOptions] = useState([]);
    const [newListItems, setNewListItems] = useState([]);
    const [valueParty, setValueParty] = useState({});
    const [valueItem, setValueItem] = useState({});
    const [rowData, setRowData] = useState(props.row_data);
    const [checkedURD,setCheckedURD]=useState({});
    const handleSelectChangeItem = (e, setFieldValue) => {
        setFieldValue('item', e.value);
        setValueItem(e);
        console.log(e.value);
    }
    useEffect(() => {
        dispatch(getParty(user_id));
    }, [])
    useEffect(() => {
        setRowData({...props.row_data})
        setValueParty({label:props.row_data.party,value:props.row_data.party_id});
        setValueItem({label:props.row_data.item,value:props.row_data.item_id});
        setCheckedURD(props.row_data.URD == 1?true:false);
        console.log(props.row_data);
    }, [props.row_data])
    useEffect(() => {
        setIsActive({ ...props.isActive });
    }, [props.isActive])
    useEffect(() => {
        let newPartyList = [];
        partyList.forEach((item) => {
            newPartyList.push({ label: item.name, value: item.id });
        })
        setPartyListOptions([...newPartyList]);
    }, [partyList])

    const handleSelectChange = (e, setFieldValue) => {
        setFieldValue('party', e.value);
        setValueParty(e);
        console.log(e.value);
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
        console.log(isActive);
        setIsActive({ ...newActive });
    }

const handleChangeCheck = (e,setFieldValue) => {
    console.log(e.target.checked);
    setFieldValue('URD',e.target.checked)
    setCheckedURD(e.target.checked);
}
    return (
        <div
            className="modal right fade"
            id="editbuysell"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content right-modal">
                    <div className="modal-head">
                        <h4>Edit Buy Sell</h4>

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
                    {Object.keys(rowData).length != 0 ? <Formik
                            enableReinitialize
                            initialValues={{
                                party: rowData.party_id,
                                bill_no: rowData.bill_no,
                                amount: rowData.amount,
                                debit: rowData.debit,
                                gst: rowData.gst,
                                item: rowData.item_id,
                                weight: rowData.weight,
                                commission: rowData.commission,
                                URD: rowData.URD,
                                description: rowData.description,
                                date: rowData.date?rowData.date.split(" ")[0]:""
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
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                props.setBtnPending(true);
                                values.user_id = user_id;
                                values.id = props.row_id;
                                console.log(values);
                                if (isActive.buy) {
                       
                                    dispatch(updateBuy(values, elementRef, props.setBtnPending));
                                } else {
                               
                                    dispatch(updateSell(values, elementRef, props.setBtnPending));
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
                                                        <Field type="radio" id="buy1" name="picked1" value="buy" onClick={(e) => handleRadioChange("buy")} checked={isActive.buy} />
                                                        <label htmlFor='buy1'>
                                                            Buy
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <Field type="radio" id="sell1" name="picked1" value="sell" onClick={(e) => handleRadioChange("sell")} checked={isActive.sell} />
                                                        <label htmlFor='sell1'>
                                                            Sell
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group mb-4">
                                                    <input
                                                        type="checkbox"
                                                        name="URD1"
                                                        className={`form-control ${touched.URD && error.URD
                                                            ? "input-error"
                                                            : ""
                                                            }`}
                                                        id="URD1"
                                                        onClick={(e)=>handleChangeCheck(e,setFieldValue)}
                                                        checked={checkedURD}
                                                    />
                                                    <label htmlFor='URD1'>
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
                                                        value={valueParty}
                                                        name="party"
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
                                                        name="item"
                                                        value={valueItem}    
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
                                                        value={
                                                            isActive.buy?
                                                            values.commission/100 == 0 ? "₹"+(values.amount - values.debit) :
                                                            "₹"+((values.amount)-[(values.amount - values.debit)*(values.commission/100)]).toLocaleString("en-IN") :values.commission/100 == 0? "₹"+(values.amount - values.debit):
                                                            "₹"+(parseInt(values.amount)+parseInt([(values.amount - values.debit)*(values.commission/100)])).toLocaleString("en-IN")
                                                            
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
                                                        type="text"
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
                                                {props.btnPending ? <ButtonLoader /> : "Update"}
                                            </button>
                                        </div>
                                            </div>
                                            </div>

                                </Form>
                            )}
                        </Formik>: ""}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditBuySell;
