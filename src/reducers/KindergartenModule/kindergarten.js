/**
 * Created by qujian on 2016/6/20.
 */
import {
    GET_ALL_Kindergarten_SUCCESS,
    GET_ALL_Kindergarten_ERROR,
    RESET_ALL_Kindergarten,
    ADD_ALL_Kindergarten_SUCCESS,
    ADD_ALL_Kindergarten_ERROR,
    EDIT_ALL_Kindergarten_SUCCESS,
    EDIT_ALL_Kindergarten_ERROR,
    RESET_TRIGGER
} from '../../actions/KindergartenModule/kindergarten';

const initialState = {
    listItems: [],
    triggerStateChange: 1,
    errorMessage:'',
    totals: 0
};

export default function kindergarten(state = initialState, action = {}) {
    if(action.payload && action.payload.body && action.payload.body.status){
        var  status = action.payload.body.status;
        var  errorMessage = action.payload.body.errorMessage;
    }
    switch (action.type) {
        case GET_ALL_Kindergarten_SUCCESS:
            return Object.assign({}, initialState, {listItems: action.payload.body.Rows,totals: action.payload.body.Total});
        case GET_ALL_Kindergarten_ERROR:
            return Object.assign({}, state, {triggerStateChange: 201});
        case ADD_ALL_Kindergarten_SUCCESS:
            if(status==='FAIL'){
                return Object.assign({}, state, {triggerStateChange: 3500},{errorMessage:errorMessage});
            }
            if(status==='SUCCESS'){
                return Object.assign({}, state, {triggerStateChange: 3000});
            }
        case ADD_ALL_Kindergarten_ERROR:
            return Object.assign({}, state, {triggerStateChange: 3501});
        case EDIT_ALL_Kindergarten_SUCCESS:
            if(status==='FAIL'){
                return Object.assign({}, state, {triggerStateChange: 6500},{errorMessage:errorMessage});
            }
            if(status==='SUCCESS'){
                return Object.assign({}, state, {triggerStateChange: 6200});
            }
        case EDIT_ALL_Kindergarten_ERROR:
            return Object.assign({}, state, {triggerStateChange: 6501});
        case RESET_ALL_Kindergarten:
            return initialState;
        case RESET_TRIGGER:
            return Object.assign({}, state, {triggerStateChange: 1},{errorMessage:''});
        default:
            return state;
    }
}