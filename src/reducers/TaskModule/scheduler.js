import _ from 'lodash';

import {
    GET_ALL_SCHEDULER_SUCCESS,
    GET_ALL_SCHEDULER_ERROR,
    RESET_SCHEDULERLIST,
    RESET_TRIGGER,
    EDIT_SCHEDULER_SUCCESS,
    EDIT_SCHEDULER_ERROR,
    ADD_SCHEDULER_SUCCESS,
    ADD_SCHEDULER_ERROR
} from '../../actions/TaskModule/scheduler';

const initialState = {
    schedulerList: [],
    triggerStateChange: 1,
    totals: 0
};

export default function scheduler(state = initialState, action = {}) {
    switch (action.type) {
        case GET_ALL_SCHEDULER_SUCCESS:
            return Object.assign({}, initialState, {schedulerList: action.payload.body.Rows,totals: action.payload.body.Total});
        case GET_ALL_SCHEDULER_ERROR:
            return Object.assign({}, state, {triggerStateChange: 201});
        case RESET_SCHEDULERLIST:
            return initialState;
        case EDIT_SCHEDULER_SUCCESS:
            return Object.assign({}, state, {triggerStateChange: 103});
        case EDIT_SCHEDULER_ERROR:
            return Object.assign({}, state, {triggerStateChange: 101});
        case ADD_SCHEDULER_SUCCESS:
            return Object.assign({}, state, {triggerStateChange: 303});
        case ADD_SCHEDULER_ERROR:
            return Object.assign({}, state, {triggerStateChange: 301});
        case RESET_TRIGGER:
            return Object.assign({}, state, {triggerStateChange: 1});
        default:
            return state;
    }
}
