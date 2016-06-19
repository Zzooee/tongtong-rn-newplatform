import _ from 'lodash';

import {
    GET_ALL_DictionaryType_SUCCESS,
    GET_ALL_DictionaryType_ERROR,
    RESET_ALL_DictionaryType,
    ADD_DictionaryType_SUCCESS,
    ADD_DictionaryType_ERROR,
    RESET_TRIGGER
} from '../../actions/AdminModule/dictionaryType';

const initialState = {
    listItems: [],
    triggerStateChange: 1,
    errorMessage:'',
    totals: 0
};

export default function dictionaryType(state = initialState, action = {}) {
    switch (action.type) {
        case GET_ALL_DictionaryType_SUCCESS:
            return Object.assign({}, initialState, {listItems: action.payload.body.Rows,totals: action.payload.body.Total});
        case GET_ALL_DictionaryType_ERROR:
            return Object.assign({}, state, {triggerStateChange: 201});
        case ADD_DictionaryType_SUCCESS:
           var  status = action.payload.body.status;
           var  errorMessage = action.payload.body.errorMessage;
            if(status==='FAIL'){
                return Object.assign({}, state, {triggerStateChange: 3031},{errorMessage:errorMessage});
            }
            if(status==='SUCCESS'){
                return Object.assign({}, state, {triggerStateChange: 3000});
            }
        case ADD_DictionaryType_ERROR:
            return Object.assign({}, state, {triggerStateChange: 201});
        case RESET_ALL_DictionaryType:
            return initialState;
        case RESET_TRIGGER:
            return Object.assign({}, state, {triggerStateChange: 1},{errorMessage:''});
        default:
            return state;
    }
}
