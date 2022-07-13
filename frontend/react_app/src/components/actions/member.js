import axios from "axios";
import { HOST } from "./allowedhost";

// import { returnErrors } from "./messages";
import {
    GET_MEMBERS,
    GET_INVITE_LIST,
    GET_USERS_LIST,
    MEMBER_USER
   } from "./types";
import { tokenConfig } from "./auth";

export const get_member_user = () => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

    axios
        .get(`http://${HOST}/api/member-user/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: MEMBER_USER,
                payload: res.data,
            });
        });
};

export const getMembers = () => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})
    
    axios.get(`http://${HOST}/api/member-list/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
            type: GET_MEMBERS,
            payload: res.data,
            });
        })
        }

export const getInviteList = () => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})
    
    axios.get(`http://${HOST}/api/invite-list/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
            type: GET_INVITE_LIST,
            payload: res.data,
            });
        })
        }

export const acceptInviteDetail = (id) => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})
    const is_accepted={is_accepted: true};
    axios.patch(`http://${HOST}/api/invite-detail/${id}/ `,is_accepted, tokenConfig(getState))
        
        }

export const searchUsers = (search) => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})
    
    axios.get(`http://${HOST}/api/userlist?search=${search}`, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: GET_USERS_LIST,
                payload: res.data
            })
        })
    }

export const addUserToGroup = (person, group) => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})
    const content = {
        person: person,
        group: group
    }
    axios.post(`http://${HOST}/api/invite-user/`,content, tokenConfig(getState))
    }