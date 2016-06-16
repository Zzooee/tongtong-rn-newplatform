import _ from 'lodash';

import {
    GET_ALL_ADMIN_SUCCESS,
    GET_ALL_ADMIN_ERROR,
    RESET_ADMINLIST,
    LOCK_ADMIN_SUCCESS,
    RESET_TRIGGER,
    EDIT_ADMIN_SUCCESS,
    EDIT_ADMIN_ERROR,
    ADD_ADMIN_SUCCESS,
    ADD_ADMIN_ERROR,
    DELETE_ADMIN_SUCCESS,
    DELETE_ADMIN_ERROR
} from '../../actions/AdminModule/admin';

const initialState = {
    listItems: [],
    triggerStateChange: 1,
    totals: 0
};

export default function admin(state = initialState, action = {}) {
    switch (action.type) {
        case GET_ALL_ADMIN_SUCCESS:
            return Object.assign({}, initialState, {listItems: action.payload.body.Rows,totals: action.payload.body.Total});
        case GET_ALL_ADMIN_ERROR:
            return Object.assign({}, state, {triggerStateChange: 201});
        case RESET_ADMINLIST:
            return initialState;
        case LOCK_ADMIN_SUCCESS:
            return Object.assign({}, state, {triggerStateChange: 9});
        case EDIT_ADMIN_SUCCESS:
            return Object.assign({}, state, {triggerStateChange: 103});
        case EDIT_ADMIN_ERROR:
            return Object.assign({}, state, {triggerStateChange: 101});
        case ADD_ADMIN_SUCCESS:
            if(action.payload.body.errorMessage){
                return Object.assign({}, state, {triggerStateChange: 3031});
            } else {
                return Object.assign({}, state, {triggerStateChange: 303});
            }
        case ADD_ADMIN_ERROR:
            return Object.assign({}, state, {triggerStateChange: 301});
        case DELETE_ADMIN_SUCCESS:
            return Object.assign({}, state, {triggerStateChange: 403});
        case DELETE_ADMIN_ERROR:
            return Object.assign({}, state, {triggerStateChange: 401});
        case RESET_TRIGGER:
            return Object.assign({}, state, {triggerStateChange: 1});
        default:
            return state;
    }
}
