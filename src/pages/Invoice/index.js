import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { formatDate, gstCalculate, priceFormatter, titleCase, totalAmountCalculateRaw } from '../../actions/common';

const Invoice = (props) => {
    const [partyDetails, setPartyDetails] = useState({});
    const [historyDetails, setList] = useState({});
    useEffect(() => {
        setPartyDetails({ ...props.partyData });
        setList(props.rowData);
    }, [props.partyData, props.rowData])



    return (
        <>
            <div
                className="modal fade"
                id="invoice"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-head d-print-none">
                            <h4>Invoice</h4>
                            <a type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <img src="/assets/images/close.svg" alt="" /></a>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="d-flex mb-2">
                                        <h5 className='me-2'>Billed To:</h5>
                                        <p>{titleCase(partyDetails.name)}</p>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                        <div className='d-flex mb-2'>
                                            <h5 className='me-2'>Invoice No:</h5>
                                            <p>#{historyDetails.bill_no}</p>
                                        </div>
                                        <div className="d-flex mb-4">
                                            <h5 className='me-2'>Invoice Date:</h5>
                                            <p>{formatDate(historyDetails.date)}</p>
                                        </div>
                                </div>
                            </div>
                                <div className="table-responsive">
                                    <table className="table align-middle table-nowrap table-centered mb-0">
                                        <thead>
                                            <tr>
                                                <th style={{ width: "70px" }}>No.</th>
                                                <th>Item</th>
                                                <th>Rate</th>
                                                <th>Weight</th>
                                                <th className="text-end" style={{ width: "120px" }}>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">01</th>
                                                <td>
                                                    {historyDetails.item}
                                                </td>
                                                <td>{"₹" + parseInt((historyDetails.rate)).toLocaleString("en-IN")}</td>
                                                <td>{historyDetails.weight}qt</td>
                                                <td className="text-end">{"₹" + parseInt((historyDetails.amount)).toLocaleString("en-IN")}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" colSpan="4" className="border-0 text-end">
                                                    Debit note :</th>
                                                <td className="border-0 text-end">{"₹" + parseInt((historyDetails.debit)).toLocaleString("en-IN")}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" colSpan="4" className="border-0 text-end">
                                                    Commission :</th>
                                                <td className="border-0 text-end"> ₹{parseInt((historyDetails.amount - historyDetails.debit) * historyDetails.commission / 100).toLocaleString("en-IN")}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" colSpan="4" className="border-0 text-end">
                                                    GST: </th>
                                                <td className="border-0 text-end">₹{parseInt(historyDetails.amount * historyDetails.gst / 100).toLocaleString("en-IN")}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" colSpan="4" className="border-0 text-end">Total</th>
                                                <td className="border-0 text-end"><h4 className="m-0 fw-semibold">{priceFormatter(parseInt(totalAmountCalculateRaw(historyDetails) + gstCalculate(totalAmountCalculateRaw(historyDetails), historyDetails.gst)))}</h4></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                        </div>
                        <div className="modal-footer d-print-none">
                            <a onClick={()=>window.print()} className="btn btn-primary m-auto d-flex justify-content-center align-items-center">Print</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Invoice