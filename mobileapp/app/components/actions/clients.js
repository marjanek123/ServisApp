import axios from "axios";
import { HOST } from "./allowedhost";
// import { returnErrors } from "./messages";
import {
    GET_CLIENTS_LIST,
    ADD_CLIENT,
    UPDATE_CLIENT,
    GET_CLIENTS_DETAIL,
} from "./types";

import { tokenConfig } from "./auth";

export const get_clients_list = (search, page) => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

    axios
        .get(
            `http://${HOST}/api/clients-list?search=${search}&page=${page}`,
            tokenConfig(getState)
        )
        .then((res) => {
            dispatch({
                type: GET_CLIENTS_LIST,
                payload: res.data,
            });
        });
};

export const get_clients_detail = (id) => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

    axios
        .get(`http://${HOST}/api/clients-detail/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_CLIENTS_DETAIL,
                payload: res.data,
            });
        });
};

export const add_client = (data) => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

    axios
        .post(`http://${HOST}/api/clients-list/`, data, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_CLIENT,
                payload: res.data,
            });
        });
};
export const add_client_to_calendar = (data) => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

    axios
        .post(`http://${HOST}/api/clients-list/`, data, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_CLIENT,
                payload: res.data,
            });
            dispatch({
                type: GET_CLIENTS_DETAIL,
                payload: res.data,
            });
        });
};

export const update_client = (data, id) => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

    axios
        .put(
            `http://${HOST}/api/clients-detail/${id}/`,
            data,
            tokenConfig(getState)
        )
        .then((res) => {
            dispatch({
                type: UPDATE_CLIENT,
                payload: res.data,
            });
        });
};