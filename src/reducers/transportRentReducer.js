
import {
    SET_TRANSPORT_RENT,
    SET_SINGLE_TRANS_RENT
} from "../constants/actionTypes";
const initialState = {
    transportRentList: [],
    singletransportRent: [],
    pending: false,
}


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_TRANSPORT_RENT:
            return {
                ...state,
                transportRentList: action.payload
            };
            case SET_SINGLE_TRANS_RENT:
                return {
                    ...state,
                    singletransportRent: action.payload
                };

        default:
            return state;
    }
}
