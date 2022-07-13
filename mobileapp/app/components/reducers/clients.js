import {
    GET_CLIENTS_LIST,
    GET_CLIENTS_DETAIL,
    CLEAR_CLIENTS_DETAIL,
    UPDATE_CLIENT,
} from "../actions/types.js";

const initialState = {
    clients_list: {
        count: 0,
        next: null,
        previous: null,
        results: [],
    },
    clients_detail: null,
};

export const cellphones = (data) => {
    const list = [];
    data.map((event) => {
        if (event.client) {
            list.push(event.client.tel);
        }
    });
    if (list[0]) {
        if (!list[1]) {
            return list[0];
        } else {
            return list;
        }
    } else {
        return null;
    }
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_CLIENTS_LIST:
            return {
                ...state,
                clients_list: action.payload,
            };
        case GET_CLIENTS_DETAIL:
            return {
                ...state,
                clients_detail: action.payload,
            };
        case CLEAR_CLIENTS_DETAIL:
            return {
                ...state,
                clients_detail: null,
            };
        case UPDATE_CLIENT:
            return {
                ...state,
                clients_list: {
                    count: state.clients_list.count,
                    next: state.clients_list.next,
                    previous: state.clients_list.previous,
                    results: [
                        action.payload,
                        ...state.clients_list.results.filter(
                            (client) => client.id !== action.payload.id
                        ),
                    ],
                },
            };
        default:
            return state;
    }
}