import config from "../config";
import * as ajaxCall from "../common/ajaxCall";
import * as actionTypes from "../constants/actionTypes";
import { setLoadedData, setPendingData } from "./common";

export const getInvestment = (payload) => (dispatch) => {
  setPendingData(dispatch);
    ajaxCall
    .get(`${config.BASE_URL}investments/${payload}`)
    .then((res) => {
      setLoadedData(dispatch);
        dispatch({
            type: actionTypes.SET_INVESTMENT_LIST,
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

export const addInvestment= (payload,elementRef,setBtnPending,resetForm) => (dispatch) => {

    ajaxCall
    .post(`${config.BASE_URL}createinvestment`,payload)
    .then((res) => {
      resetForm();
      setBtnPending(false);
        dispatch(getInvestment(payload.user_id));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "Investment created successfully!",
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

export const updateInvestment = (payload,elementRef,setBtnPending) => (dispatch) => {

    ajaxCall
    .post(`${config.BASE_URL}updateinvestment`,payload)
    .then((res) => {
      setBtnPending(false);
        dispatch(getInvestment(payload.user_id));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "Investment Updated successfully!",
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

export const deleteInvestment = (payload) => (dispatch) => {
    ajaxCall
    .post(`${config.BASE_URL}deleteinvestment/${payload.id}`)
    .then((res) => {
  
        dispatch(getInvestment(payload.user_id));
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


