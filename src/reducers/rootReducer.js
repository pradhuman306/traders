import authReducer from "./authReducer";
import toasterReducer from "./toasterReducer";
import buySellReducer from "./buySellReducer";
import transportRentReducer from "./transportRentReducer";
import balanceSheetReducer from "./balanceSheetReducer";
import accountReducer from "./accountReducer";
import itemReducer from "./itemReducer";
import firmReducer from "./firmReducer";
import godownReducer from "./godownReducer";
import loaderReducer from "./loaderReducer";
import logoReducer from "./logoReducer";
import investmentReducer from "./investmentReducer";
import { combineReducers } from "redux";
import * as actionTypes from "../constants/actionTypes";
const appReducer = combineReducers({
  authReducer,
  toasterReducer,
  buySellReducer,
  transportRentReducer,
  balanceSheetReducer,
  accountReducer,
  itemReducer,
  godownReducer,
  loaderReducer,
  logoReducer,
  firmReducer,
  investmentReducer
});

export default function (state, action) {
  if (action.type === actionTypes.USER_LOGOUT) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
}
