import axios from "axios";
import { tokenConfig } from "./auth";
import { CREATE_GROUP, GROUP_FAIL, LOAD_GROUP } from "./types";
// import { addAdminMember } from "./member";
import { HOST } from "./allowedhost";

export const createGroup = (group) => (dispatch, getState) => {
    axios
        .post(`http://${HOST}/api/create-group/`, group, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: CREATE_GROUP,
                payload: res.data,
            });
            //   console.log(res.data.person)
            axios.post(
                `http://${HOST}/api/invite-admin-to-group/`,
                res.data,
                tokenConfig(getState)
            );
        })
        .catch((err) => {
            dispatch({
                type: GROUP_FAIL,
            });
        });
};
export const loadGroup = () => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

    // axios
    //   .get("http://127.0.0.1/api/get-group/", tokenConfig(getState))
    //   .then((res) => {
    //     dispatch({
    //       type: LOAD_GROUP,
    //       payload: res.data,
    //     });
    //   })
    //   .catch((err) => {
    //     dispatch({
    //       type: GROUP_FAIL,
    //     });
    //   });
    axios
        .get(`http://${HOST}/api/get-groupbymember/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: LOAD_GROUP,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: GROUP_FAIL,
            });
        });
};

export const loadListGroups = () => (dispatch, getState) => {
    // dispatch({type: USER_LOADING})

    axios
        .get(`http://${HOST}/api/get-group/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: LOAD_GROUP,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: GROUP_FAIL,
            });
        });
};