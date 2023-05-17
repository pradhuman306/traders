import {
    SUCCESS_MESSAGE,
    ERROR_MESSAGE,
    WARNING_MESSAGE,
    INFO_MESSAGE
  } from "../constants/actionTypes";
  export default function (state = {}, action) {
    switch (action.type) {
      case SUCCESS_MESSAGE:
        return {
          type: 'success',
          message: action.payload,
        };
      case ERROR_MESSAGE:
        return {
          type: 'error',
          message: action.payload,
        };
      case WARNING_MESSAGE:
        return {
          type: 'warning',
          message: action.payload,
        };
      case INFO_MESSAGE:
        return {
          type: 'info',
          message: action.payload,
        };
      default:
        return state;
    }
  }