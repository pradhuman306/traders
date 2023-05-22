
import {
    SET_GODOWN_LIST,
    SET_STOCK_DETAILS
} from "../constants/actionTypes";
const initialState = {
    godownList: [],
    stockDetails: [],
    pending: false,
}


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_GODOWN_LIST:
            return {
                ...state,
                godownList: action.payload
            };

        case SET_STOCK_DETAILS:
            return {
                ...state,
                stockDetails: action.payload
            };


        default:
            return state;
    }
}
