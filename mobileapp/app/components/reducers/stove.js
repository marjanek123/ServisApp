import { GET_STOVE, ADD_STOVE } from "../actions/types.js";

const initialState = {
    stove_list: [],
    stove_detail: {},
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_STOVE:
            return {
                ...state,
                stove_list: action.payload,
            };
        case ADD_STOVE:
            return {
                ...state,
                stove_list: [action.payload, ...state.stove_list],
            };
        default:
            return state;
    }
}