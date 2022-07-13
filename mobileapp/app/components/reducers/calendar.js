import {
    LOAD_CALENDAR,
    LOAD_CALENDAR_DAILY,
    CLEAR_CALENDAR_DAILY,
    CLEAR_CALENDAR,
    GET_EVENT,
    GET_CLIENT_EVENTS,
    CLEAR_CLIENT_EVENTS,
    LOADING_CLIENT_EVENTS,
    UPDATE_EVENT,
    DELEATE_EVENT,
    NEW_EVENT_ON_MON,
    NEW_EVENT_ON_TUE,
    NEW_EVENT_ON_WED,
    NEW_EVENT_ON_THU,
    NEW_EVENT_ON_FRI,
    CLEAR_EVENT,
} from "../actions/types.js";

const sort_events = (tablica) => {
    tablica.sort(function(obj1, obj2) {
        // Ascending: first age less than the previous
        const objk = new Date(
            ...[...obj1.data_wizyty.split("-"), ...obj1.godzina_wizyty.split(":")]
        );
        const objc = new Date(
            ...[...obj2.data_wizyty.split("-"), ...obj2.godzina_wizyty.split(":")]
        );
        return objk >= objc;
    });
    return tablica;
};

const initialState = {
    // the: null,

    format_day: {
        events: [],
        day: null,
    },
    event_detail: {},
    loading_client_events: false,
    clients_events: [],

    mon: {
        events: [],
        day: null,
    },
    tue: {
        events: [],
        day: null,
    },
    wed: {
        events: [],
        day: null,
    },
    thu: {
        events: [],
        day: null,
    },
    fri: {
        events: [],
        day: null,
    },
};

export default function(state = initialState, action) {
    switch (action.type) {
        case LOADING_CLIENT_EVENTS:
            return {
                ...state,
                loading_client_events: true,
            };
        case CLEAR_CALENDAR_DAILY:
            return {
                ...state,
                format_day: {
                    events: [],
                    day: null,
                },
            };
        case LOAD_CALENDAR_DAILY:
            return {
                ...state,
                ...action.payload,
            };
        case GET_EVENT:
            return {
                ...state,
                event_detail: action.payload,
            };
        case GET_CLIENT_EVENTS:
            return {
                ...state,
                loading_client_events: false,
                clients_events: action.payload,
            };
        case CLEAR_CLIENT_EVENTS:
            return {
                ...state,
                loading_client_events: false,
                clients_events: [],
            };

        case NEW_EVENT_ON_MON:
            return {
                ...state,
                mon: {
                    events: sort_events([...state.mon.events, action.payload]),
                    day: state.mon.day,
                },
            };
        case NEW_EVENT_ON_TUE:
            return {
                ...state,
                tue: {
                    events: sort_events([...state.tue.events, action.payload]),
                    day: state.tue.day,
                },
            };
        case NEW_EVENT_ON_WED:
            return {
                ...state,
                wed: {
                    events: sort_events([...state.wed.events, action.payload]),
                    day: state.wed.day,
                },
            };
        case NEW_EVENT_ON_THU:
            return {
                ...state,
                thu: {
                    events: sort_events([...state.thu.events, action.payload]),
                    day: state.thu.day,
                },
            };
        case NEW_EVENT_ON_FRI:
            return {
                ...state,
                fri: {
                    events: sort_events([...state.fri.events, action.payload]),
                    day: state.fri.day,
                },
            };
        case LOAD_CALENDAR:
            return {
                ...state,
                ...action.payload,
            };
        case CLEAR_EVENT:
            return {
                ...state,
                event_detail: {},
            };
        case CLEAR_CALENDAR:
            return {
                ...state,
                mon: {
                    events: [],
                    day: null,
                },
                tue: {
                    events: [],
                    day: null,
                },
                wed: {
                    events: [],
                    day: null,
                },
                thu: {
                    events: [],
                    day: null,
                },
                fri: {
                    events: [],
                    day: null,
                },
                sat: {
                    events: [],
                    day: null,
                },
                sun: {
                    events: [],
                    day: null,
                },
            };
        case DELEATE_EVENT:
            return {
                ...state,
                mon: {
                    events: state.mon.events.filter(
                        (event) => event.id !== action.payload
                    ),
                    day: state.mon.day,
                },
                tue: {
                    events: state.tue.events.filter(
                        (event) => event.id !== action.payload
                    ),
                    day: state.tue.day,
                },
                wed: {
                    events: state.wed.events.filter(
                        (event) => event.id !== action.payload
                    ),
                    day: state.wed.day,
                },
                thu: {
                    events: state.thu.events.filter(
                        (event) => event.id !== action.payload
                    ),
                    day: state.thu.day,
                },
                fri: {
                    events: state.fri.events.filter(
                        (event) => event.id !== action.payload
                    ),
                    day: state.fri.day,
                },
                sat: {
                    events: [],
                    day: state.sat.day,
                },
                sun: {
                    events: [],
                    day: state.sun.day,
                },
            };
        case UPDATE_EVENT:
            console.log(action.payload);
            return {
                ...state,
                format_day: {
                    events: sort_events(
                        state.format_day.events.map((event) => {
                            if (event.id == action.payload.id) {
                                return action.payload;
                            } else {
                                return event;
                            }
                        })
                    ),
                    day: state.format_day.day,
                },
                mon: {
                    events: sort_events(
                        state.mon.events.map((event) => {
                            if (event.id == action.payload.id) {
                                return action.payload;
                            } else {
                                return event;
                            }
                        })
                    ),
                    day: state.mon.day,
                },
                tue: {
                    events: sort_events(
                        state.tue.events.map((event) => {
                            if (event.id == action.payload.id) {
                                return action.payload;
                            } else {
                                return event;
                            }
                        })
                    ),
                    day: state.tue.day,
                },
                wed: {
                    events: sort_events(
                        state.wed.events.map((event) => {
                            if (event.id == action.payload.id) {
                                return action.payload;
                            } else {
                                return event;
                            }
                        })
                    ),
                    day: state.wed.day,
                },
                thu: {
                    events: sort_events(
                        state.thu.events.map((event) => {
                            if (event.id == action.payload.id) {
                                return action.payload;
                            } else {
                                return event;
                            }
                        })
                    ),
                    day: state.thu.day,
                },
                fri: {
                    events: sort_events(
                        state.fri.events.map((event) => {
                            if (event.id == action.payload.id) {
                                return action.payload;
                            } else {
                                return event;
                            }
                        })
                    ),
                    day: state.fri.day,
                },
                sat: {
                    events: [],
                    day: state.sat.day,
                },
                sun: {
                    events: [],
                    day: state.sun.day,
                },
            };
            // case NEW_EVENT_ON_MON:
            //     return {
            //         ...state,
            //         mon: {
            //             events: sort_dates(...state.mon.events, action.payload),
            //         },
            //     };
        default:
            return state;
    }
}