import {
  USER_LOADED,
  AUTH_ERROR,
  SET_USER_DATA,
  SET_TOTAL_DATA
} from "../constants/actionTypes";
import * as localStorage from "../common/localStorage";
import { Navigate } from "react-router";
const initialState =
  localStorage.get("exp") &&
  new Date() <= new Date(atob(localStorage.get("exp")))
    ? {
        token: localStorage.get("traders_token") || null,
        isAuthenticated: localStorage.get("traders_token") ? true : false,
        role: localStorage.get("role") ? atob(localStorage.get("role")) : null,
        totalData:{},
        userdata: localStorage.get("userdata")
          ? JSON.parse(localStorage.get("userdata"))
          : null,
        pending: true,
      }
    : localStorage.clear();

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.role,
        isAuthenticated: true,
        userdata: action.payload.data,
        pending: false,
      };
      case SET_USER_DATA:
        return {
          ...state,
          userdata: action.payload,
        };  
        case SET_TOTAL_DATA:
          return {
            ...state,
            totalData: action.payload,
          };  
    case AUTH_ERROR:
      <Navigate to="/signin" />;
      return {
        ...state,
        token: null,
        role: null,
        isAuthenticated: false,
        userdata: null,
      };

    default:
      return state
        ? state
        : {
            token: null,
            isAuthenticated: false,
            role: null,
            userdata: null,
          };
  }
}
