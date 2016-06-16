import _ from 'lodash';

import {
    GET_ORGANIZATION_LIST_SUCCESS,
    GET_ORGANIZATION_LIST_ERROR,
    ADD_ORGANIZATION_SUCCESS,
    ADD_ORGANIZATION_ERROR,
    EDIT_ORGANIZATION_SUCCESS,
    EDIT_ORGANIZATION_ERROR,
    RESET_TRIGGER
} from '../../actions/AdminModule/organization';

const initialState = {
    orgItems: [],
    triggerStateChange: 1,
    totals: 0
}

export default function organization(state = initialState, action = {}) {
    switch (action.type) {
        case GET_ORGANIZATION_LIST_SUCCESS:
            return Object.assign({}, initialState, {orgItems: action.payload.body.Rows, totals: action.payload.body.Total});
        case GET_ORGANIZATION_LIST_ERROR:
            return Object.assign({}, state, {triggerStateChange: 801});
        case EDIT_ORGANIZATION_SUCCESS:
            return Object.assign({}, state, {triggerStateChange: 103});
        case EDIT_ORGANIZATION_ERROR:
            return Object.assign({}, state, {triggerStateChange: 101});
        case ADD_ORGANIZATION_SUCCESS:
            return Object.assign({}, state, {triggerStateChange: 303});
        case ADD_ORGANIZATION_ERROR:
            return Object.assign({}, state, {triggerStateChange: 301});
        case RESET_TRIGGER:
            return Object.assign({}, state, {triggerStateChange: 1});
        default:
            return state;
    }
}
