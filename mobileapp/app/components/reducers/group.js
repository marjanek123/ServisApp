import { LOAD_GROUP, GROUP_FAIL } from "../actions/types.js";

const initialState = {
    group: {},
    isGroup: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case LOAD_GROUP:
            console.log("grupa sie zaladowala");
            return {
                ...state,
                group: action.payload,
                isGroup: true,
            };
        case GROUP_FAIL:
            console.log("nie ma grupy");
            return {
                ...state,
                group: {},
                isGroup: false,
            };
        default:
            return state;
    }
}