import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { formatDate, gstCalculate, priceFormatter, totalAmountCalculateRaw } from '../../actions/common';

const Invoice = (props) => {
    const [partyDetails, setPartyDetails] = useState({});
    const [historyDetails, setList] = useState({});
    useEffect(() => {
        setPartyDetails({...props.partyData});
        setList(props.rowData);
    }, [props.partyData,props.rowData])



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
            <div className="card">
                <div className="card-body">

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="text-muted">
                                <h5 className="font-size-16 mb-3">Billed To:</h5>
                                <h5 className="font-size-15 mb-2">{partyDetails.name}</h5>
                              
                            </div>
                        </div>
             
                        <div className="col-sm-6">
                            <div className="text-muted text-sm-end">
                                <div>
                                    <h5 className="font-size-15 mb-1">Invoice No:</h5>
                                    <p>#{historyDetails.bill_no}</p>
                                </div>
                                <div className="mt-4">
                                    <h5 className="font-size-15 mb-1">Invoice Date:</h5>
                                    <p>{formatDate(historyDetails.date)}</p>
                                </div>
                           
                            </div>
                        </div>
                  
                    </div>
      
                    
                    <div className="py-2">
                 

                        <div className="table-responsive">
                            <table className="table align-middle table-nowrap table-centered mb-0">
                                <thead>
                                    <tr>
                                        <th style={{width: "70px"}}>No.</th>
                                        <th>Item</th>
                                        <th>Rate</th>
                                        <th>Weight</th>
                                        <th className="text-end" style={{width: "120px"}}>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">01</th>
                                        <td>
                                            <div>
                                                <h5 className="text-truncate font-size-14 mb-1">{historyDetails.item}</h5>
                                     
                                            </div>
                                        </td>
                                        <td>{"₹"+parseInt((historyDetails.rate)).toLocaleString("en-IN")}</td>
                                        <td>{historyDetails.weight}qt</td>
                                        <td className="text-end">{"₹"+parseInt((historyDetails.amount)).toLocaleString("en-IN")}</td>
                                    
                                    </tr>
                            
                                  
                    
                               
                                    <tr>
                                        <th scope="row" colspan="4" className="border-0 text-end">
                                            Debit note :</th>
                                        <td className="border-0 text-end">{"₹"+parseInt((historyDetails.debit)).toLocaleString("en-IN")}</td>
                                    </tr>
                     
                                    <tr>
                                        <th scope="row" colspan="4" className="border-0 text-end">
                                            Commission :</th>
                                            <td className="border-0 text-end"> ₹{parseInt((historyDetails.amount-historyDetails.debit)*historyDetails.commission/100).toLocaleString("en-IN")}</td>
                                    </tr>
                               
                                    <tr>
                                        <th scope="row" colspan="4" className="border-0 text-end">
                                            GST: </th>
                                        <td className="border-0 text-end">₹{parseInt(historyDetails.amount*historyDetails.gst/100).toLocaleString("en-IN")}</td>
                                    </tr>
                           
                                    <tr>
                                        <th scope="row" colspan="4" className="border-0 text-end">Total</th>
                                        <td className="border-0 text-end"><h4 className="m-0 fw-semibold">{priceFormatter(parseInt(totalAmountCalculateRaw(historyDetails)+gstCalculate(totalAmountCalculateRaw(historyDetails),historyDetails.gst)))}</h4></td>
                                    </tr>
                                
                                </tbody>
                            </table>
                        </div>
                        <div className="d-print-none mt-4">
                            <div className="float-end">
                                <a href="javascript:window.print()" className="btn btn-success me-1">Print</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    </>
  )
}

export default Invoice