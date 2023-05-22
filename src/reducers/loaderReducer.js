import {
    SET_PENDING,
    SET_LOADED,
} from "../constants/actionTypes";
const initialState = {
    pending: true,
}


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PENDING:
            return {
                ...state,
                pending: true
            };
        case SET_LOADED:
            return {
                ...state,
                pending: false
            };

        default:
            return state;
    }
}
