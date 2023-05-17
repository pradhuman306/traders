
import {
  SET_BUY
  } from "../constants/actionTypes";
  const initialState ={
    buyList:[],
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

  
      default:
        return state;
       
    }
  }
  