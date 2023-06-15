import config from "../config";
import * as ajaxCall from "../common/ajaxCall";
import * as actionTypes from "../constants/actionTypes";
import { setLoadedData, setPendingData } from "./common";



export const getAllBuySellList = (payload) => (dispatch) => {
  setPendingData(dispatch);
    ajaxCall
    .get(`${config.BASE_URL}alllistbuysale/${payload}`)
    .then((res) => {
      setLoadedData(dispatch);
      console.log(res);
      dispatch({
        type: actionTypes.SET_ALL_BUYSELL,
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

export const addBuy = (payload,elementRef,setBtnPending,resetForm,isActive) => (dispatch) => {
  ajaxCall
  .post(`${config.BASE_URL}createbuy`,payload)
  .then((res) => {
    elementRef.current.click();
    setBtnPending(false);
    resetForm();
    if(isActive.buy){
      dispatch(getBuyList(payload.user_id));
    }else{
    dispatch(getAllBuySellList(payload.user_id));
    }
    dispatch(getBuyList(payload.user_id));
      dispatch({
        type: actionTypes.SUCCESS_MESSAGE,
        payload: res.data.message,
      });
  })
  .catch((error) => {
    setBtnPending(false);
    dispatch({
      type: actionTypes.ERROR_MESSAGE,
      payload: error.response.data.message,
    });
  });
}

export const updateBuy = (payload,elementRef,setBtnPending,isActive) => (dispatch) => {
  ajaxCall
  .post(`${config.BASE_URL}updatebuy`,payload)
  .then((res) => {
    elementRef.current.click();
    setBtnPending(false);

    if(isActive.sell){
      dispatch(getBuyList(payload.user_id));
    }else{
    dispatch(getAllBuySellList(payload.user_id));
    }
    
      dispatch({
        type: actionTypes.SUCCESS_MESSAGE,
        payload: res.data.message,
      });
  })
  .catch((error) => {
    setBtnPending(false);
    dispatch({
      type: actionTypes.ERROR_MESSAGE,
      payload: error.response.data.message,
    });
  });
}

export const addSell = (payload,elementRef,setBtnPending,resetForm,isActive) => (dispatch) => {
  ajaxCall
  .post(`${config.BASE_URL}createsale`,payload)
  .then((res) => {
    resetForm();
    elementRef.current.click();
    setBtnPending(false);
    if(isActive.sell){
      dispatch(getSellList(payload.user_id));
    }else{
    dispatch(getAllBuySellList(payload.user_id));
    }
  
    dispatch({
      type: actionTypes.SUCCESS_MESSAGE,
      payload: res.data.message,
    });
  })
  .catch((error) => {
    setBtnPending(false);
    dispatch({
      type: actionTypes.ERROR_MESSAGE,
      payload: error.response.data.message,
    });
  });
}

export const updateSell = (payload,elementRef,setBtnPending,isActive) => (dispatch) => {
  ajaxCall
  .post(`${config.BASE_URL}updatesale`,payload)
  .then((res) => {
    elementRef.current.click();
    setBtnPending(false);
    if(isActive.sell){
      dispatch(getSellList(payload.user_id));
    }else{
      dispatch(getAllBuySellList(payload.user_id));
    }
    
    dispatch({
      type: actionTypes.SUCCESS_MESSAGE,
      payload: res.data.message,
    });
  })
  .catch((error) => {
    setBtnPending(false);
    dispatch({
      type: actionTypes.ERROR_MESSAGE,
      payload: error.response.data.message,
    });
  });
}

export const deleteBuySellList = (payload,isActive) => (dispatch) => {
  ajaxCall
  .post(`${config.BASE_URL}${isActive.buy?"deletebuy":"deletesale"}/${payload.id}`)
  .then((res) => {
      console.log(payload);
      if(isActive.buy){
        dispatch(getBuyList(payload.user_id));
      }else if(isActive.sell){
        dispatch(getSellList(payload.user_id));
      }else{
        dispatch(getAllBuySellList(payload.user_id));
      }


    

      dispatch({
          type: actionTypes.SUCCESS_MESSAGE,
          payload: `${payload.name} Deleted Successfully!`,
        });
  })
  .catch((error) => {
    dispatch({
      type: actionTypes.ERROR_MESSAGE,
      payload: error.response.data.message,
    });
  });
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