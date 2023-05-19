import config from "../config";
import * as ajaxCall from "../common/ajaxCall";
import * as actionTypes from "../constants/actionTypes";

export const getGoDownList = (payload) => (dispatch) => {
    ajaxCall
    .get(`${config.BASE_URL}stocks/${payload}`)
    .then((res) => {
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

export const addGoDown = (payload,elementRef) => (dispatch) => {

    ajaxCall
    .post(`${config.BASE_URL}createstock`,payload)
    .then((res) => {
        dispatch(getGoDownList(payload.user_id));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "GoDown created successfully!",
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

export const updateGoDown = (payload,elementRef) => (dispatch) => {

    ajaxCall
    .post(`${config.BASE_URL}updatestock`,payload)
    .then((res) => {
        dispatch(getGoDownList(payload.user_id));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "GoDown Updated successfully!",
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

export const deleteGoDown = (payload) => (dispatch) => {
    ajaxCall
    .post(`${config.BASE_URL}deletestock/${payload.id}`)
    .then((res) => {
        console.log(payload);
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
