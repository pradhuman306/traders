import config from "../config";
import * as ajaxCall from "../common/ajaxCall";
import * as actionTypes from "../constants/actionTypes";
import { setLoadedData, setPendingData } from "./common";
import { getTransportRentList } from "./transportrent";



export const getParty = (payload) => (dispatch) => {
  setPendingData(dispatch);
    ajaxCall
    .get(`${config.BASE_URL}parties/${payload}`)
    .then((res) => {
      setLoadedData(dispatch);
    
        dispatch({
            type: actionTypes.SET_PARTY,
            payload: res.data.data,
          });
    })
    .catch((error) => {
  if(error.code == "ERR_NETWORK"){
    dispatch({
      type: actionTypes.ERROR_MESSAGE,
      payload: error.message,
    });
  }else{
    dispatch({
      type: actionTypes.ERROR_MESSAGE,
      payload: error.response.data.message,
    });
  }
   
      
    });
}

export const getPartyById = (payload,param,datefromto) => (dispatch) => {
  setPendingData(dispatch);
    ajaxCall
    .get(`${config.BASE_URL}getparty/${payload}?f=${param}&start=${datefromto?.start}&end=${datefromto?.end}`)
    .then((res) => {
      setLoadedData(dispatch);
        dispatch({
            type: actionTypes.SET_SINGLE_PARTY,
            payload: res.data.data,
          });
          dispatch({
            type: actionTypes.SET_PARTY_HISTORY,
            payload: res.data.history,
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

export const getAllPartyHistory = (payload,param) => (dispatch) => {
  setPendingData(dispatch);
    ajaxCall
    .get(`${config.BASE_URL}getparty/${payload}?f=${param}`)
    .then((res) => {
      setLoadedData(dispatch);
          dispatch({
            type: actionTypes.SET_ALL_PARTY_HISTORY,
            payload: res.data.history,
          });
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.ERROR_MESSAGE,
        payload: error.response.data.message,
      });
    });
}

export const addParty = (payload,elementRef,setBtnPending,resetForm) => (dispatch) => {
    ajaxCall
    .post(`${config.BASE_URL}createparty`,payload)
    .then((res) => {
      setBtnPending(false);
      resetForm();
        dispatch(getParty(payload.user_id));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "Party created successfully!",
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

export const updateParty = (payload,elementRef,setBtnPending) => (dispatch) => {
    ajaxCall
    .post(`${config.BASE_URL}updateparty`,payload)
    .then((res) => {
      setBtnPending(false);
        dispatch(getParty(payload.user_id));
        dispatch(getTransportRentList(payload.user_id));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "Party Updated successfully!",
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

export const deleteParty = (payload) => (dispatch) => {
    ajaxCall
    .post(`${config.BASE_URL}deleteparty/${payload.id}`)
    .then((res) => {
    
        dispatch(getParty(payload.user_id));
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

export const payAmount = (payload, elementRef, setBtnPending, resetForm, type, filterValue,partyid) => (dispatch) => {
  ajaxCall
  .post(`${config.BASE_URL}${type=='Buy'?'paidforbuy':'paidforsale'}`,payload)
  .then((res) => {
    setBtnPending(false);
    dispatch(getPartyById(partyid,filterValue));
    dispatch(getAllPartyHistory(partyid,"all"));
    
      resetForm();
      elementRef.current.click();
      dispatch({
          type: actionTypes.SUCCESS_MESSAGE,
          payload: `₹${payload.amount} Paid successfully!`,
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





