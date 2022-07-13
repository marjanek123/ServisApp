import { 
    CREATE_GROUP, 
    CLEAR_GROUP, 
    LOAD_GROUP,
    GROUP_FAIL,
} from "../actions/types.js";

const initialState = {
    group: {},
    isGroup: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_GROUP:
        case LOAD_GROUP:
            return {
                ...state,
                group: action.payload,
                isGroup: true,
            };
        case GROUP_FAIL:
        case CLEAR_GROUP:
            return {
                ...state,
                group: {},
                isGroup: false,
            };
        default:
            return state;
    }
}