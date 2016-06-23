import _ from 'lodash';

import {
    GET_ALL_TGROUP_SUCCESS,
    GET_ALL_TGROUP_ERROR,
    RESET_TGROUPLIST,
    RESET_TRIGGER,
    EDIT_TGROUP_SUCCESS,
    EDIT_TGROUP_ERROR,
    ADD_TGROUP_SUCCESS,
    ADD_TGROUP_ERROR
} from '../../actions/TaskModule/group';

const initialState = {
    tgroupList: [],
    triggerStateChange: 1,
    totals: 0
};

export default function tgroup(state = initialState, action = {}) {
    switch (action.type) {
        case GET_ALL_TGROUP_SUCCESS:
            return Object.assign({}, initialState, {tgroupList: action.payload.body.Rows,totals: action.payload.body.Total});
        case GET_ALL_TGROUP_ERROR:
            return Object.assign({}, state, {triggerStateChange: 201});
        case RESET_TGROUPLIST:
            return initialState;
        case EDIT_TGROUP_SUCCESS:
            return Object.assign({}, state, {triggerStateChange: 103});
        case EDIT_TGROUP_ERROR:
            return Object.assign({}, state, {triggerStateChange: 101});
        case ADD_TGROUP_SUCCESS:
            return Object.assign({}, state, {triggerStateChange: 303});
        case ADD_TGROUP_ERROR:
            return Object.assign({}, state, {triggerStateChange: 301});
        case RESET_TRIGGER:
            return Object.assign({}, state, {triggerStateChange: 1});
        default:
            return state;
    }
}
