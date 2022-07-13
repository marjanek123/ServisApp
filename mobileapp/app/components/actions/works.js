import axios from "axios";
import { HOST } from "./allowedhost";
// import { returnErrors } from "./messages";
import {
    GET_WORKS_LIST,
    GET_WORKS_DETAIL,
    WORKS_DELEATE,
    WORKS_UPDATE,
    WORKS_ADD,
} from "./types";

import { tokenConfig } from "./auth";

export const getWorks = (id) => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

    axios
        .get(`http://${HOST}/api/work-list/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_WORKS_LIST,
                payload: res.data,
            });
        });
};

export const getWorksServisant = (id) => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

    axios
        .get(`http://${HOST}/api/work-list-servisant/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_WORKS_LIST,
                payload: res.data,
            });
        });
};

export const getWorkDetail = (id) => (dispatch, getState) => {
    axios
        .get(`http://${HOST}/api/work-detail/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_WORKS_DETAIL,
                payload: res.data,
            });
        });
};

export const addWork = (body, day) => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

    axios
        .post(`http://${HOST}/api/work-list/`, body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: WORKS_ADD,
                payload: res.data,
            });
        });
};
export const updateWork = (body, id) => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

    axios
        .put(`http://${HOST}/api/work-detail/${id}/`, body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: WORKS_UPDATE,
                payload: res.data,
            });
        });
};
export const deleateWork = (id) => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

    axios
        .delete(`http://${HOST}/api/work-detail/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: WORKS_DELEATE,
                payload: id,
            });
        });
};