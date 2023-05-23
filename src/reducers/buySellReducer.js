
import {
  SET_BUY, SET_SELL
  } from "../constants/actionTypes";
  const initialState ={
    buyList:[],
    sellList:[],
    pending: false,
  }
 
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case SET_BUY:
        return {
          ...state,
          buyList: action.payload,
          pending: false,
        };
        case SET_SELL:
          return {
            ...state,
            sellList: action.payload,
            pending: false,
          };
  
      default:
        return state;
       
    }
  }
  