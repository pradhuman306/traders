import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select, { components } from "react-select";
import { useEffect } from "react";
import { getParty } from "../../actions/balancesheet";
import { useRef } from "react";
import ButtonLoader from "../Customloader/ButtonLoader";
import { getStockQuantityList, updateBuy, updateSell } from "../../actions/buysell";
import { handleLangChange, onvalChange, titleCase } from "../../actions/common";

const EditBuySell = (props) => {
  const elementRef = useRef(null);
  const stockSelectRef = useRef("");

  const partyList = useSelector((state) => state.balanceSheetReducer).partyList;
  const user_id = props.auth.userdata.id;
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [isActive, setIsActive] = useState({ ...props.isActive });
  const [partyListOpt, setPartyListOptions] = useState([]);
  const [newListItems, setNewListItems] = useState([]);
  const [stockList, setStockList] = useState([]);
  const [selectedStocks, setSelectedStockList] = useState([]);
  const [selectedWeights, setSelectedWeights] = useState("");
  const [valueParty, setValueParty] = useState({});
  const [valueItem, setValueItem] = useState({});
  const [firmValue, setValueFirm] = useState({});
  const [rowData, setRowData] = useState(props.row_data);
  const [checkedURD, setCheckedURD] = useState({});
  const [godown, setGoDownList] = useState([]);
  const [firm, setFirmList] = useState([]);
  const [godownValue, setGodownValue] = useState({});
  const [isHindi, setHindi] = useState(false);
  const [descPlaceHolder, setDescPlaceHolder] = useState("Please enter description");
  const [totalStock, setTotalStocks] = useState(0);

  

  const handleSelectChangeItem = (e, setFieldValue, stock_id) => {
    if (e) {
      setFieldValue('item', e.value);
      setValueItem(e);
      setStocksList(stock_id, e.value);
    } else {
      setStocksList(stock_id, "0");


    }
    setFieldValue("selected_sold", "");
    setFieldValue("selected_weight", "");
    setFieldValue("totalstock", 0);
    setSelectedStockList([]);
  };
  const handleSelectChangeFirm = (e, setFieldValue) => {
    setFieldValue("firm", e.value);
    setValueFirm(e);
  };

  const handleSelectChangeStock = (e, setFieldValue, itemWeight) => {
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
      const stockweight = e.map(item => item.stock);
      setFieldValue("selected_sold", values.join(","));
      setFieldValue("selected_weight", stockweight.join(","));
      setFieldValue("totalstock", totalStock);
      setSelectedStockList(e);

    }
  }

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
      >
        <input type="checkbox" checked={isSelected} />
        {children}
      </components.Option>
    );
  };



  useEffect(() => {
    let sel_sold = props.row_data.selected_sold?.split(",");
    let newStockList = [];
    let selStockList = [];
    let selWeightList = [];
    if (props.stockList.length) {
      let selStockTotal = 0;
      props.stockList.map((stocks) => {
    
        if (sel_sold && sel_sold.includes(stocks.newid)) {
          selStockTotal+=parseFloat(stocks.instock.toFixed(2));
          selStockList.push({ label: '₹' + stocks.rate + ' - ' + stocks.instock.toFixed(2) + 'qt', value: stocks.newid, stock: stocks.instock });
          selWeightList.push(stocks.instock);
        }
        if(selStockTotal >= parseFloat(props.row_data.weight) && !sel_sold.includes(stocks.newid)){
          newStockList.push({ label: '₹' + stocks.rate + ' - ' + stocks.instock.toFixed(2) + 'qt', value: stocks.newid, stock: stocks.instock, isDisabled:true });
        }else{
          newStockList.push({ label: '₹' + stocks.rate + ' - ' + stocks.instock.toFixed(2) + 'qt', value: stocks.newid, stock: stocks.instock });
        }
        
      });
      setStockList(newStockList);
      
      setSelectedStockList(selStockList);
      setSelectedWeights(selWeightList.join(","));
      if(selStockList.length){
        let totalStock = selStockList.reduce((acc, obj) => acc + obj['stock'], 0);
        setTotalStocks(totalStock);
      }
    
    } else {
      setStockList([]);
    }


  }, [props.stockList,props.row_data.selected_sold])

  useEffect(() => {
    dispatch(getParty(user_id));
  }, []);
  useEffect(() => {
    setRowData({ ...props.row_data });
    setValueParty({
      label: titleCase(props.row_data.party),
      value: props.row_data.party_id,
    });
    setValueItem({
      label: titleCase(props.row_data.item),
      value: props.row_data.item_id,
    });
    setGodownValue({
      label: titleCase(props.row_data.godown),
      value: props.row_data.godown_id,
    });
    setValueFirm({
      label: titleCase(props.row_data.firm),
      value: props.row_data.firm_id,
    });

    setCheckedURD(props.row_data.URD == 1 ? true : false);

    let newIsActive = { ...props.isActive };

    if (props.row_data.type == "Buy") {
      newIsActive.buy = true;
      newIsActive.sell = false;
      newIsActive.all = false;
    } else if (props.row_data.type == "Sale") {
      newIsActive.buy = false;
      newIsActive.sell = true;
      newIsActive.all = false;
    }

    setIsActive({ ...newIsActive });

    dispatch(getStockQuantityList({ user_id: user_id, stock_id: props.row_data.godown_id, item_id: props.row_data.item_id, edit_id:props.row_data.id }));

    console.log(props.row_data);

  }, [props.row_data, props.isActive]);
  useEffect(() => {
    let newPartyList = [];
    partyList.forEach((item) => {
      newPartyList.push({ label: titleCase(item.name), value: item.id });
    });
    setPartyListOptions([...newPartyList]);
  }, [partyList]);

  const handleSelectChange = (e, setFieldValue) => {
    setFieldValue("party", e.value);
    setValueParty(e);
  };

  useEffect(() => {
    let newItemsList = [];
    props.itemListAll.forEach((element) => {
      newItemsList.push({ label: titleCase(element.item), value: element.id });
    });
    setNewListItems(newItemsList);
    let newFirmList = [];
    props.firmListAll.forEach((element) => {
      newFirmList.push({ label: titleCase(element.name), value: element.id });
    });
    setFirmList(newFirmList);
  }, [props.itemListAll, props.firmListAll]);

  const handleRadioChange = (e) => {
    let newActive = { ...isActive };
    if (e == "buy") {
      newActive.buy = true;
      newActive.sell = false;
    } else {
      newActive.sell = true;
      newActive.buy = false;
    }

    setIsActive({ ...newActive });
  };

  const handleChangeCheck = (e, setFieldValue) => {
    setFieldValue("URD", e.target.checked);
    setCheckedURD(e.target.checked);
  };

  useEffect(() => {
    let godownList = [];
    props.godownListAll.forEach((item) => {
      godownList.push({ label: titleCase(item.name), value: item.id });
    });
    setGoDownList([...godownList]);
  }, [props.godownListAll]);

  const handleSelectChangeGoDown = (e, setFieldValue, item_id) => {
    if (e) {
      setFieldValue('godown', e.value);
      setGodownValue(e);
      setStocksList(e.value, item_id);

    } else {
      setStocksList("0", item_id);
    }
    setFieldValue("selected_sold", "");
    setFieldValue("selected_weight", "");
    setFieldValue("totalstock", 0);
    setSelectedStockList([]);
  };
  const setStocksList = (stock_id, item_id) => {
    if (stock_id != '' && item_id != '') {
      dispatch(getStockQuantityList({ user_id: user_id, stock_id: stock_id, item_id: item_id }));
    }
  }
  const handleSelectChangeWeight = (e, setFieldValue) => {
    console.log(e.target.value);
    let newStockList = [];
    let newStockList_1 = [];
    if (e) {
      setFieldValue('weight', e.target.value);
      setFieldValue('selected_sold', "");
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
      const stockweight = newStockList.map(item => item.stock);
      setFieldValue("selected_sold", values.join(","));
      setFieldValue("selected_weight", stockweight.join(","));
      setFieldValue("totalstock", total);
      setStockList(newStockList_1);
      setSelectedStockList(newStockList);
      // stockSelectRef.current.clearValue();
    }
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
          {Object.keys(rowData).length != 0 ? (
            <Formik
              enableReinitialize
              initialValues={{
                party: rowData.party_id,
                bill_no: rowData.bill_no,
                godown: rowData.godown_id,
                amount: rowData.amount,
                firm: rowData.firm_id,
                totalstock: totalStock,
                debit: rowData.debit,
                gst: rowData.gst,
                item: rowData.item_id,
                selected_sold: rowData.selected_sold,
                selected_weight: selectedWeights,
                weight: rowData.weight,
                commission: rowData.commission,
                URD: rowData.URD,
                rate: rowData.rate,
                description: rowData.description,
                date: rowData.date ? rowData.date.split(" ")[0] : "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.party) {
                  errors.party = "Please select party !";
                }
                if (!values.item) {
                  errors.item = "Please select item !";
                }
                if (!values.date) {
                  errors.date = "Please select Date !";
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
                // if (!values.selected_sold && isActive.sell) {
                //   errors.selected_sold = "Please select stock!"
                // } else if (values.totalstock < values.weight && isActive.sell) {
                //   errors.selected_sold = `Please select stock equal or greater than ${values.weight}qt !`
                // }
              
                if (!values.selected_sold && isActive.sell) {
                  errors.selected_sold = "Please select stock!";
                } else if ((values.weight - values.totalstock).toFixed(2) > 0 && isActive.sell) {
                  errors.selected_sold = `Please select stock equal or greater than ${values.weight}qt !`;
                } 
                

                setError({ ...errors });

                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                props.setBtnPending(true);
                values.user_id = user_id;
                values.id = props.row_id;
                values.amount = values.rate * values.weight;
                console.log(values);
                if (isActive.buy) {
                  dispatch(
                    updateBuy(
                      values,
                      elementRef,
                      props.setBtnPending,
                      props.isActive
                    )
                  );
                } else if (isActive.sell) {
                  dispatch(
                    updateSell(
                      values,
                      elementRef,
                      props.setBtnPending,
                      props.isActive
                    )
                  );
                }

                setSubmitting(false);
              }}
            >
              {({
                values,
                isSubmitting,
                dirty,
                handleReset,
                touched,
                setFieldValue,
              }) => (
                <Form action="" id="newcustomer">
                  <div className="modal-head">
                    <h4>Edit Entry</h4>
                  
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
                        <div className="col-md-12">
                          <div className="group-field">
                            <div className="gf-in">
                              <div className="form-check">
                                <Field
                                  className="form-check-input"
                                  type="radio"
                                  id="buy1"
                                  name="picked1"
                                  value="buy"
                                  onClick={(e) => handleRadioChange("buy")}
                                  checked={isActive.buy}
                                />
                                <label htmlFor="buy1">Buy</label>
                              </div>
                              <div className="form-check">
                                <Field
                                  className="form-check-input"
                                  type="radio"
                                  id="sell1"
                                  name="picked1"
                                  value="sell"
                                  onClick={(e) => handleRadioChange("sell")}
                                  checked={isActive.sell}
                                />
                                <label htmlFor="sell1">Sell</label>
                              </div>
                            </div>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                name="URD1"
                                className="form-check-input"
                                id="URD1"
                                onChange={(e) =>
                                  handleChangeCheck(e, setFieldValue)
                                }
                                checked={checkedURD}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="URD1"
                              >
                                Unregisterd Dealer
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
                                } ${values.party ? "filled" : ""}`}
                              options={partyListOpt}
                              value={valueParty}
                              name="party"
                              onChange={(e) =>
                                handleSelectChange(e, setFieldValue)
                              }
                              theme={(theme) => ({
                                ...theme,
                                borderRadius: 8,
                                colors: {
                                  ...theme.colors,
                                  primary25: "rgb(0 120 219 / 10%);",
                                  primary: "#0078db",
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
                            <label>Bill no</label>
                            <Field
                              placeholder="Enter bill number"
                              type="text"
                              name="bill_no"
                              className={`form-control ${touched.bill_no && error.bill_no
                                  ? "input-error"
                                  : ""
                                } ${values.bill_no ? "filled" : ""}`}
                            />
                            <ErrorMessage
                              className="error"
                              name="bill_no"
                              component="span"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-4">
                            <label>Firm</label>

                            <Select
                              className={`${touched.firm && error.firm ? "input-error" : ""
                                } ${values.firm ? "filled" : ""}`}
                              options={firm}
                              name="firm"
                              value={firmValue}
                              onChange={(e) =>
                                handleSelectChangeFirm(e, setFieldValue)
                              }
                              theme={(theme) => ({
                                ...theme,
                                borderRadius: 8,
                                colors: {
                                  ...theme.colors,
                                  primary25: "rgb(0 120 219 / 10%);",
                                  primary: "#0078db",
                                },
                              })}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-4">
                            <label>
                              Godown <span className="error-badge">*</span>
                            </label>

                            <Select
                              className={`${touched.godown && error.godown
                                  ? "input-error"
                                  : ""
                                } ${values.godown ? "filled" : ""}`}
                              options={godown}
                              name="godown"
                              value={godownValue}
                              onChange={(e) =>
                                handleSelectChangeGoDown(e, setFieldValue, values.item)
                              }
                              theme={(theme) => ({
                                ...theme,
                                borderRadius: 8,
                                colors: {
                                  ...theme.colors,
                                  primary25: "rgb(0 120 219 / 10%);",
                                  primary: "#0078db",
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
                              Item <span className="error-badge">*</span>
                            </label>

                            <Select
                              className={`${touched.item && error.item ? "input-error" : ""
                                } ${values.item ? "filled" : ""}`}
                              options={newListItems}
                              name="item"
                              value={valueItem}
                              onChange={(e) =>
                                handleSelectChangeItem(e, setFieldValue, values.godown)
                              }
                              theme={(theme) => ({
                                ...theme,
                                borderRadius: 8,
                                colors: {
                                  ...theme.colors,
                                  primary25: "rgb(0 120 219 / 10%);",
                                  primary: "#0078db",
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
                              Weight{" "}
                              <span className="badge rounded-pill text-bg-primary">
                                in Quintal
                              </span>
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
                                } ${values.weight ? "filled" : ""}`}
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
                                                    {
  (values.weight !== 0 && values.weight !== '' && (values.weight - values.totalstock).toFixed(2) < 0) ? (
    <span className="success">Stock selected successfully!</span>
  ) : (
    (values.weight - values.totalstock).toFixed(2) > 0 ? (
      <span className="error">Please select {(values.weight - values.totalstock).toFixed(2)} qt more!</span>
    ) : (values.weight - values.totalstock).toFixed(2) == 0 ? <span className="success">Stock selected successfully!</span>:""
  )
}

                                                        {/* {((values.weight != 0 || values.weight != '')) ? (values.weight - values.totalstock).toFixed(2) > 0 ? <span className="error">Please select {(values.weight - values.totalstock).toFixed(2)}qt more!</span>:<span className="success">Stock selected successfully!</span>:''} */}
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
                                components={{
                                  Option: InputOption
                                }}
                                isClearable={true}
                                name="selected_sold"
                                ref={stockSelectRef}
                                onChange={(e) => handleSelectChangeStock(e, setFieldValue, values.weight)}
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
                            <Field
                              type="text"
                              name="totalstock"
                              className={`d-none`}
                              placeholder="₹"
                            />
                        <Field
                              type="text"
                              name="selected_weight"
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
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group mb-4">
                            <label>₹ Rate <span className="error-badge">*</span></label>
                            <Field
                              type="text"
                              name="rate"
                              className={`form-control ${touched.rate && error.rate ? "input-error" : ""
                                } ${values.rate ? "filled" : ""}`}
                              placeholder="₹"
                            />
                          </div>
                          <Field
                            type="text"
                            name="totalstock"
                            className={`d-none`}
                            placeholder="₹"
                          />
                            <ErrorMessage
                              className="error"
                              name="rate"
                              component="span"
                            />
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-4">
                            <label>₹ Amount</label>
                            <Field
                              type="text"
                              name="amount"
                              className={`form-control ${touched.amount && error.amount
                                  ? "input-error"
                                  : ""
                                }`}
                              value={values.rate * values.weight}
                              disabled
                              placeholder="₹"
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
                            <label>Debit Note</label>
                            <Field
                              type="text"
                              name="debit"
                              className={`form-control ${touched.debit && error.debit
                                  ? "input-error"
                                  : ""
                                } ${values.debit ? "filled" : ""}`}
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
                            <label>commission %</label>
                            <Field
                              type="text"
                              name="commission"
                              className={`form-control ${touched.commission && error.commission
                                  ? "input-error"
                                  : ""
                                } ${values.commission ? "filled" : ""}`}
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
                        <div className="col-md-4">
                          <div className="form-group mb-4">
                            <label>GST %</label>
                            <Field
                              type="text"
                              name="gst"
                              className={`form-control ${touched.gst && error.gst ? "input-error" : ""
                                } ${values.gst ? "filled" : ""}`}
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
                          <div className="form-group mb-4">
                            <label>Total Amount</label>
                            <Field
                              type="text"
                              name="totalamount"
                              className={`form-control`}
                              disabled={true}
                              value={
                                values.commission / 100 == 0
                                  ? "₹" +
                                  (values.rate * values.weight - values.debit)
                                  : "₹" +
                                  (
                                    values.rate * values.weight -
                                    values.debit +
                                    parseInt([
                                      (values.rate * values.weight -
                                        values.debit) *
                                      (values.commission / 100),
                                    ])
                                  ).toLocaleString("en-IN")
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
                                className={`form-control ${touched.date && error.date
                                    ? "input-error"
                                    : ""
                                  } ${values.date ? "filled" : ""}`}
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
                          <div className="form-group">
                            <label className='d-flex align-items-center justify-content-between mt-3'>
                              Description
                              <div className="form-check">
                                <input type="checkbox" className="form-check-input" onChange={(e) => handleLangChange(e, setHindi, setDescPlaceHolder)} id="langEdit" /><label htmlFor="langEdit" className="form-check-label"><span>In hindi</span></label></div>
                            </label>

                            <Field
                              as="textarea"
                              name="description"
                              className={`form-control ${values.description ? "filled" : ""
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
                  <div className="modal-footer">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary m-auto d-flex justify-content-center align-items-center"
                    >
                      {props.btnPending ? <ButtonLoader /> : "Update"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default EditBuySell;
