import _ from 'lodash';

import {
    GET_ROLE_LIST_SUCCESS,
    GET_ROLE_LIST_ERROR,
    ADD_ROLE_SUCCESS,
    ADD_ROLE_ERROR,
    EDIT_ROLE_SUCCESS,
    EDIT_ROLE_ERROR,
    RESET_TRIGGER,
    AUTH_ROLE_SUCCESS,
    AUTH_ROLE_ERROR
} from '../actions/rolelist';

const initialState = {
    roleItems: [],
    triggerStateChange: 1,
    totals: 0
}

export default function rolelist(state = initialState, action = {}) {
    switch (action.type) {
        case GET_ROLE_LIST_SUCCESS:
            return Object.assign({}, initialState, {roleItems: action.payload.body.Rows, totals: action.payload.body.Total});
        case GET_ROLE_LIST_ERROR:
            return Object.assign({}, state, {triggerStateChange: 801});
        case EDIT_ROLE_SUCCESS:
            return Object.assign({}, state, {triggerStateChange: 103});    
        case EDIT_ROLE_ERROR:
            return Object.assign({}, state, {triggerStateChange: 101}); 
        case ADD_ROLE_SUCCESS:
            return Object.assign({}, state, {triggerStateChange: 303});  
        case ADD_ROLE_ERROR:
            return Object.assign({}, state, {triggerStateChange: 301});
        case AUTH_ROLE_SUCCESS:
            return Object.assign({}, state, {triggerStateChange: 503});  
        case AUTH_ROLE_ERROR:
            return Object.assign({}, state, {triggerStateChange: 501});
        case RESET_TRIGGER:
            return Object.assign({}, state, {triggerStateChange: 1});
        default:
            return state;
    }
}