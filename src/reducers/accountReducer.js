
import {
    SET_ACCOUNT_LIST,
    SET_ACCOUNT_DETAILS
} from "../constants/actionTypes";
const initialState = {
    accountList: [],
    accountDetails: [],
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


        default:
            return state;
    }
}
