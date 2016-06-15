import api from '../api'

export const FETCH_PROFILE = 'FETCH_PROFILE';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const CHANGE_PWD_SUCCESS = 'CHANGE_PWD_SUCCESS';
export const CHANGE_PWD_ERROR = 'CHANGE_PWD_ERROR';
export const RESET_TRIGGER = 'RESET_TRIGGER'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function fetchProfile() {
    return {
        type: 'FETCH_PROFILE'
    }
}

export function login(user, password) {
    return {
        type: 'LOGIN',
        payload: {
            promise: api.postForm('/web/adminUser/login.tj;',{
                data: {
                    username:user,
                    password:password
                }
            })
        }
    }
}

export function logout() {
    return {
        type: 'LOGOUT',
        payload: {
            promise: api.postForm('/web/adminUser/logout.tj;')
        }
    }
}

export function changePwd(id, originalPwd, password){
    return {
        type: 'CHANGE_PWD',
        payload: {
            promise: api.postForm('/web/adminUser/updatePwd.tj',{
                data: {
                    id:id,
                    originalPwd:originalPwd,
                    password: password
                }
            })
        }
    }
}

export function resetTrigger() {
    return {
        type: 'RESET_TRIGGER'
    }
}