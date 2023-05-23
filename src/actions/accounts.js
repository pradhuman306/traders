import config from "../config";
import * as ajaxCall from "../common/ajaxCall";
import * as actionTypes from "../constants/actionTypes";
import { setLoadedData, setPendingData } from "./common";




export const getAccountList = (payload) => (dispatch) => {
  setPendingData(dispatch);
    ajaxCall
    .get(`${config.BASE_URL}accounts/${payload}`)
    .then((res) => {
      setLoadedData(dispatch);
        dispatch({
            type: actionTypes.SET_ACCOUNT_LIST,
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

export const addAccount = (payload,elementRef,setBtnPending) => (dispatch) => {

    ajaxCall
    .post(`${config.BASE_URL}createaccount`,payload)
    .then((res) => {
      setBtnPending(false);
        dispatch(getAccountList(payload.user_id));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "Account created successfully!",
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

export const updateAccount = (payload,elementRef,setBtnPending) => (dispatch) => {

    ajaxCall
    .post(`${config.BASE_URL}updateaccount`,payload)
    .then((res) => {
      setBtnPending(false);
        dispatch(getAccountList(payload.user_id));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "Account Updated successfully!",
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

export const deleteAccount = (payload) => (dispatch) => {
    ajaxCall
    .post(`${config.BASE_URL}deleteaccount/${payload.id}`)
    .then((res) => {
        console.log(payload);
        dispatch(getAccountList(payload.user_id));
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


export const getAccountDetails = (payload) => (dispatch) => {
  setPendingData(dispatch);
    ajaxCall
    .get(`${config.BASE_URL}getaccountrecords/${payload.user_id}/${payload.id}`)
    .then((res) => {
      setLoadedData(dispatch);
        dispatch({
            type: actionTypes.SET_ACCOUNT_DETAILS,
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

export const getAccountById = (payload) => (dispatch) => {
    ajaxCall
    .get(`${config.BASE_URL}getaccount/${payload}`)
    .then((res) => {
      console.log(res.data.data);
        dispatch({
            type: actionTypes.SET_SINGLE_ACCOUNT,
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

export const addAccountDetails = (payload,elementRef,setBtnPending) => (dispatch) => {

    ajaxCall
    .post(`${config.BASE_URL}createaccountrecord`,payload)
    .then((res) => {
      setBtnPending(false);
        dispatch(getAccountDetails({user_id:payload.user_id,id:payload.account_id}));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "Account details created successfully!",
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


export const updateAccountDetails = (payload,elementRef,setBtnPending) => (dispatch) => {

  ajaxCall
  .post(`${config.BASE_URL}updateaccountrecord`,payload)
  .then((res) => {
    setBtnPending(false);
      dispatch(getAccountDetails({user_id:payload.user_id,id:payload.accountid}));
      dispatch({
          type: actionTypes.SUCCESS_MESSAGE,
          payload: "Account details updated  successfully!",
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


export const deleteAccountDetails = (payload) => (dispatch) => {
  ajaxCall
  .post(`${config.BASE_URL}deleteaccountrecord/${payload.id}`)
  .then((res) => {
      console.log(payload);
      dispatch(getAccountDetails({user_id:payload.user_id,id:payload.accountid}));
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
