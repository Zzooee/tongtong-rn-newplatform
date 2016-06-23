
import {
    GET_KINDERGARTEN_CLASS_SUCCESS,
    GET_KINDERGARTEN_CLASS_ERROR,
    RESET_KINDERGARTEN_CLASS,
    ADD_KINDERGARTEN_CLASS_SUCCESS,
    ADD_KINDERGARTEN_CLASS_ERROR,
    EDIT_KINDERGARTEN_CLASS_SUCCESS,
    EDIT_KINDERGARTEN_CLASS_ERROR,
    RESET_TRIGGER
} from '../../actions/KindergartenModule/kindergartenClass';

const initialState = {
    listItems: [],
    triggerStateChange: 1,
    errorMessage:'',
    totals: 0
}

export default function kindergartenClass(state = initialState, action = {}) {
    if(action.payload && action.payload.body && action.payload.body.status){
        var  status = action.payload.body.status;
        var  errorMessage = action.payload.body.errorMessage;
    }
    switch (action.type) {
        case GET_KINDERGARTEN_CLASS_SUCCESS:
            return Object.assign({}, initialState, {listItems: action.payload.body.Rows,totals: action.payload.body.Total});
        case GET_KINDERGARTEN_CLASS_ERROR:
            return Object.assign({}, state, {triggerStateChange: 201});
        case ADD_KINDERGARTEN_CLASS_SUCCESS:
            if(status==='FAIL'){return Object.assign({}, state, {triggerStateChange: 3500},{errorMessage:errorMessage});}
            if(status==='SUCCESS'){return Object.assign({}, state, {triggerStateChange: 3000});}
        case ADD_KINDERGARTEN_CLASS_ERROR:
            return Object.assign({}, state, {triggerStateChange: 3501});
        case EDIT_KINDERGARTEN_CLASS_SUCCESS:
            if(status==='FAIL'){return Object.assign({}, state, {triggerStateChange: 6500},{errorMessage:errorMessage});}
            if(status==='SUCCESS'){return Object.assign({}, state, {triggerStateChange: 6200});}
        case EDIT_KINDERGARTEN_CLASS_ERROR:
            return Object.assign({}, state, {triggerStateChange: 6501});
        case RESET_KINDERGARTEN_CLASS:
            return initialState;
        case RESET_TRIGGER:
            return Object.assign({}, state, {triggerStateChange: 1},{errorMessage:''});
        default:
            return state;
    }
};





