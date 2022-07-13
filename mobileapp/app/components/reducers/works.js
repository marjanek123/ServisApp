import {
    GET_WORKS_LIST,
    GET_WORKS_DETAIL,
    WORKS_DELEATE,
    WORKS_UPDATE,
    WORKS_ADD,
    WORKS_DETAIL_CLEAR,
} from "../actions/types.js";

const initialState = {
    works_list: [],
    works_detail: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_WORKS_LIST:
            return {
                ...state,
                works_list: action.payload,
            };
        case GET_WORKS_DETAIL:
            return {
                ...state,
                works_detail: action.payload,
            };
        case WORKS_ADD:
            return {
                ...state,
                works_list: [...state.works_list, action.payload],
            };
        case WORKS_DETAIL_CLEAR:
            return {
                works_detail: null,
            };
        case WORKS_UPDATE:
            return {
                ...state,
                works_list: state.works_list.map((event) => {
                    if (event.id == action.payload.id) {
                        return action.payload;
                    } else {
                        return event;
                    }
                }),
            };
        case WORKS_DELEATE:
            return {
                ...state,
                works_list: [
                    ...state.works_list.filter((work) => work.id !== action.payload),
                ],
            };
        default:
            return state;
    }
}