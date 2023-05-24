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
export const totalAmountCalculate = (row) => {
  return row.type === 'Buy' ?
    row.commission / 100 == 0 ? "₹" + (row.amount - row.debit) :
      "₹" + ((row.amount) - [(row.amount - row.debit) * (row.commission / 100)]).toLocaleString("en-IN") : row.commission / 100 == 0 ? "₹" + (row.amount - row.debit) :
      "₹" + (parseInt(row.amount) + parseInt([(row.amount - row.debit) * (row.commission / 100)])).toLocaleString("en-IN")
}