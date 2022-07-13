import {
    GET_MEMBERS,
    GET_INVITE_LIST,
    GET_USERS_LIST,
    MEMBER_USER,
    UPDATE_MEMBER,
} from "../actions/types.js";

const initialState = {
    member_user: {},
    members: [],
    invite_list: [],
    search_user_list: [],
    invite_detail: {},
};

export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_MEMBER:
            return {
                ...state,
                members: state.members.map((member) => {
                    if (member.id == action.payload.id) {
                        return action.payload;
                    } else {
                        return member;
                    }
                }),
            };
        case MEMBER_USER:
            return {
                ...state,
                member_user: action.payload,
            };
        case GET_MEMBERS:
            return {
                ...state,
                members: action.payload,
            };
        case GET_INVITE_LIST:
            return {
                ...state,
                invite_list: action.payload,
            };
        case GET_USERS_LIST:
            return {
                ...state,
                search_user_list: action.payload,
            };

        default:
            return state;
    }
}