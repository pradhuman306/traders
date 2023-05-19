import config from "../config";
import * as ajaxCall from "../common/ajaxCall";
import * as actionTypes from "../constants/actionTypes";

export const getItems = (payload) => (dispatch) => {
    ajaxCall
    .get(`${config.BASE_URL}items/${payload}`)
    .then((res) => {
        dispatch({
            type: actionTypes.SET_ITEM_LIST,
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

export const addItems= (payload,elementRef) => (dispatch) => {

    ajaxCall
    .post(`${config.BASE_URL}createitem`,payload)
    .then((res) => {
        dispatch(getItems(payload.user_id));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "Item created successfully!",
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

export const updateItems = (payload,elementRef) => (dispatch) => {

    ajaxCall
    .post(`${config.BASE_URL}updateitem`,payload)
    .then((res) => {
        dispatch(getItems(payload.user_id));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "Item Updated successfully!",
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

export const deleteItems = (payload) => (dispatch) => {
    ajaxCall
    .post(`${config.BASE_URL}deleteitem/${payload.id}`)
    .then((res) => {
        console.log(payload);
        dispatch(getItems(payload.user_id));
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


