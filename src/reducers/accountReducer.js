
import {
    SET_ACCOUNT_LIST,
    SET_ACCOUNT_DETAILS,
    SET_SINGLE_ACCOUNT
} from "../constants/actionTypes";
const initialState = {
    accountList: [],
    accountDetails: [],
    accountSingle:{},
    pending: false,
}


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ACCOUNT_LIST:
            return {
                ...state,
                accountList: action.payload
            };

        case SET_ACCOUNT_DETAILS:
            return {
                ...state,
                accountDetails: action.payload
            };
        case SET_SINGLE_ACCOUNT:
            return {
                ...state,
                accountSingle: action.payload[0]
            };


        default:
            return state;
    }
}
