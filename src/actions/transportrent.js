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
      dispatch({
        type: actionTypes.ERROR_MESSAGE,
        payload: error.response.data.message,
      });
    });
}

export const getRentHistoryByParty = (payload) => (dispatch) => {
  setPendingData(dispatch);
    ajaxCall
    .get(`${config.BASE_URL}getrenthistorybyparty/${payload}`)
    .then((res) => {
      setLoadedData(dispatch);
        dispatch({
            type: actionTypes.SET_SINGLE_TRANS_RENT,
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
      dispatch({
        type: actionTypes.ERROR_MESSAGE,
        payload: error.response.data.message,
      });
    });
}

export const updateTransportRent = (payload,elementRef,setBtnPending,transportRow) => (dispatch) => {

    ajaxCall
    .post(`${config.BASE_URL}updaterent`,payload)
    .then((res) => {
      setBtnPending(false);
      console.log(transportRow);
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
      dispatch({
        type: actionTypes.ERROR_MESSAGE,
        payload: error.response.data.message,
      });
    });
}

export const deleteTransportRentList = (payload) => (dispatch) => {
    ajaxCall
    .post(`${config.BASE_URL}deleterent/${payload.id}`)
    .then((res) => {
        console.log(payload);
        dispatch(getRentHistoryByParty(payload.party_id));
        dispatch(getTransportRentList(payload.user_id));
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

export const setEmptyTransDetails = () => (dispatch) => {
  dispatch({
    type: actionTypes.SET_EMPTY_TRANS_LIST,
  });
}