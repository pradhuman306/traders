
import {
    SET_FIRM_LIST
} from "../constants/actionTypes";
const initialState = {
    firmList: [],
    pending: false,
}


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_FIRM_LIST:
            return {
                ...state,
                firmList: action.payload
            };



        default:
            return state;
    }
}
