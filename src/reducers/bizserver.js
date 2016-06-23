import _ from 'lodash';

import {
    GET_ALL_BIZSERVER_ERROR,
    GET_ALL_BIZSERVER_SUCCESS,
    RESET_BIZSERVERLIST,
    RESET_TRIGGER,
    ADD_BIZSERVER_SUCCESS,
    ADD_BIZSERVER_ERROR,
    EDIT_BIZSERVER_SUCCESS,
    EDIT_BIZSERVER_ERROR,
} from '../actions/bizserver';

const initialState = {
    bizserverItems: [],
    triggerStateChange: 1,
    totals: 0
};

export default function bizserver(state = initialState, action = {}) {
    switch (action.type) {
        case GET_ALL_BIZSERVER_SUCCESS:
            return Object.assign({}, initialState, {bizserverItems: action.payload.body.Rows, totals: action.payload.body.Total});
        case GET_ALL_BIZSERVER_ERROR:
            return Object.assign({}, state, {triggerStateChange: 201});
        case EDIT_BIZSERVER_SUCCESS:
            return Object.assign({}, state, {triggerStateChange: 103});    
        case EDIT_BIZSERVER_ERROR:
            return Object.assign({}, state, {triggerStateChange: 101}); 
        case ADD_BIZSERVER_SUCCESS:
            return Object.assign({}, state, {triggerStateChange: 303});  
        case ADD_BIZSERVER_ERROR:
            return Object.assign({}, state, {triggerStateChange: 301});
        case RESET_BIZSERVERLIST:
            return initialState;
        case RESET_TRIGGER:
            return Object.assign({}, state, {triggerStateChange: 1});
        default:
            return state;
    }
}