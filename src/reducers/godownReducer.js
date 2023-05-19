
import {
    SET_GODOWN_LIST,
    SET_ACCOUNT_DETAILS
} from "../constants/actionTypes";
const initialState = {
    godownList: [],
    // accountDetails: [],
    pending: false,
}


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_GODOWN_LIST:
            return {
                ...state,
                godownList: action.payload
            };

        // case SET_ACCOUNT_DETAILS:
        //     return {
        //         ...state,
        //         accountDetails: action.payload
        //     };


        default:
            return state;
    }
}
