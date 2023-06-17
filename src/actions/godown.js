import config from "../config";
import * as ajaxCall from "../common/ajaxCall";
import * as actionTypes from "../constants/actionTypes";
import { setLoadedData, setPendingData } from "./common";

export const getGoDownList = (payload) => (dispatch) => {
  setPendingData(dispatch);
    ajaxCall
    .get(`${config.BASE_URL}stocks/${payload}`)
    .then((res) => {
      setLoadedData(dispatch);
        dispatch({
            type: actionTypes.SET_GODOWN_LIST,
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

export const addGoDown = (payload,elementRef,setBtnPending,resetForm) => (dispatch) => {

    ajaxCall
    .post(`${config.BASE_URL}createstock`,payload)
    .then((res) => {
      resetForm();
      setBtnPending(false);
        dispatch(getGoDownList(payload.user_id));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "GoDown created successfully!",
          });
          elementRef.current.click();
    })
    .catch((error) => {
      setBtnPending(false);
      dispatch({
        type: actionTypes.ERROR_MESSAGE,
        payload: error.response.data.message,
      });
    });
}

export const updateGoDown = (payload,elementRef,setBtnPending) => (dispatch) => {

    ajaxCall
    .post(`${config.BASE_URL}updatestock`,payload)
    .then((res) => {
      setBtnPending(false);
        dispatch(getGoDownList(payload.user_id));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "GoDown Updated successfully!",
          });
          elementRef.current.click();
    })
    .catch((error) => {
      setBtnPending(false);
      dispatch({
        type: actionTypes.ERROR_MESSAGE,
        payload: error.response.data.message,
      });
    });
}

export const deleteGoDown = (payload) => (dispatch) => {
    ajaxCall
    .post(`${config.BASE_URL}deletestock/${payload.id}`)
    .then((res) => {
      
        dispatch(getGoDownList(payload.user_id));
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


export const getStockDetails = (payload) => (dispatch) => {
  setPendingData(dispatch);
    ajaxCall
    .get(`${config.BASE_URL}getstockrecords/${payload.user_id}/${payload.id}`)
    .then((res) => {
      setLoadedData(dispatch);
        dispatch({
            type: actionTypes.SET_STOCK_DETAILS,
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

export const getStockById = (payload) => (dispatch) => {
  setPendingData(dispatch);
    ajaxCall
    .get(`${config.BASE_URL}getstock/${payload}`)
    .then((res) => {
        dispatch({
            type: actionTypes.SET_SINGLE_STOCK,
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


export const addStockDetails = (payload,elementRef,setBtnPending,resetForm,itemRef,id) => (dispatch) => {

    ajaxCall
    .post(`${config.BASE_URL}createstockrecord`,payload)
    .then((res) => {
      resetForm();
      elementRef.current.click();
      itemRef.current.clearValue();
      setBtnPending(false);
        dispatch(getStockDetails({user_id:payload.user_id,id:id}));
        dispatch(getGoDownList(payload.user_id));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "Stock details created successfully!",
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


export const updateStockDetails = (payload,elementRef,setBtnPending,id) => (dispatch) => {

  ajaxCall
  .post(`${config.BASE_URL}updatestockrecord`,payload)
  .then((res) => {
    setBtnPending(false);
      dispatch(getStockDetails({user_id:payload.user_id,id:id}));
      dispatch(getGoDownList(payload.user_id));
      dispatch({
          type: actionTypes.SUCCESS_MESSAGE,
          payload: "Stock details updated  successfully!",
        });
        elementRef.current.click();
  })
  .catch((error) => {
    setBtnPending(false);
    dispatch({
      type: actionTypes.ERROR_MESSAGE,
      payload: error.response.data.message,
    });
  });
}


export const deleteStockDetails = (payload) => (dispatch) => {
  ajaxCall
  .post(`${config.BASE_URL}deletestockrecord/${payload.id}`)
  .then((res) => {
  
      dispatch(getStockDetails({user_id:payload.user_id,id:payload.stock_id}));
      dispatch(getGoDownList(payload.user_id));
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