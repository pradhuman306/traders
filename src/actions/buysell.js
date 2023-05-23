import config from "../config";
import * as ajaxCall from "../common/ajaxCall";
import * as actionTypes from "../constants/actionTypes";
import { setLoadedData, setPendingData } from "./common";

export const getBuyList = (payload) => (dispatch) => {
  setPendingData(dispatch);
    ajaxCall
    .get(`${config.BASE_URL}buy/${payload}`)
    .then((res) => {
      setLoadedData(dispatch);
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

export const deleteBuySellList = (payload,isActive) => (dispatch) => {
  console.log(`${config.BASE_URL}${isActive.buy?"deletebuy":"deletesale"}/${payload.id}`);
  console.log(isActive);
  
  // ajaxCall
  // .post(`${config.BASE_URL}${isActive.buy?"deletebuy":"deletesale"}/${payload.id}`)
  // .then((res) => {
  //     console.log(payload);
  //     if(isActive.buy){
  //       dispatch(getBuyList(payload.user_id));
  //     }else{
  //       dispatch(getSellList(payload.user_id));
  //     }

  //     dispatch({
  //         type: actionTypes.SUCCESS_MESSAGE,
  //         payload: `${payload.name} Deleted Successfully!`,
  //       });
  // })
  // .catch((error) => {
  //   dispatch({
  //     type: actionTypes.ERROR_MESSAGE,
  //     payload: error.response.data.message,
  //   });
  // });
}

export const getSellList = (payload) => (dispatch) => {
  setPendingData(dispatch);
  ajaxCall
  .get(`${config.BASE_URL}sales/${payload}`)
  .then((res) => {
    setLoadedData(dispatch);
    dispatch({
      type: actionTypes.SET_SELL,
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