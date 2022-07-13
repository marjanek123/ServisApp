import {
    LOGIN_SUCCES,
    LOGIN_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCES,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT_SUCCES,
} from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case LOGIN_SUCCES:
        case REGISTER_SUCCES:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
            };
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR:
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
            };

        case LOGOUT_SUCCES:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
}