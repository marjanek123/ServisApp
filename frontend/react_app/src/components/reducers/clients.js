import {
    GET_CLIENTS_DETAIL,
    CLIENT_ADD,
    CLEAR_CLIENTS,
    LOAD_CLIENTS,
    CLIENT_DELETE,
    UPDATE_CLIENT,
    GET_CLIENTS_DETAIL_EVENT,
    GET_CLIENT_EVENTS,
    CLEAR_CLIENTS_DETAIL_EVENT,
} from "../actions/types.js";

const initialState = {
    clientsList: {
        count: 0,
        next: null,
        previous: null,
        results: [],
    },
    clientDetail: null,
    clientDetailEvent: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case LOAD_CLIENTS:
            return {
                ...state,
                clientsList: action.payload,
            };
        case GET_CLIENTS_DETAIL:
            return {
                ...state,
                clientDetail: action.payload,
            };
        case CLEAR_CLIENTS_DETAIL_EVENT:
            return {
                ...state,
                clientDetailEvent: null,
            };
        case GET_CLIENTS_DETAIL_EVENT:
            return {
                ...state,
                clientDetailEvent: action.payload,
            };
        case UPDATE_CLIENT:
            return {
                ...state,
                clientDetail: action.payload,
            };
        case CLIENT_DELETE:
            return {
                ...state,
                clientDetail: null,
                clientsList: {
                    count: state.clientsList.count,
                    next: state.clientsList.next,
                    previous: state.clientsList.previous,
                    results: state.clientsList.results.filter(
                        (event) => event.id !== action.payload
                    ),
                },
            };
        case CLEAR_CLIENTS:
            return {
                ...state,
                clientsList: {
                    count: 0,
                    next: null,
                    previous: null,
                    results: [],
                },
            };
        default:
            return state;
    }
}