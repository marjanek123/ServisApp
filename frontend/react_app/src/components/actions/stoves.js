import axios from "axios";
import { HOST } from "./allowedhost";
// import { returnErrors } from "./messages";
import { GET_STOVE, ADD_STOVE } from "./types";

import { tokenConfig } from "./auth";

export const get_stove = () => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

    axios
        .get(`http://${HOST}/api/stove-list/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_STOVE,
                payload: res.data,
            });
        });
};

export const add_stove = (body) => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

    axios
        .post(`http://${HOST}/api/stove-list/`, body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_STOVE,
                payload: res.data,
            });
        });
};