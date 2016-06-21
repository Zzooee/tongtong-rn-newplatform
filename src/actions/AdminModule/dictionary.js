import api from '../../api'

export const GET_ALL_Dictionary_SUCCESS = 'GET_ALL_Dictionary_SUCCESS';
export const GET_ALL_Dictionary_ERROR = 'GET_ALL_Dictionary_ERROR';
export const RESET_ALL_Dictionary = 'RESET_ALL_Dictionary';
export const ADD_Dictionary_SUCCESS = 'ADD_Dictionary_SUCCESS';
export const ADD_Dictionary_ERROR = 'ADD_Dictionary_ERROR';
export const EDIT_Dictionary_SUCCESS = 'EDIT_Dictionary_SUCCESS';
export const EDIT_Dictionary_ERROR = 'EDIT_Dictionary_ERROR';
export const RESET_TRIGGER = 'RESET_TRIGGER'

export function getAllDictionary(page,pagesize,key) {
    return {
        type: 'GET_ALL_Dictionary',
        payload: {
            promise: api.postForm('/web/dictionary/selectDictionaryAll.tj;',{
                data: {
                    page: 1,
                    pagesize: 500,
                    key:key
                }
            })
        }
    }
}
export function addDictionary(dicTypeId,parentId,key,value,sortNo) {
    return {
        type: 'ADD_Dictionary',
        payload: {
            promise: api.postForm('/web/dictionary/add.tj;',{
                data: {
                    dicTypeId: dicTypeId,
                    parentId: parentId,
                    key: key,
                    value: value,
                    sortNo: sortNo
                }
            })
        }
    }
}
export function editDictionary(id,dicTypeId,parentId,key,value,sortNo) {
    return {
        type: 'EDIT_Dictionary',
        payload: {
            promise: api.postForm('/web/dictionary/update.tj;',{
                data: {
                    id: id,
                    dicTypeId: dicTypeId,
                    parentId: parentId,
                    key: key,
                    value: value,
                    sortNo: sortNo
                }
            })
        }
    }
}

export function resetAllDictionary() {
    return {
        type: 'RESET_ALL_Dictionary'
    }
}

export function resetTrigger() {
	return {
		type: 'RESET_TRIGGER'
	}
}
