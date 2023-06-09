import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { useEffect } from "react";
import { getParty } from "../../actions/balancesheet";
import { useRef } from "react";
import ButtonLoader from "../Customloader/ButtonLoader";
import { updateBuy, updateSell } from "../../actions/buysell";
import { handleLangChange, onvalChange, titleCase } from "../../actions/common";

const EditBuySell = (props) => {
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
  const [firmValue, setValueFirm] = useState({});
  const [rowData, setRowData] = useState(props.row_data);
  const [checkedURD, setCheckedURD] = useState({});
  const [godown, setGoDownList] = useState([]);
  const [firm, setFirmList] = useState([]);
  const [godownValue, setGodownValue] = useState({});
  const [isHindi,setHindi]=useState(false);
  const [descPlaceHolder, setDescPlaceHolder] = useState("Please enter description");

  const handleSelectChangeItem = (e, setFieldValue) => {
    setFieldValue("item", e.value);
    setValueItem(e);
  };
  const handleSelectChangeFirm = (e, setFieldValue) => {
    setFieldValue("firm", e.value);
    setValueFirm(e);
  };

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

  const handleSelectChangeGoDown = (e, setFieldValue) => {
    if (e) {
      setFieldValue("godown", e.value);
      setGodownValue(e);
    }
  };
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
                debit: rowData.debit,
                gst: rowData.gst,
                item: rowData.item_id,
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

                setError({ ...errors });

                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                props.setBtnPending(true);
                values.user_id = user_id;
                values.id = props.row_id;
                values.amount = values.rate * values.weight;

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
                              className={`${
                                touched.party && error.party
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
                              className={`form-control ${
                                touched.bill_no && error.bill_no
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
                              className={`${
                                touched.firm && error.firm ? "input-error" : ""
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
                              className={`${
                                touched.godown && error.godown
                                  ? "input-error"
                                  : ""
                              } ${values.godown ? "filled" : ""}`}
                              options={godown}
                              name="godown"
                              value={godownValue}
                              onChange={(e) =>
                                handleSelectChangeGoDown(e, setFieldValue)
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
                              className={`${
                                touched.item && error.item ? "input-error" : ""
                              } ${values.item ? "filled" : ""}`}
                              options={newListItems}
                              name="item"
                              value={valueItem}
                              onChange={(e) =>
                                handleSelectChangeItem(e, setFieldValue)
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
                            </label>

                            <Field
                              placeholder="Enter item weight"
                              type="number"
                              name="weight"
                              className={`form-control ${
                                touched.weight && error.weight
                                  ? "input-error"
                                  : ""
                              } ${values.weight ? "filled" : ""}`}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group mb-4">
                            <label>₹ Rate</label>
                            <Field
                              type="text"
                              name="rate"
                              className={`form-control ${
                                touched.rate && error.rate ? "input-error" : ""
                              } ${values.rate ? "filled" : ""}`}
                              placeholder="₹"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-4">
                            <label>₹ Amount</label>
                            <Field
                              type="text"
                              name="amount"
                              className={`form-control ${
                                touched.amount && error.amount
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
                              className={`form-control ${
                                touched.debit && error.debit
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
                              className={`form-control ${
                                touched.commission && error.commission
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
                        <div className="col-md-6">
                          <div className="form-group mb-4">
                            <label>GST %</label>
                            <Field
                              type="text"
                              name="gst"
                              className={`form-control ${
                                touched.gst && error.gst ? "input-error" : ""
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
                        <div className="col-md-6">
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
                        <div className="col-md-12">
                          <div className="form-group mb-4">
                            <label>
                              Date <span className="error-badge">*</span>
                            </label>

                            <div className="input-group date" id="datepicker1">
                              <Field
                                type="date"
                                className={`form-control ${
                                  touched.date && error.date
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
                                                        <input type="checkbox" className="form-check-input" onChange={(e) => handleLangChange(e,setHindi,setDescPlaceHolder)} id="langEdit" /><label htmlFor="langEdit" className="form-check-label"><span>In hindi</span></label></div>
                                                    </label>

                            <Field
                              as="textarea"
                              name="description"
                              className={`form-control ${
                                values.description ? "filled" : ""
                              }`}
                              placeholder={descPlaceHolder}

                              onChange={(e)=>onvalChange(e,'description',setFieldValue,false,isHindi)}
                              onBlur={(e)=>onvalChange(e,'description',setFieldValue,true,isHindi)}
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
