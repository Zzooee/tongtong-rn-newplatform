import api from '../../common/api'

export const GET_ALL_TGROUP_SUCCESS = 'GET_ALL_TGROUP_SUCCESS';
export const GET_ALL_TGROUP_ERROR = 'GET_ALL_TGROUP_ERROR';
export const RESET_TGROUPLIST = 'RESET_TGROUPLIST';
export const RESET_TRIGGER = 'RESET_TRIGGER'
export const EDIT_TGROUP_SUCCESS = 'EDIT_TGROUP_SUCCESS'
export const EDIT_TGROUP_ERROR = 'EDIT_TGROUP_ERROR'
export const ADD_TGROUP_SUCCESS = 'ADD_TGROUP_SUCCESS'
export const ADD_TGROUP_ERROR = 'ADD_TGROUP_ERROR'

export function getAllTgroup(page,pagesize,taskName) {
    return {
        type: 'GET_ALL_TGROUP',
        payload: {
            promise: api.postForm('/web/taskGroup/selectAll.tj',{
                data: {
                    page: page,
                    pagesize: pagesize,
                    taskName: taskName
                }
            })
        }
    }
}

export function resetTgroupList() {
    return {
        type: 'RESET_TGROUPLIST'
    }
}

export function editTgroup(id, groupName, groupDesc) {
	return {
        type: 'EDIT_TGROUP',
        payload: {
        	promise: api.postForm('/web/taskGroup/updateOne.tj',{
                data: {
                  id: id,
                  groupName : groupName,
                  groupDesc : groupDesc
                }
            })
        }
    }
}

export function addTgroup(groupName, groupDesc) {
    return {
        type: 'ADD_TGROUP',
        payload: {
            promise: api.postForm('/web/taskGroup/insertOne.tj',{
                data: {
                  groupName: groupName,
                  groupDesc : groupDesc
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
