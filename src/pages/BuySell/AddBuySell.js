import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select, { components } from 'react-select';
import { useEffect } from 'react';
import { getParty } from '../../actions/balancesheet';
import { useRef } from 'react';
import ButtonLoader from '../Customloader/ButtonLoader';
import { addBuy, addSell, getStockQuantityList } from '../../actions/buysell';
import { formatDate, handleLangChange, onvalChange, titleCase } from '../../actions/common';



const AddBuySell = (props) => {
    const elementRef = useRef(null);
    const itemSelectRef = useRef("");
    const godownSelectRef = useRef("");
    const firmSelectRef = useRef("");
    const partySelectRef = useRef("");
    const stockSelectRef = useRef("");
    const user_id = props.auth.userdata.id;
    const dispatch = useDispatch();
    const [error, setError] = useState({});
    const [isActive, setIsActive] = useState({ ...props.isActive });
    const [partyListOpt, setPartyListOptions] = useState([]);
    const [stockList, setStockList] = useState([]);
    const [selectedStocks, setSelectedStockList] = useState([]);
    const [newListItems, setNewListItems] = useState([]);
    const [partyValue, setPartyValue] = useState({});
    const [itemValue, setItemValue] = useState({});
    const [firmValue, setFirmValue] = useState({});
    const [godown, setGoDownList] = useState([]);
    const [firm, setFirmList] = useState([]);
    const [isHindi, setHindi] = useState(false);
    const [descPlaceHolder, setDescPlaceHolder] = useState("Please enter description");
    const [godownValue, setGodownValue] = useState({});


    useEffect(() => {
        console.log(selectedStocks);
    }, [selectedStocks])


    const InputOption = ({
        getStyles,
        Icon,
        isDisabled,
        isFocused,
        isSelected,
        children,
        innerProps,
        ...rest
    }) => {
        const [isActive, setIsActive] = useState(false);
        const onMouseDown = () => setIsActive(true);
        const onMouseUp = () => setIsActive(false);
        const onMouseLeave = () => setIsActive(false);

        const customStyles = {
            valueContainer: (provided, state) => ({
                ...provided,
                textOverflow: "ellipsis",
                maxWidth: "20%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                display: "initial"
            })
        };
    
        // multiValueContainer function
        const multiValueContainer = ({ selectProps, data }) => {
       const label = data.label;
    const allSelected = selectProps.value;
    const index = allSelected.findIndex(selected => selected.label === label);
    const isLastSelected = index === allSelected.length - 1;
    const labelSuffix = isLastSelected ? ` (${allSelected.length})` : ", ";
    const val = `${label}${labelSuffix}`;
    return val;
        };
        // styles
        let bg = "transparent";
        let checkboxColor = "inherit";
        let cursor="default";
        if (isFocused) bg = "#eee";
        if (isActive) bg = "#B2D4FF";
        if (isDisabled) checkboxColor = "grey";
        if (isDisabled) cursor = "not-allowed"
        const style = {
            alignItems: "center",
            backgroundColor: bg,
            color: checkboxColor,
            display: "flex",
            cursor:cursor,
        };

        // prop assignment
        const props = {
            ...innerProps,
            onMouseDown,
            onMouseUp,
            onMouseLeave,
            style
        };

        return (
            <components.Option
                {...rest}
                isDisabled={isDisabled}
                isFocused={isFocused}
                isSelected={isSelected}
                getStyles={getStyles}
                innerProps={props}
                styles={customStyles} // Apply custom styles
                components={{
                    MultiValueContainer: multiValueContainer // Apply custom MultiValueContainer function
                }}
            >
                <input type="checkbox" checked={isSelected} />
                {children}
            </components.Option>
        );
    };

    const handleSelectChangeItem = (e, setFieldValue, stock_id) => {
        if (e) {
            setFieldValue('item', e.value);
            setItemValue(e);
            setStocksList(stock_id, e.value);
        } else {
            setStocksList(stock_id, "0");


        }
        setFieldValue("selected_sold", "");
        setFieldValue("totalstock", 0);
        setSelectedStockList([]);

    }
    const handleSelectChangeFirm = (e, setFieldValue) => {
        if (e) {
            setFieldValue('firm', e.value);
            setFirmValue(e);
        }

    }
    useEffect(() => {
        dispatch(getParty(user_id));
    }, [])
    useEffect(() => {
        setIsActive({ ...props.isActive });

        if (props.firmValue.value) {

            setFirmValue(props.firmValue);
        } else {
            setFirmValue({});

        }


    }, [props.isActive, props.firmValue])
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

    }, [props.godownListAll, props.firmListAll])

    const handleSelectChange = (e, setFieldValue) => {
        if (e) {
            setFieldValue('party', e.value);
            setPartyValue(e);
        }
    }

    const handleSelectChangeGoDown = (e, setFieldValue, item_id) => {
        if (e) {
            setFieldValue('godown', e.value);
            setGodownValue(e);
            setStocksList(e.value, item_id);

        } else {
            setStocksList("0", item_id);
        }
        setFieldValue("selected_sold", "");
        setFieldValue("totalstock", 0);
        setSelectedStockList([]);

    }

    const handleSelectChangeStock = (e, setFieldValue, itemWeight, tstock) => {
        let newStockList = [];
        if (e) {
            let totalStock = e.reduce((acc, obj) => acc + obj['stock'], 0);
            if ((totalStock >= itemWeight && itemWeight != '')) {
                stockList.map((stocks) => {
                    if (e.some((item) => item.value == stocks.value)) {
                        newStockList.push({ label: stocks.label, value: stocks.value, stock: stocks.stock });
                    } else {
                        newStockList.push({ label: stocks.label, value: stocks.value, stock: stocks.stock, isDisabled: true });
                    }


                });
                setStockList(newStockList);
            } else {
                props.stockList.map((stocks) => {
                    newStockList.push({ label: '₹' + stocks.rate + ' - ' + stocks.instock.toFixed(2) + 'qt', value: stocks.newid, stock: stocks.instock });
                });
                setStockList(newStockList);
            }
            const values = e.map(item => item.value);

            setFieldValue("selected_sold", values.join(","));
            setFieldValue("totalstock", totalStock);
            setSelectedStockList(e);

        } else {
            setFieldValue("selected_sold", "");
            setFieldValue("totalstock", 0);
            setSelectedStockList([]);
        }
        // console.log(totalStock);
    }

    const setStocksList = (stock_id, item_id) => {
        if (stock_id != '' && item_id != '') {
            dispatch(getStockQuantityList({ user_id: user_id, stock_id: stock_id, item_id: item_id, edit_id:0 }));
        }
    }



    useEffect(() => {
        let newItemsList = [];
        props.itemListAll.forEach(element => {
            newItemsList.push({ label: titleCase(element.item), value: element.id })
        });
        setNewListItems(newItemsList);
    }, [props.itemListAll])


    useEffect(() => {
        let newStockList = [];
        if (props.stockList.length) {
            props.stockList.map((stocks) => {
                newStockList.push({ label: '₹' + stocks.rate + ' - ' + stocks.instock.toFixed(2) + 'qt', value: stocks.newid, stock: stocks.instock });
            });
            setStockList(newStockList);


        } else {
            setStockList([]);
        }


    }, [props.stockList])

    const handleRadioChange = (e) => {

        let newActive = { ...isActive };
        if (e == 'buy') {
            newActive.buy = true;
            newActive.sell = false;
        } else if (e == 'sell') {
            newActive.sell = true;
            newActive.buy = false;
        } else {
            newActive.urd = !newActive.urd;
        }

        setIsActive({ ...newActive });
    }

    const handleSelectChangeWeight = (e, setFieldValue) => {
        console.log(e.target.value);
        let newStockList = [];
        let newStockList_1 = [];
        if (e) {
            setFieldValue('weight', e.target.value);

            let total = 0;
            let stock = 0;
            stockList.map((stocks) => {
                if (stock < parseFloat(e.target.value) && total < parseFloat(e.target.value)) {
                    newStockList.push({ label: stocks.label, value: stocks.value, stock: stocks.stock });
                    newStockList_1.push({ label: stocks.label, value: stocks.value, stock: stocks.stock });
                    total += stocks.stock;
                    stock = stocks.stock;
                } else {
                    
                    newStockList_1.push({ label: stocks.label, value: stocks.value, stock: stocks.stock, isDisabled: true });
                }

            });
            const values = newStockList.map(item => item.value);
            setFieldValue("selected_sold", values.join(","));
            setFieldValue("totalstock", total);
            setStockList(newStockList_1);
            setSelectedStockList(newStockList);
        }
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
                            godown: "",
                            rate: "",
                            firm: "",
                            amount: "",
                            totalstock: "",
                            debit: "",
                            gst: "",
                            selected_sold: "",
                            item: "",
                            weight: "",
                            commission: "",
                            description: "",
                            totalamount: 0,
                            date: formatDate(new Date(), 'yyyy-mm-dd')
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
                            if (!values.weight) {
                                errors.weight = "Please select weight!"
                            }
                            if (!values.rate) {
                                errors.rate = "Please select rate!"
                            }
                            if (!values.godown) {
                                errors.godown = "Please select godown!"
                            }
                            if (!values.selected_sold && isActive.sell) {
                                errors.selected_sold = "Please select stock!"
                            } else if (values.totalstock < values.weight && isActive.sell) {
                                errors.selected_sold = `Please select stock equal or greater than ${values.weight}qt !`
                            }


                            console.log(values.totalstock);

                            setError({ ...errors });

                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting, resetForm, setFieldValue }) => {
                            props.setBtnPending(true);
                            values.user_id = user_id;
                            values.URD = isActive.urd;

                            itemSelectRef.current.clearValue();
                            partySelectRef.current.clearValue();
                            godownSelectRef.current.clearValue();
                            firmSelectRef.current.clearValue();

                            if (isActive.buy) {
                                dispatch(addBuy(values, elementRef, props.setBtnPending, resetForm, props.isActive));
                            } else if (isActive.sell) {
                                // stockSelectRef.current.clearValue();
                                setSelectedStockList([]);
                                dispatch(addSell(values, elementRef, props.setBtnPending, resetForm, props.isActive, stockSelectRef));
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
                                                        value={firmValue}
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
                                                        onChange={(e) => handleSelectChangeGoDown(e, setFieldValue, values.item)}
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
                                                        onChange={(e) => handleSelectChangeItem(e, setFieldValue, values.godown)}
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
                                                        <span className="error-badge">*</span>
                                                    </label>

                                                    <Field
                                                        placeholder="Enter item weight"
                                                        type="number"
                                                        name="weight"
                                                        onChange={(e) => handleSelectChangeWeight(e, setFieldValue)}
                                                        className={`form-control ${touched.weight && error.weight
                                                            ? "input-error"
                                                            : ""
                                                            } ${values.weight
                                                                ? "filled"
                                                                : ""
                                                            }`}
                                                    />
                                                    <ErrorMessage
                                                        className="error"
                                                        name="weight"
                                                        component="span"
                                                    />
                                                </div>
                                            </div>
                                            {isActive.sell ? <div className='col-md-12'>
                                                <div className="form-group react-select mb-4">
                                                    <div className='d-flex select-quantity'>
                                                    <label>
                                                        Stock <span className="error-badge">*</span>
                                                    </label>
                                                    <p>
                                                        {(values.weight != 0 || values.weight != '') ? (values.weight - values.totalstock).toFixed(2) > 0 ? <span className="error">Please select {(values.weight - values.totalstock).toFixed(2)}qt more!</span>:<span className="success">Stock selected successfully!</span>:''}
                                                    </p>
                                                        </div>
                                                    <Select
                                                        className={`${touched.selected_sold && error.selected_sold
                                                            ? "input-error"
                                                            : ""
                                                            } ${values.selected_sold
                                                                ? "filled"
                                                                : ""
                                                            }`}
                                                        options={stockList}  
                                                        isSearchable={true}
                                                        isDisabled={isActive.buy}
                                                        hideSelectedOptions={false}
                                                        closeMenuOnSelect={false}
                                                        value={selectedStocks}
                                                        isMulti
                                                        isClearable={true}
                                                        name="selected_sold"
                                                        ref={stockSelectRef}
                                                        onChange={(e) => handleSelectChangeStock(e, setFieldValue, values.weight, values.totalstock)}
                                                        theme={(theme) => ({
                                                            ...theme,
                                                            borderRadius: 8,
                                                            colors: {
                                                                ...theme.colors,
                                                                primary25: 'rgb(0 120 219 / 10%);',
                                                                primary: '#0078db',
                                                            },
                                                        })}
                                                        components={{
                                                            Option: InputOption
                                                        }}
                                                    />
                                                    <Field
                                                        type="text"
                                                        name="totalstock"
                                                        className={`d-none`}
                                                        placeholder="₹"
                                                    />

                                                    <ErrorMessage
                                                        className="error"
                                                        name="selected_sold"
                                                        component="span"
                                                    />
                                                </div>
                                            </div> : ""}

                                            <div className="col-md-6">
                                                <div className="form-group mb-4">
                                                    <label>
                                                        ₹ Rate
                                                    </label>
                                                    <span className="error-badge"> *</span>
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


                                                    />


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

                                                    />

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
                                            <div className="col-md-4">
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

                                            <div className="col-md-4">
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

                                                            values.commission / 100 == 0 ? "₹" + (values.rate * values.weight - values.debit) :
                                                                "₹" + ((values.rate * values.weight - values.debit) + parseInt([(values.rate * values.weight - values.debit) * (values.commission / 100)])).toLocaleString("en-IN")

                                                        }
                                                    />
                                                    {/* <ErrorMessage
                                                        className="error"
                                                        name="commision"
                                                        component="span"
                                                    /> */}
                                                </div>
                                            </div>
                                            <div className="col-md-4">
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
                                                    <label className='d-flex align-items-center justify-content-between'>
                                                        Description
                                                        <div className="form-check">
                                                            <input type="checkbox" className="form-check-input" onChange={(e) => handleLangChange(e, setHindi, setDescPlaceHolder)} id="lang" /><label htmlFor="lang" className="form-check-label"><span>In hindi</span></label></div>
                                                    </label>


                                                    <Field
                                                        as="textarea"
                                                        name="description"
                                                        className={`form-control ${values.description
                                                            ? "filled"
                                                            : ""
                                                            }`}
                                                        placeholder={descPlaceHolder}
                                                        onChange={(e) => onvalChange(e, 'description', setFieldValue, false, isHindi)}
                                                        onBlur={(e) => onvalChange(e, 'description', setFieldValue, true, isHindi)}
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
                                        className="btn btn-primary m-auto d-flex justify-content-center align-items-center"
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
