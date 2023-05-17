import config from "../config";
import * as ajaxCall from "../common/ajaxCall";
import * as actionTypes from "../constants/actionTypes";

export const getTransportRentList = (payload) => (dispatch) => {
    ajaxCall
    .get(`${config.BASE_URL}rents/${payload}`)
    .then((res) => {
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

export const addTransportRent = (payload,navigation) => (dispatch) => {

    ajaxCall
    .post(`${config.BASE_URL}createrent`,payload)
    .then((res) => {
        dispatch(getTransportRentList(payload.user_id));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "Rent created successfully!",
          });
          navigation('/transportrent')
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.ERROR_MESSAGE,
        payload: error.response.data.message,
      });
    });
}

export const updateTransportRent = (payload,navigation) => (dispatch) => {

    ajaxCall
    .post(`${config.BASE_URL}updaterent`,payload)
    .then((res) => {
        dispatch(getTransportRentList(payload.user_id));
        dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "Rent Updated successfully!",
          });
          navigation('/transportrent')
    })
    .catch((error) => {
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