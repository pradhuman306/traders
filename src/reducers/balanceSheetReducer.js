
import {
    SET_PARTY
} from "../constants/actionTypes";
const initialState = {
    partyList: [],
    pending: false,
}


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PARTY:
            return {
                ...state,
                partyList: action.payload
            };
          

        default:
            return state;
    }
}
