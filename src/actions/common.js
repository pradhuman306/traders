import { SET_LOADED, SET_PENDING } from "../constants/actionTypes";

export const formatDate = (date,format) => {
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
if(format == 'yyyy-mm-dd'){
  return year + "-" + month + "-" + day;
}else{
  return day + "-" + month + "-" + year;
}
 
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

    return parseInt(mainAmountAfterDebit);
  } else {
  
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
  if(price){
    return "₹" + parseInt(price).toLocaleString("en-IN");
  }else{
    return "₹0";
  }


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
export const shortName = (name) => {
  let newName = name.split(" ");
  let firstC = newName[0][0];
  let lastC = "";
  if (newName[1]) {
    lastC = newName[1][0].toUpperCase();
  }
  return firstC+lastC;
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


export const onvalChange = (e,param,setFieldValue,is_blur,is_hindi) => {
  if((e.target.value[e.target.value.length-1] == " " || is_blur)&&(is_hindi)){
    var mainurl = "https://www.google.com/inputtools/request?text="+e.target.value+"&ime=transliteration_en_hi&num=5&cp=0&cs=0&ie=utf-8&oe=utf-8"
    fetch(mainurl)
    .then (res=> res.json())
    .then((jsonData) => {
      if(jsonData){
       
          var val = jsonData[1][0][1][0];
          setFieldValue(param,val);
       
        // e.target.value= val;
      }
    })
    .catch((error) => {
    
    })
  }else{
    setFieldValue(param,e.target.value); 
  }

}

export const handleLangChange = (e,setHindi,setDescPlaceHolder) => {
  if (e.target.checked) {
      setHindi(true);
      setDescPlaceHolder('कृपया अपना विवरण दर्ज करें');
  } else {
      setHindi(false);
      setDescPlaceHolder('Please enter description');
  }
}

