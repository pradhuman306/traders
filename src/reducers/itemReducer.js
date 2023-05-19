
import {
    SET_ITEM_LIST
} from "../constants/actionTypes";
const initialState = {
    itemList: [],
    pending: false,
}


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ITEM_LIST:
            return {
                ...state,
                itemList: action.payload
            };



        default:
            return state;
    }
}
