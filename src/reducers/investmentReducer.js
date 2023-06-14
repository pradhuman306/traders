
import {
    SET_INVESTMENT_LIST
} from "../constants/actionTypes";
const initialState = {
    investmentList: [],
    pending: false,
}


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_INVESTMENT_LIST:
            return {
                ...state,
                investmentList: action.payload
            };



        default:
            return state;
    }
}
