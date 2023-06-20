import config from "../config";
import * as ajaxCall from "../common/ajaxCall";
import * as actionTypes from "../constants/actionTypes";
import { setLoadedData, setPendingData } from "./common";

export const getTransportRentList = (payload) => (dispatch) => {
  setPendingData(dispatch);
    ajaxCall
    .get(`${config.BASE_URL}rents/${payload}`)
    .then((res) => {
      setLoadedData(dispatch);
        dispatch({
            type: actionTypes.SET_TRANSPORT_RENT,
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

export const getRentHistoryByParty = (payload,param,datefromto) => (dispatch) => {
  setPendingData(dispatch);
    ajaxCall
    .get(`${config.BASE_URL}getrenthistorybyparty/${payload}?f=${param}&start=${datefromto?.start}&end=${datefromto?.end}`)
    .then((res) => {
      setLoadedData(dispatch);
        dispatch({
            type: actionTypes.SET_SINGLE_TRANS_RENT,
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

export const addTransportRent = (payload,elementRef,setBtnPending,resetForm,partyRef,transportRow) => (dispatch) => {

    ajaxCall
    .post(`${config.BASE_URL}createrent`,payload)
    .then((res) => {
      setBtnPending(false);
      resetForm();  
      partyRef.current.clearValue();
        dispatch(getRentHistoryByParty(transportRow.party_id));
        dispatch(getTransportRentList(payload.user_id));
 
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "Rent created successfully!",
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

export const updateTransportRent = (payload,elementRef,setBtnPending,transportRow) => (dispatch) => {

    ajaxCall
    .post(`${config.BASE_URL}updaterent`,payload)
    .then((res) => {
      setBtnPending(false);

        dispatch(getRentHistoryByParty(transportRow.party));
      dispatch(getTransportRentList(payload.user_id));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "Rent Updated successfully!",
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

export const deleteTransportRentList = (payload) => (dispatch) => {
    ajaxCall
    .post(`${config.BASE_URL}deleterent/${payload.id}`)
    .then((res) => {
       
        dispatch(getRentHistoryByParty(payload.party_id));
        dispatch(getTransportRentList(payload.user_id));
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

export const setEmptyTransDetails = () => (dispatch) => {
  dispatch({
    type: actionTypes.SET_EMPTY_TRANS_LIST,
  });
}

export const payRentAmount = (payload, elementRef, setBtnPending, resetForm ,filterValue) => (dispatch) => {
  ajaxCall
  .post(`${config.BASE_URL}rentpay`,payload)
  .then((res) => {
    setBtnPending(false);
    dispatch(getRentHistoryByParty(payload.id,filterValue));
    dispatch(getTransportRentList(payload.user_id));
      resetForm();
      elementRef.current.click();
      dispatch({
          type: actionTypes.SUCCESS_MESSAGE,
          payload: `₹${payload.amount} Paid successfully!`,
        });
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
