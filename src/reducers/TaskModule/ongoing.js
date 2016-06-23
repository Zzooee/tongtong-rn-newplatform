import _ from 'lodash';

import {
    GET_ALL_ONGOING_SUCCESS,
    GET_ALL_ONGOING_ERROR,
    RESET_ONGOINGLIST,
    RESET_TRIGGER,
    EXEC_ONGOING_SUCCESS,
    EXEC_ONGOING_ERROR,
    RESUME_ONGOING_SUCCESS,
    RESUME_ONGOING_ERROR
} from '../../actions/TaskModule/ongoing';

const initialState = {
    ongoingList: [],
    triggerStateChange: 1
};

export default function ongoing(state = initialState, action = {}) {
    switch (action.type) {
        case GET_ALL_ONGOING_SUCCESS:
            return Object.assign({}, initialState, {ongoingList: action.payload.body});
        case GET_ALL_ONGOING_ERROR:
            return Object.assign({}, state, {triggerStateChange: 201});
        case RESET_ONGOINGLIST:
            return initialState;
        case EXEC_ONGOING_SUCCESS:
            return Object.assign({}, state, {triggerStateChange: 103});
        case EXEC_ONGOING_ERROR:
            return Object.assign({}, state, {triggerStateChange: 101});
        case RESUME_ONGOING_SUCCESS:
            return Object.assign({}, state, {triggerStateChange: 303});
        case RESUME_ONGOING_ERROR:
            return Object.assign({}, state, {triggerStateChange: 301});
        case RESET_TRIGGER:
            return Object.assign({}, state, {triggerStateChange: 1});
        default:
            return state;
    }
}
