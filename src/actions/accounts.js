import config from "../config";
import * as ajaxCall from "../common/ajaxCall";
import * as actionTypes from "../constants/actionTypes";

export const getAccountList = (payload) => (dispatch) => {
    ajaxCall
    .get(`${config.BASE_URL}accounts/${payload}`)
    .then((res) => {
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

export const addAccount = (payload,elementRef) => (dispatch) => {

    ajaxCall
    .post(`${config.BASE_URL}createaccount`,payload)
    .then((res) => {
        dispatch(getAccountList(payload.user_id));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "Account created successfully!",
          });
          elementRef.current.click();
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.ERROR_MESSAGE,
        payload: error.response.data.message,
      });
    });
}

export const updateAccount = (payload,elementRef) => (dispatch) => {

    ajaxCall
    .post(`${config.BASE_URL}updateaccount`,payload)
    .then((res) => {
        dispatch(getAccountList(payload.user_id));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "Account Updated successfully!",
          });
          elementRef.current.click();
    })
    .catch((error) => {
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
    ajaxCall
    .get(`${config.BASE_URL}getaccountrecords/${payload.user_id}/${payload.id}`)
    .then((res) => {
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


export const addAccountDetails = (payload,elementRef) => (dispatch) => {

    ajaxCall
    .post(`${config.BASE_URL}createaccountrecord`,payload)
    .then((res) => {
        dispatch(getAccountDetails({user_id:payload.user_id,id:payload.account_id}));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "Account details created successfully!",
          });
          elementRef.current.click();
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.ERROR_MESSAGE,
        payload: error.response.data.message,
      });
    });
}


export const updateAccountDetails = (payload,elementRef) => (dispatch) => {

  ajaxCall
  .post(`${config.BASE_URL}updateaccountrecord`,payload)
  .then((res) => {
      dispatch(getAccountDetails({user_id:payload.user_id,id:payload.accountid}));
      dispatch({
          type: actionTypes.SUCCESS_MESSAGE,
          payload: "Account details updated  successfully!",
        });
        elementRef.current.click();
  })
  .catch((error) => {
    dispatch({
      type: actionTypes.ERROR_MESSAGE,
      payload: error.response.data.message,
    });
  });
}
