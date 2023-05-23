
import {
    SET_GODOWN_LIST,
    SET_SINGLE_STOCK,
    SET_STOCK_DETAILS
} from "../constants/actionTypes";
const initialState = {
    godownList: [],
    stockDetails: [],
    stockSingle: {},
    pending: false,
}


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_GODOWN_LIST:
            return {
                ...state,
                godownList: action.payload
            };

        case SET_SINGLE_STOCK:
            return {
                ...state,
                stockSingle: action.payload[0],
                pending: false
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
