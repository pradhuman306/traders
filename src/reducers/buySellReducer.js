
import {
  SET_BUY, SET_SELL, SET_ALL_BUYSELL, SET_STOCK_LIST
  } from "../constants/actionTypes";
  const initialState ={
    buyList:[],
    sellList:[],
    buySellList:[],
    stockList:[],
    pending: false,
  }

  
  export default function (state = initialState, action) {
    switch (action.type) {

      case SET_ALL_BUYSELL:
        return {
          ...state,
          buySellList: action.payload,
          pending: false,
        };
      case SET_BUY:
        return {
          ...state,
          buyList: action.payload,
          pending: false,
        };
        case SET_STOCK_LIST:
          return {
            ...state,
            stockList: action.payload,
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
  