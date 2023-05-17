import config from "../config";
import * as ajaxCall from "../common/ajaxCall";
import * as actionTypes from "../constants/actionTypes";

export const getBuyList = (payload) => (dispatch) => {
    ajaxCall
    .get(`${config.BASE_URL}buy/${payload}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: actionTypes.SET_BUY,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.ERROR_MESSAGE,
        payload: error.response.data.message,
      });
    });
}

export const addBuySell = () => (dispatch) => {
  ajaxCall
  .post(`${config.BASE_URL}getpurchase`)
  .then((res) => {
      console.log(res);
  })
  .catch((error) => {
    dispatch({
      type: actionTypes.ERROR_MESSAGE,
      payload: error.response.data.message,
    });
  });
}

export const deleteBuySellList = () => (dispatch) => {

}