import config from "../config";
import * as ajaxCall from "../common/ajaxCall";
import * as actionTypes from "../constants/actionTypes";

export const getParty = (payload) => (dispatch) => {

    ajaxCall
    .get(`${config.BASE_URL}parties/${payload}`)
    .then((res) => {
        console.log(res);
        dispatch({
            type: actionTypes.SET_PARTY,
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

export const addParty = (payload,navigation) => (dispatch) => {

    ajaxCall
    .post(`${config.BASE_URL}createparty`,payload)
    .then((res) => {
        dispatch(getParty(payload.user_id));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "Party created successfully!",
          });
          navigation('/balancesheet')
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.ERROR_MESSAGE,
        payload: error.response.data.message,
      });
    });
}

export const updateParty = (payload,navigation) => (dispatch) => {

    ajaxCall
    .post(`${config.BASE_URL}updateparty`,payload)
    .then((res) => {
        dispatch(getParty(payload.user_id));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "Party Updated successfully!",
          });
          navigation('/balancesheet')
    })
    .catch((error) => {
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
        console.log(payload);
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