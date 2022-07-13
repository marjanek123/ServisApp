import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import group from "./group";
import chat from "./chat";
import calendar from "./calendar";
import member from "./member";
import clients from "./clients";
import stove from "./stove";
import works from "./works";
export default combineReducers({
    auth,
    group,
    chat,
    member,
    calendar,
    clients,
    stove,
    works,
});