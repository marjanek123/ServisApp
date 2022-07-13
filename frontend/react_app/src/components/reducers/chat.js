import {
    CHAT_LIST,
    CHAT_MESSAGES,
    SEND_MESSAGE,
    NEW_MESSAGE,
} from "../actions/types.js";

const initialState = {
    chatList: [],
    receiver: null,
    is_read: true,
    messages: [],
    newmessage: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CHAT_LIST:
            return {
                ...state,
                chatList: action.payload,
            };
        case CHAT_MESSAGES:
            return {
                ...state,
                ...action.payload,
            };
        case NEW_MESSAGE:
            return {
                ...state,
                ...action.payload,
            };
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [action.payload, ...state.messages],
            };
        default:
            return state;
    }
}