import {
    LOGIN_PENDING,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS,
    FETCH_PROFILE,
    RESET_TRIGGER,
    CHANGE_PWD_SUCCESS,
    CHANGE_PWD_ERROR
} from '../actions/user';
import authUtils from '../common/utils/auth';

let initialState = {
    user: null,
    loggingIn: false,
    loggingOut: false,
    loginErrors: null,
    triggerStateChange: 1
};

export default function auth(state = initialState, action = {}) {
    switch (action.type) {
        case LOGIN_PENDING:
            return Object.assign({}, initialState, {loggingIn: true});
        case LOGIN_SUCCESS:
            var tmpuser = eval('('+action.payload.text+')').user;
            var tmpuid = eval('('+action.payload.text+')').uid;
            if(tmpuser == undefined){
                var failmsg = eval('('+action.payload.text+')').message;
                return Object.assign({}, state, {user: tmpuser, loggingIn: false, loginErrors: failmsg});
            } else {
                authUtils.login(tmpuser, tmpuid);
                return Object.assign({}, state, {user: tmpuser, loggingIn: false, loginErrors: null});
            }
        case LOGIN_ERROR:
            return {
                ...state,
                loggingIn: false,
                user: null,
                loginErrors: '请检查用户名或密码'
            };
        case LOGOUT_SUCCESS:
            authUtils.logout()
            return {
                ...state,
                loggingOut: false,
                user: null,
                loginErrors: null
            };
        case CHANGE_PWD_SUCCESS:
            return Object.assign({}, state, {triggerStateChange: 103});
        case CHANGE_PWD_ERROR:
            // if (action.payload.body.errorMessage == 'adminUser is empty'){
            //     return Object.assign({}, state, {triggerStateChange: 1011});    
            // } else if (action.payload.body.errorMessage == 'originalPwd not equals password'){
            //     return Object.assign({}, state, {triggerStateChange: 1012});    
            // } else {
            //     return Object.assign({}, state, {triggerStateChange: 1013}); 
            // }
            return Object.assign({}, state, {triggerStateChange: 1013}); 
        case FETCH_PROFILE:
            if(authUtils.getToken() != null){
                return Object.assign({}, state, {user: authUtils.getToken(), loggingIn: false, loginErrors: null});
            } else {
                return state
            }
        case RESET_TRIGGER:
            return Object.assign({}, state, {triggerStateChange: 1});
        default:
            return state;
    }
}
