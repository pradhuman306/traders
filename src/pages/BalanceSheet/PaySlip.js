import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addParty, payAmount } from "../../actions/balancesheet";
import {
  gstCalculate,
  priceFormatter,
  totalAmountCalculateRaw,
} from "../../actions/common";
import ButtonLoader from "../Customloader/ButtonLoader";

const PaySlip = (props) => {
  const elementRef = useRef(null);
  const user_id = props.auth.userdata.id;
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [btnPending, setBtnPending] = useState(false);
  const [totalAmount, setTotalAmount] = useState("");
  const [totalPaidAmount, setTotalPaidAmount] = useState("");
  const [totalPaidWithoutGST, setTotalPaidWithoutGST] = useState("");
  const [totalPaidWithGST, setTotalPaidGST] = useState("");
  const [isActive, setIsActive] = useState({ main: true, gst: false });
  useEffect(() => {
    let toalPaid = 0;
    let totalPaidWithoutGST = 0;
    let totalAmount =
      totalAmountCalculateRaw(props.rowData) +
      gstCalculate(totalAmountCalculateRaw(props.rowData), props.rowData.gst);
    totalAmountCalculateRaw(props.rowData);
    if (props.rowData.paid) {
      let paidData = JSON.parse(props.rowData.paid);
      paidData.map((element) => {
        if (element.type == "main") {
          totalPaidWithoutGST += parseInt(element.amount);
        }
        toalPaid += parseInt(element.amount);
      });
    }
    setTotalAmount(totalAmount);
    setTotalPaidWithoutGST(totalPaidWithoutGST);
    setTotalPaidGST(toalPaid - totalPaidWithoutGST);
    setTotalPaidAmount(toalPaid);
  
    let isActiveValue = { main: true, gst: false };
    setIsActive(isActiveValue);
  }, [props.rowData]);

  const handleSetAmount = (e, amount, setFieldValue) => {
    let isActiveValue = { ...isActive };
    isActiveValue.main = false;
    isActiveValue.gst = false;
    isActiveValue[e] = true;
    setFieldValue("amount", amount);
    setIsActive(isActiveValue);
  };
  return (
    <div
      className="modal fade"
      id="paySlip"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content ">
          <Formik
            enableReinitialize
            initialValues={{
              amount: parseInt(
                parseInt(totalAmount) -
                  gstCalculate(
                    totalAmountCalculateRaw(props.rowData),
                    props.rowData.gst
                  ) -
                  parseInt(totalPaidWithoutGST)
              ),
              type: "main",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.amount) {
                errors.amount = "Please enter amount!";
              }

              setError({ ...errors });
              return errors;
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              values.user_id = user_id;
              values.id = props.rowData.id;
              setBtnPending(true);
          
              dispatch(
                payAmount(
                  values,
                  elementRef,
                  setBtnPending,
                  resetForm,
                  props.rowData.type,
                  props.filterValue,
                  props.partyid
                )
              );
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
                  <h4>Pay amount</h4>
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
                  <div className="">
                    <div className="modal-body-row">
                      <h6>Main Amount</h6>
                      <p>
                        ₹
                        {parseInt(props.rowData.amount).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="modal-body-row">
                      <h6>Debit note:</h6>
                      <p>
                        ₹{parseInt(props.rowData.debit).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="modal-body-row">
                      <h6>Commision</h6>
                      <p>
                        ₹
                        {parseInt(
                          ((props.rowData.amount - props.rowData.debit) *
                            props.rowData.commission) /
                            100
                        ).toLocaleString("en-IN")}{" "}
                        <span className="badge rounded-pill text-bg-success">
                          {props.rowData.commission}%
                        </span>
                      </p>
                    </div>
                    <div className="modal-body-row">
                      <h6>Debit Amount</h6>
                      <p>
                        {priceFormatter(totalAmountCalculateRaw(props.rowData))}
                      </p>
                    </div>
                    <div className="modal-body-row">
                      <h6>GST Amount</h6>
                      <p>
                        {priceFormatter(
                          gstCalculate(
                            totalAmountCalculateRaw(props.rowData),
                            props.rowData.gst
                          )
                        )}{" "}
                        <span className="badge rounded-pill text-bg-success">
                          {props.rowData.gst}%
                        </span>
                      </p>
                    </div>
                    <div className="modal-body-row">
                      <h6>Total Amount</h6>
                      <p>₹{parseInt(totalAmount).toLocaleString("en-IN")}</p>
                    </div>
                    <div className="modal-body-row">
                      <h6>Pending Amount</h6>
                      <p>
                        ₹
                        {parseInt(
                          parseInt(totalAmount) -
                            gstCalculate(
                              totalAmountCalculateRaw(props.rowData),
                              props.rowData.gst
                            ) -
                            parseInt(totalPaidWithoutGST)
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="modal-body-row">
                      <h6>Pending GST</h6>
                      <p>
                        {priceFormatter(
                          gstCalculate(
                            totalAmountCalculateRaw(props.rowData),
                            props.rowData.gst
                          ) - parseInt(totalPaidWithGST)
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="form-fields-wrap">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mt-3 mb-3 gf-in">
                          <div className="form-check">
                            <Field
                              className="form-check-input"
                              type="radio"
                              id="main"
                              name="type"
                              onClick={(e) =>
                                handleSetAmount(
                                  "main",
                                  parseInt(totalAmount) -
                                    gstCalculate(
                                      totalAmountCalculateRaw(props.rowData),
                                      props.rowData.gst
                                    ) -
                                    parseInt(totalPaidWithoutGST),
                                  setFieldValue
                                )
                              }
                              checked={isActive.main}
                              value="main"
                            />
                            <label htmlFor="main" className="form-check-label">
                              Pay debit Amount
                            </label>
                          </div>

                          <div className="form-check">
                            <Field
                              className="form-check-input"
                              type="radio"
                              id="gst"
                              onClick={(e) =>
                                handleSetAmount(
                                  "gst",
                                  gstCalculate(
                                    totalAmountCalculateRaw(props.rowData),
                                    props.rowData.gst
                                  ) - parseInt(totalPaidWithGST),
                                  setFieldValue
                                )
                              }
                              checked={isActive.gst}
                              name="type"
                              value="gst"
                            />
                            <label htmlFor="gst" className="form-check-label">
                              Pay GST amount
                            </label>
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <label>
                            Enter Amount<span className="error-badge">*</span>
                          </label>
                          <Field
                            placeholder="₹"
                            type="number"
                            name="amount"
                            className={`form-control ${
                              touched.amount && error.amount
                                ? "input-error"
                                : ""
                            } ${values.amount ? "filled" : ""}`}
                          />
                          <ErrorMessage
                            className="error"
                            name="amount"
                            component="span"
                          />
                          <div className="mt-2">
                            {values.type == "main"
                              ? values.amount &&
                                values.amount <
                                  parseInt(
                                    totalAmount -
                                      gstCalculate(
                                        totalAmountCalculateRaw(props.rowData),
                                        props.rowData.gst
                                      ) -
                                      totalPaidWithoutGST
                                  )
                                ? "₹" +
                                  parseInt(
                                    totalAmount -
                                      totalPaidWithoutGST -
                                      gstCalculate(
                                        totalAmountCalculateRaw(props.rowData),
                                        props.rowData.gst
                                      ) -
                                      values.amount
                                  ).toLocaleString("en-IN") +
                                  " is still remaining!"
                                : values.amount &&
                                  values.amount ==
                                    parseInt(
                                      totalAmount -
                                        gstCalculate(
                                          totalAmountCalculateRaw(
                                            props.rowData
                                          ),
                                          props.rowData.gst
                                        ) -
                                        totalPaidWithoutGST
                                    )
                                ? "Fully Paid !"
                                : ""
                              : values.amount &&
                                values.amount <
                                  gstCalculate(
                                    totalAmountCalculateRaw(props.rowData),
                                    props.rowData.gst
                                  ) -
                                    parseInt(totalPaidWithGST)
                              ? "₹" +
                                parseInt(
                                  gstCalculate(
                                    totalAmountCalculateRaw(props.rowData),
                                    props.rowData.gst
                                  ) -
                                    parseInt(totalPaidWithGST) -
                                    values.amount
                                ).toLocaleString("en-IN") +
                                " is still remaining!"
                              : values.amount &&
                                values.amount ==
                                  gstCalculate(
                                    totalAmountCalculateRaw(props.rowData),
                                    props.rowData.gst
                                  ) -
                                    parseInt(totalPaidWithGST)
                              ? "Fully Paid !"
                              : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary m-auto"
                  >
                    {btnPending ? <ButtonLoader /> : "Pay"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default PaySlip;
