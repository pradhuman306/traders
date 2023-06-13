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
            <div class="card">
                <div class="card-body">

                    <div class="row">
                        <div class="col-sm-6">
                            <div class="text-muted">
                                <h5 class="font-size-16 mb-3">Billed To:</h5>
                                <h5 class="font-size-15 mb-2">{partyDetails.name}</h5>
                              
                            </div>
                        </div>
             
                        <div class="col-sm-6">
                            <div class="text-muted text-sm-end">
                                <div>
                                    <h5 class="font-size-15 mb-1">Invoice No:</h5>
                                    <p>#{historyDetails.bill_no}</p>
                                </div>
                                <div class="mt-4">
                                    <h5 class="font-size-15 mb-1">Invoice Date:</h5>
                                    <p>{formatDate(historyDetails.date)}</p>
                                </div>
                           
                            </div>
                        </div>
                  
                    </div>
      
                    
                    <div class="py-2">
                 

                        <div class="table-responsive">
                            <table class="table align-middle table-nowrap table-centered mb-0">
                                <thead>
                                    <tr>
                                        <th style={{width: "70px"}}>No.</th>
                                        <th>Item</th>
                                        <th>Rate</th>
                                        <th>Weight</th>
                                        <th class="text-end" style={{width: "120px"}}>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">01</th>
                                        <td>
                                            <div>
                                                <h5 class="text-truncate font-size-14 mb-1">{historyDetails.item}</h5>
                                     
                                            </div>
                                        </td>
                                        <td>{"₹"+parseInt((historyDetails.rate)).toLocaleString("en-IN")}</td>
                                        <td>{historyDetails.weight}qt</td>
                                        <td class="text-end">{"₹"+parseInt((historyDetails.amount)).toLocaleString("en-IN")}</td>
                                    
                                    </tr>
                            
                                  
                    
                               
                                    <tr>
                                        <th scope="row" colspan="4" class="border-0 text-end">
                                            Debit note :</th>
                                        <td class="border-0 text-end">{"₹"+parseInt((historyDetails.debit)).toLocaleString("en-IN")}</td>
                                    </tr>
                     
                                    <tr>
                                        <th scope="row" colspan="4" class="border-0 text-end">
                                            Commission :</th>
                                            <td class="border-0 text-end"> ₹{parseInt((historyDetails.amount-historyDetails.debit)*historyDetails.commission/100).toLocaleString("en-IN")}</td>
                                    </tr>
                               
                                    <tr>
                                        <th scope="row" colspan="4" class="border-0 text-end">
                                            GST: </th>
                                        <td class="border-0 text-end">₹{parseInt(historyDetails.amount*historyDetails.gst/100).toLocaleString("en-IN")}</td>
                                    </tr>
                           
                                    <tr>
                                        <th scope="row" colspan="4" class="border-0 text-end">Total</th>
                                        <td class="border-0 text-end"><h4 class="m-0 fw-semibold">{priceFormatter(parseInt(totalAmountCalculateRaw(historyDetails)+gstCalculate(totalAmountCalculateRaw(historyDetails),historyDetails.gst)))}</h4></td>
                                    </tr>
                                
                                </tbody>
                            </table>
                        </div>
                        <div class="d-print-none mt-4">
                            <div class="float-end">
                                <a href="javascript:window.print()" class="btn btn-success me-1">Print</a>
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