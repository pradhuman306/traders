import {
    SET_PARTY,
    SET_PARTY_HISTORY,
    SET_SINGLE_PARTY,
    SET_ALL_PARTY_HISTORY
} from "../constants/actionTypes";
const initialState = {
    partyList: [],
    partyHistory:[],
    partyHistoryAll:[],
    partySingle:{},
    pending: true,
}


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PARTY:
            return {
                ...state,
                partyList: action.payload,
                pending:false
            };

            case SET_SINGLE_PARTY:
                return {
                    ...state,
                    partySingle: action.payload[0],
                    pending:false
                };

            case SET_PARTY_HISTORY:
                return {
                    ...state,
                    partyHistory: action.payload,
                    pending:false
                };

                case SET_ALL_PARTY_HISTORY:
                    return {
                        ...state,
                        partyHistoryAll: action.payload,
                        pending:false
                    };

                
    
        default:
            return state;
    }
}
