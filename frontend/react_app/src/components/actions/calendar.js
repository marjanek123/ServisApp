import axios from "axios";
import { HOST } from "./allowedhost";

// import { returnErrors } from "./messages";
import {
    CLEAR_CALENDAR,
    GET_EVENT,
    LOAD_CALENDAR,
    LOAD_CALENDAR_DAILY,
    NEW_EVENT_ON_MON,
    NEW_EVENT_ON_TUE,
    NEW_EVENT_ON_WED,
    NEW_EVENT_ON_THU,
    NEW_EVENT_ON_FRI,
    GET_CLIENTS_DETAIL_EVENT,
    DELEATE_EVENT,
    UPDATE_EVENT_FORMAT_DAY,
    UPDATE_EVENT,
    GET_CLIENT_EVENTS,
} from "./types";
import { tokenConfig } from "./auth";

const tabEvents = [
    NEW_EVENT_ON_MON,
    NEW_EVENT_ON_TUE,
    NEW_EVENT_ON_WED,
    NEW_EVENT_ON_THU,
    NEW_EVENT_ON_FRI,
];
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
export const getClientEvents = (client) => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

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
                type: GET_CLIENTS_DETAIL_EVENT,
                payload: res.data.client,
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
export const updateEventFormatDay = (body, id) => (dispatch, getState) => {
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