import config from "../config";
import * as ajaxCall from "../common/ajaxCall";
import * as actionTypes from "../constants/actionTypes";
import { setLoadedData, setPendingData } from "./common";

export const getFirm = (payload) => (dispatch) => {
  setPendingData(dispatch);
    ajaxCall
    .get(`${config.BASE_URL}firms/${payload}`)
    .then((res) => {
      setLoadedData(dispatch);
        dispatch({
            type: actionTypes.SET_FIRM_LIST,
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

export const addFirm = (payload,elementRef,setBtnPending,resetForm) => (dispatch) => {

    ajaxCall
    .post(`${config.BASE_URL}createfirm`,payload)
    .then((res) => {
      resetForm();
      setBtnPending(false);
        dispatch(getFirm(payload.user_id));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "Firm created successfully!",
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

export const updateFirm = (payload,elementRef,setBtnPending) => (dispatch) => {

    ajaxCall
    .post(`${config.BASE_URL}updatefirm`,payload)
    .then((res) => {
      setBtnPending(false);
        dispatch(getFirm(payload.user_id));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "Firm Updated successfully!",
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

export const deleteFirm = (payload) => (dispatch) => {
    ajaxCall
    .post(`${config.BASE_URL}deletefirm/${payload.id}`)
    .then((res) => {
        console.log(payload);
        dispatch(getFirm(payload.user_id));
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


