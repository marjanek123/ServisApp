import axios from "axios";
import { HOST } from "./allowedhost";

// import { returnErrors } from "./messages";
import {
    GET_CLIENTS_DETAIL,
    GET_CLIENTS_DETAIL_EVENT,
    CLIENT_ADD,
    CLEAR_CLIENTS,
    LOAD_CLIENTS,
    CLIENT_DELETE,
    UPDATE_CLIENT,
} from "./types";
import { tokenConfig } from "./auth";

export const getClients = (search, page) => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

    axios
        .get(
            `http://${HOST}/api/clients-list/?search=${search}&page=${page}`,
            tokenConfig(getState)
        )
        .then((res) => {
            dispatch({
                type: LOAD_CLIENTS,
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

export const get_clients_detail_event = (id) => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

    axios
        .get(`http://${HOST}/api/clients-detail/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_CLIENTS_DETAIL_EVENT,
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

export const delete_client = (id) => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

    axios
        .delete(`http://${HOST}/api/clients-detail/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: CLIENT_DELETE,
                payload: id,
            });
        });
};

export const addClient = (client) => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})
    axios.post(`http://${HOST}/api/clients-list/`, client, tokenConfig(getState));
};