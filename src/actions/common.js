import { SET_LOADED, SET_PENDING } from "../constants/actionTypes";

export const formatDate = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }

  if (day.length < 2) {
    day = '0' + day;
  }

  return day + "-" + month + "-" + year;
}

export const setPendingData = (dispatch) => {
  dispatch({ type: SET_PENDING });
}
export const setLoadedData = (dispatch) => {
  dispatch({ type: SET_LOADED });
}

export const totalAmountCalculateRaw = (row) => {
  let mainAmountAfterDebit = 0;
  if (row.debit == "") {
    row.debit = 0;
  }
  if (row.commission == "") {
    row.commission = 0;
  }

  mainAmountAfterDebit = parseInt(row.amount) - parseInt(row.debit);
  if (parseInt(row.commission) / 100 == 0) {
    console.log(mainAmountAfterDebit);
    return parseInt(mainAmountAfterDebit);
  } else {
    console.log(parseInt((mainAmountAfterDebit) + parseInt([(mainAmountAfterDebit) * (parseInt(row.commission) / 100)])));
    return parseInt((mainAmountAfterDebit) + parseInt([(mainAmountAfterDebit) * (parseInt(row.commission) / 100)]));
  }

}

export const totalAmountBuy = (row) => {
  let mainAmountAfterDebit = 0;
  if (row.debit == "") {
    row.debit = 0;
  }
  if (row.commission == "") {
    row.commission = 0;
  }
  if (row.type == "Buy") {
    mainAmountAfterDebit = parseInt(row.amount) - parseInt(row.debit);
    if (parseInt(row.commission) / 100 == 0) {
      return parseInt(mainAmountAfterDebit);
    } else {
      return parseInt((mainAmountAfterDebit) + parseInt([(mainAmountAfterDebit) * (parseInt(row.commission) / 100)]));
    }
  } else {
    return 0;
  }

}
export const totalAmountSell = (row) => {
  let mainAmountAfterDebit = 0;
  if (row.debit == "") {
    row.debit = 0;
  }
  if (row.commission == "") {
    row.commission = 0;
  }
  if (row.type == "Sale") {
    mainAmountAfterDebit = parseInt(row.amount) - parseInt(row.debit);
    if (parseInt(row.commission) / 100 == 0) {
      return parseInt(mainAmountAfterDebit);
    } else {
      return parseInt((mainAmountAfterDebit) + parseInt([(mainAmountAfterDebit) * (parseInt(row.commission) / 100)]));
    }
  } else {
    return 0;
  }

}

export const gstCalculate = (amount, gst) => {
  if (gst == "") {
    gst = 0;
  }
  return parseInt(amount) * parseInt(gst) / 100;
}

export const gstCalculateBuy = (amount, gst, row) => {
  if (row.type == 'Buy') {
    if (gst == "") {
      gst = 0;
    }
    return parseInt(amount) * parseInt(gst) / 100;
  }

}

export const priceFormatter = (price) => {
  return "₹" + parseInt(price).toLocaleString("en-IN");

}
export const makePositive = (amount) => {
  if (parseInt(amount) < 0) {
    return parseInt(-amount);
  } else {
    return parseInt(amount);
  }

}

export const titleCase = (name) => {
  return name?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}

export const dataFormatCSV = (data,pname,param) => {
  let itemHeader = [];
  if(param == 'transportHistory'){
    itemHeader = ['Party','Date','Destination','Rate','Weight','Advance','Total'];
  }else if(param == 'balanceHistory'){
     itemHeader = ['Party','Date','Type','Bill no','Item','Weight','Rate','Amount','Debit','Commission','GST','Total'];
  }
let newArray = [itemHeader];
 data.map((item,i) => {
    const newItem = [];  
    if(param == 'balanceHistory'){
    let newRow = {};
    newRow.debit = parseInt(data[i]?.debit);
    newRow.amount = parseInt(data[i]?.amount);
    newRow.commission = parseInt(data[i]?.commission);
    newItem.push(pname,formatDate(item.date),item.type,item.bill_no,item.item,item.weight,item.rate,item.amount,item.debit,item.commission,item.gst,totalAmountCalculateRaw(newRow));
    }else if(param == 'transportHistory'){
      newItem.push(pname,formatDate(item.date),item.destination,item.rate,item.weight,item.advance,parseInt(item.weight)*parseInt(item.rate)-parseInt(item.advance));
    }
    newArray.push(newItem);
  
})
return newArray;
}
