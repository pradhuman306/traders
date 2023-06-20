import config from "../config";
import * as ajaxCall from "../common/ajaxCall";
import * as actionTypes from "../constants/actionTypes";
import { setLoadedData, setPendingData } from "./common";

export const getItems = (payload) => (dispatch) => {
  setPendingData(dispatch);
    ajaxCall
    .get(`${config.BASE_URL}items/${payload}`)
    .then((res) => {
      setLoadedData(dispatch);
        dispatch({
            type: actionTypes.SET_ITEM_LIST,
            payload: res.data.data,
          });
    })
    .catch((error) => {
      if(error.code == "ERR_NETWORK"){
        dispatch({
          type: actionTypes.ERROR_MESSAGE,
          payload: error.message,
        });
      } else{
    
        dispatch({
          type: actionTypes.ERROR_MESSAGE,
          payload: error.response.data.message,
        });
      }
    });
}

export const addItems= (payload,elementRef,setBtnPending,resetForm) => (dispatch) => {

    ajaxCall
    .post(`${config.BASE_URL}createitem`,payload)
    .then((res) => {
      resetForm();
      setBtnPending(false);
        dispatch(getItems(payload.user_id));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "Item created successfully!",
          });
          elementRef.current.click();
    })
    .catch((error) => {
      setBtnPending(false);
      if(error.code == "ERR_NETWORK"){
        dispatch({
          type: actionTypes.ERROR_MESSAGE,
          payload: error.message,
        });
      } else{
    
        dispatch({
          type: actionTypes.ERROR_MESSAGE,
          payload: error.response.data.message,
        });
      }
    });
}

export const updateItems = (payload,elementRef,setBtnPending) => (dispatch) => {

    ajaxCall
    .post(`${config.BASE_URL}updateitem`,payload)
    .then((res) => {
      setBtnPending(false);
        dispatch(getItems(payload.user_id));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "Item Updated successfully!",
          });
          elementRef.current.click();
    })
    .catch((error) => {
      setBtnPending(false);
      if(error.code == "ERR_NETWORK"){
        dispatch({
          type: actionTypes.ERROR_MESSAGE,
          payload: error.message,
        });
      } else{
    
        dispatch({
          type: actionTypes.ERROR_MESSAGE,
          payload: error.response.data.message,
        });
      }
    });
}

export const deleteItems = (payload) => (dispatch) => {
    ajaxCall
    .post(`${config.BASE_URL}deleteitem/${payload.id}`)
    .then((res) => {

        dispatch(getItems(payload.user_id));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: `${payload.name} Deleted Successfully!`,
          });
    })
    .catch((error) => {
      if(error.code == "ERR_NETWORK"){
        dispatch({
          type: actionTypes.ERROR_MESSAGE,
          payload: error.message,
        });
      } else{
    
        dispatch({
          type: actionTypes.ERROR_MESSAGE,
          payload: error.response.data.message,
        });
      }
    });
}


