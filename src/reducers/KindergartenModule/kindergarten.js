/**
 * Created by scott on 6/20/16.
 */
import _ from 'lodash';

import {
    GET_KINDERGARTEN_LIST_SUCCESS,
    GET_KINDERGARTEN_LIST_ERROR,
    RESET_TRIGGER
} from '../../actions/KindergartenModule/kindergarten';

const initialState =  {
    orgItems: [],
    triggerStateChange: 1,
    totals: 0
}

export default function kindergarten( state = initialState, action = {}) {
    switch (action.type) {
        case GET_KINDERGARTEN_LIST_SUCCESS:
            return Object.assign({}, initialState, {orgItems: action.payload.body.Rows,totals: action.payload.body.Total});
        case GET_KINDERGARTEN_LIST_ERROR:
            return Object.assign({}, state, {triggerStateChange: 801});
        case RESET_TRIGGER:
            return Object.assign({}, state, {triggerStateChange: 1});
        default:
            return state;
    }
}



