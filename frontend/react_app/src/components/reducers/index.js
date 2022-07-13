import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import group from "./group";
import member from "./member";
import chat from "./chat";
import calendar from "./calendar";
import clients from "./clients";
import stoves from "./stoves";
export default combineReducers({
    auth,
    group,
    member,
    chat,
    calendar,
    clients,
    stoves,
});