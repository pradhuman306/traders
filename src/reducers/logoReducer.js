import {
    SET_LOGO,
} from "../constants/actionTypes";
const initialState = {
  logo: localStorage.getItem("sitelogo") ? JSON.parse(localStorage.getItem("sitelogo")) : ""
}


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_LOGO:
            return {
                ...state,
                logo: action.payload
            };

        default:
            return state;
    }
}
