/**
 * Created by scott on 6/20/16.
 */

import api from '../../api'

export const GET_KINDERGARTEN_LIST_SUCCESS = 'GET_KINDERGARTEN_LIST_SUCCESS';
export const GET_KINDERGARTEN_LIST_ERROR = 'GET_KINDERGARTEN_LIST_ERROR';
export const RESET_KINDERGARTENLIST = 'RESET_KINDERGARTENLIST';
export const RESET_TRIGGER = 'RESET_TRIGGER';
export const ADD_KINDERGARTEN_SUCCESS = 'ADD_KINDERGARTEN_SUCCESS';
export const ADD_KINDERGARTEN_ERROR = 'ADD_KINDERGARTEN_ERROR';
export const EDIT_KINDERGARTEN_SUCCESS = 'EDIT_KINDERGARTEN_SUCCESS';
export const EDIT_KINDERGARTEN_ERROR = 'EDIT_KINDERGARTEN_ERROR';

export function addKindergarten(name, parentId, available, type, kindergartenId) {
    return {
        type: 'ADD_KINDERGARTEN',
        payload: {
            promise: api.postForm('/web/kindergarten/add.tj',{
                data: {
                    name: name,
                    parentId: parentId,
                    available: available,
                    type: type,
                    kindergartenId: kindergartenId
                }
            })
        }
    }
}


export function getKindergartenList( page, pagesize, name ) {
    return {
        type: 'GET_KINDERGARTEN_LIST',
        payload: {
            promise: api.postForm('/web/kindergarten/selectKindergartenAll.tj',{
                data: {
                    page: page,
                    pagesize: pagesize,
                    name: name
                }
            })
        }
    }
}

export function resetKindergartenList() {
    return {
        type: 'RESET_KINDERGARTENLIST'
    }
}
