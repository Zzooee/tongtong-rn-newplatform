import api from '../../common/api'

export const GET_ALL_DictionaryType_SUCCESS = 'GET_ALL_DictionaryType_SUCCESS';
export const GET_ALL_DictionaryType_ERROR = 'GET_ALL_DictionaryType_ERROR';
export const RESET_ALL_DictionaryType = 'RESET_ALL_DictionaryType';
export const ADD_DictionaryType_SUCCESS = 'ADD_DictionaryType_SUCCESS';
export const ADD_DictionaryType_ERROR = 'ADD_DictionaryType_ERROR';
export const EDIT_DictionaryType_SUCCESS = 'EDIT_DictionaryType_SUCCESS';
export const EDIT_DictionaryType_ERROR = 'EDIT_DictionaryType_ERROR';
export const RESET_TRIGGER = 'RESET_TRIGGER'

export function getAllDictionaryType(page,pagesize,key) {
    return {
        type: 'GET_ALL_DictionaryType',
        payload: {
            promise: api.postForm('/web/dictionaryType/selectDictionaryTypeAll.tj;',{
                data: {
                    page: page,
                    pagesize: pagesize,
                    key:key
                }
            })
        }
    }
}
export function addDictionaryType(key,name,des) {
    return {
        type: 'ADD_DictionaryType',
        payload: {
            promise: api.postForm('/web/dictionaryType/add.tj;',{
                data: {
                    key: key,
                    name: name,
                    directions: des
                }
            })
        }
    }
}
export function editDictionaryType(id,key,name,des) {
    return {
        type: 'EDIT_DictionaryType',
        payload: {
            promise: api.postForm('/web/dictionaryType/update.tj;',{
                data: {
                    id: id,
                    key: key,
                    name: name,
                    directions: des
                }
            })
        }
    }
}

export function resetAllDictionaryType() {
    return {
        type: 'RESET_ALL_DictionaryType'
    }
}

export function resetTrigger() {
	return {
		type: 'RESET_TRIGGER'
	}
}
