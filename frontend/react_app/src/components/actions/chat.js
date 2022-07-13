import axios from "axios";
import { HOST } from "./allowedhost";

// import { returnErrors } from "./messages";
import { CHAT_LIST, CHAT_MESSAGES, SEND_MESSAGE, NEW_MESSAGE } from "./types";
import { tokenConfig, tokenConfigWithForm } from "./auth";

export const getChatList = () => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

    axios
        .get(`http://${HOST}/api/chat-list/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: CHAT_LIST,
                payload: res.data,
            });
        });
};

export const newMessage = () => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})
    axios
        .get(`http://${HOST}/api/chat-newmessage/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: NEW_MESSAGE,
                payload: res.data,
            });
        });
};

export const getChatMessages = (sender, receiver) => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

    axios
        .get(
            `http://${HOST}/api/messages-Pc/${sender.id}/${receiver}/50/`,
            tokenConfig(getState)
        )
        .then((res) => {
            dispatch({
                type: CHAT_MESSAGES,
                payload: res.data,
            });
        });
};

export const sendMessage =
    (sender, receiver, formdata) => (dispatch, getState) => {
        // dispatch({type: USER_LOADING})
        axios
            .post(
                `http://${HOST}/api/messages-Pc/${sender.id}/${receiver.id}/1/`,
                formdata,
                tokenConfigWithForm(getState)
            )
            .then((res) => {
                dispatch({
                    type: SEND_MESSAGE,
                    payload: res.data,
                });
            });
    };