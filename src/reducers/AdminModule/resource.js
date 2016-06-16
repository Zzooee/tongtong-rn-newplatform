import _ from 'lodash';

import {
    GET_ALL_RESOURCE_SUCCESS,
    GET_ALL_RESOURCE_ERROR,
    ADD_RESOURCE_SUCCESS,
    ADD_RESOURCE_ERROR,
    EDIT_RESOURCE_SUCCESS,
    EDIT_RESOURCE_ERROR,
    RESET_RESOURCELIST,
    RESET_TRIGGER,
    GET_ALL_RESOURCE_BY_TYPE_SUCCESS,
    GET_ALL_RESOURCE_BY_TYPE_ERROR
} from '../../actions/AdminModule/resource';

const initialState = {
    resourceItems: [],
    triggerStateChange: 1
};

export default function resource(state = initialState, action = {}) {
    switch (action.type) {
        case GET_ALL_RESOURCE_SUCCESS:
            return Object.assign({}, initialState, {resourceItems: action.payload.body.Rows});
        case GET_ALL_RESOURCE_ERROR:
            return Object.assign({}, state, {triggerStateChange: 201});
        case GET_ALL_RESOURCE_BY_TYPE_SUCCESS:
            return Object.assign({}, initialState, {resourceItems: action.payload.body.Rows});
        case GET_ALL_RESOURCE_BY_TYPE_ERROR:
            return Object.assign({}, state, {triggerStateChange: 201});
        case EDIT_RESOURCE_SUCCESS:
            return Object.assign({}, state, {triggerStateChange: 103});
        case EDIT_RESOURCE_ERROR:
            return Object.assign({}, state, {triggerStateChange: 101});
        case ADD_RESOURCE_SUCCESS:
            return Object.assign({}, state, {triggerStateChange: 303});
        case ADD_RESOURCE_ERROR:
            return Object.assign({}, state, {triggerStateChange: 301});
        case RESET_TRIGGER:
            return Object.assign({}, state, {triggerStateChange: 1});
        case RESET_RESOURCELIST:
            return initialState;
        default:
            return state;
    }
}
