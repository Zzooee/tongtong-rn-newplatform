import api from '../../common/api'

export const GET_KINDERGARTEN_ALL_SUCCESS = 'GET_KINDERGARTEN_ALL_SUCCESS';
export const GET_KINDERGARTEN_ALL_ERROR = 'GET_KINDERGARTEN_ALL_ERROR';
export const RESET_KINDERGARTEN_ALL = 'RESET_KINDERGARTEN_ALL';
export const ADD_KINDERGARTEN_SUCCESS = 'ADD_KINDERGARTEN_SUCCESS';
export const ADD_KINDERGARTEN_ERROR = 'ADD_KINDERGARTEN_ERROR';
export const EDIT_KINDERGARTEN_SUCCESS = 'EDIT_KINDERGARTEN_SUCCESS';
export const EDIT_KINDERGARTEN_ERROR = 'EDIT_KINDERGARTEN_ERROR';
export const RESET_TRIGGER = 'RESET_TRIGGER';


export function resetKindergartenALL() {
    return {
        type: 'RESET_KINDERGARTEN_ALL'
    }
}

export function resetTrigger() {
    return {
        type: 'RESET_TRIGGER'
    }
}