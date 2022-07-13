import axios from "axios";
import { HOST } from "./allowedhost";
import { returnErrors } from "./messages";
import {
    LOGIN_SUCCES,
    REGISTER_SUCCES,
    LOGIN_FAIL,
    REGISTER_FAIL,
    USER_LOADED,
    LOGOUT_SUCCES,
    AUTH_ERROR,
    CLEAR_GROUP,
} from "./types";

export const loadUser = () => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

    axios
        .get(`http://${HOST}/api/user`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: USER_LOADED,
                payload: res.data,
            });
        })
        .catch((err) => {
            // dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR,
            });
        });
};

export const login = (email, password) => (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({ email, password });

    axios
        .post(`http://${HOST}/api/login/`, body, config)
        .then((res) => {
            dispatch({
                type: LOGIN_SUCCES,
                payload: res.data,
            });
        })
        .catch((err) => {
            // dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL,
            });
        });
};

export const register =
    ({ username, email, password }) =>
    (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({ username, email, password });

        axios
            .post(`http://${HOST}/api/register/`, body, config)
            .then((res) => {
                dispatch({
                    type: REGISTER_SUCCES,
                    payload: res.data,
                });
            })
            .catch((err) => {
                // dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: REGISTER_FAIL,
                });
            });
    };

export const logout = () => (dispatch, getState) => {
    axios
        .post(`http://${HOST}/api/logout/`, null, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: LOGOUT_SUCCES,
            });
            dispatch({
                type: CLEAR_GROUP,
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

//TOKENS CONFIGURATION
export const tokenConfig = (getState) => {
    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
};

export const tokenConfigWithForm = (getState) => {
    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundarydMIgtiA2YeB1Z0kl",
            Accept: "application/json",
            type: "formData",
        },
    };

    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
};