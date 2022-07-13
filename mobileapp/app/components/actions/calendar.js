import axios from "axios";
import { HOST } from "./allowedhost";
// import { returnErrors } from "./messages";
import {
    LOAD_CALENDAR,
    LOAD_CALENDAR_DAILY,
    GET_EVENT,
    ADD_EVENT,
    GET_CLIENT_EVENTS,
    LOADING_CLIENT_EVENTS,
    UPDATE_EVENT,
    DELEATE_EVENT,
    NEW_EVENT_ON_MON,
    NEW_EVENT_ON_TUE,
    NEW_EVENT_ON_WED,
    NEW_EVENT_ON_THU,
    NEW_EVENT_ON_FRI,
    GET_CLIENTS_DETAIL,
} from "./types";
import { tokenConfig } from "./auth";
const tabEvents = [
    NEW_EVENT_ON_MON,
    NEW_EVENT_ON_TUE,
    NEW_EVENT_ON_WED,
    NEW_EVENT_ON_THU,
    NEW_EVENT_ON_FRI,
];
export const getCalendar =
    (servisant, next_week, prev_week) => (dispatch, getState) => {
        // dispatch({type: USER_LOADING})

        axios
            .get(
                `http://${HOST}/api/calendar/${servisant}/${next_week}/${prev_week}/`,
                tokenConfig(getState)
            )
            .then((res) => {
                dispatch({
                    type: LOAD_CALENDAR,
                    payload: res.data,
                });
            });
    };
export const getCalendarDaily = () => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

    axios
        .get(`http://${HOST}/api/calendar/daily/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: LOAD_CALENDAR_DAILY,
                payload: res.data,
            });
        });
};

export const getEvent = (id) => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

    axios
        .get(`http://${HOST}/api/visits-detail/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_EVENT,
                payload: res.data,
            });
            dispatch({
                type: GET_CLIENTS_DETAIL,
                payload: res.data.client,
            });
        });
};
export const getClientEvents = (client) => (dispatch, getState) => {
    dispatch({ type: LOADING_CLIENT_EVENTS });

    axios
        .get(`http://${HOST}/api/clients-events/${client}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_CLIENT_EVENTS,
                payload: res.data,
            });
        });
};

export const addEvent = (body, day) => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

    axios
        .post(`http://${HOST}/api/visits-list/`, body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: tabEvents[day],
                payload: res.data,
            });
        });
};
export const updateEvent = (body, id) => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

    axios
        .put(`http://${HOST}/api/visits-detail/${id}/`, body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: UPDATE_EVENT,
                payload: res.data,
            });
        });
};
export const deleateEvent = (id) => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

    axios
        .delete(`http://${HOST}/api/visits-detail/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELEATE_EVENT,
                payload: id,
            });
        });
};