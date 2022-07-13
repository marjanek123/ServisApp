import {
    REGISTER_FAIL,
    REGISTER_SUCCES,
    LOGIN_SUCCES,
    LOGIN_FAIL,
    LOGOUT_SUCCES,
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOAD_OTHER_USER,
    RETRIEVE_TOKEN,
    MUST_LOGIN,
} from "../actions/types";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
// import { AsyncStorage } from "react-native";
// const sotre = await SecureStore.getItemAsync("token");
const initialState = {
    token: SecureStore.getItemAsync("token"),
    isAuthenticated: false,
    user: null,
    isLoading: true,
};

export default function(state = initialState, action) {
    switch (action.type) {
        // case RETRIEVE_TOKEN:
        //     SecureStore.setItemAsync("token", action.payload);
        //     return {
        //         ...state,
        //     };
        // case USER_LOADING:
        //     return {
        //         ...state,
        //         isLoading: true,
        //     };
        case LOGIN_SUCCES:
        case REGISTER_SUCCES:
        case USER_LOADED:
            SecureStore.setItemAsync("token", action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            };

            // case LOAD_OTHER_USER:
            //     store.dispatch(loadGroup());
            //     store.dispatch(get_member_user());
            //     return {
            //         ...state,
            //     };
        case MUST_LOGIN:
            return {
                ...state,
                isLoading: false,
            };
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR:
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };
        case LOGOUT_SUCCES:
            SecureStore.deleteItemAsync("token");
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };
        default:
            return state;
    }
}