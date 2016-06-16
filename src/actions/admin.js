import api from '../api'

export const GET_ALL_ADMIN_SUCCESS = 'GET_ALL_ADMIN_SUCCESS';
export const GET_ALL_ADMIN_ERROR = 'GET_ALL_ADMIN_ERROR';
export const RESET_ADMINLIST = 'RESET_ADMINLIST';
export const LOCK_ADMIN_SUCCESS = 'LOCK_ADMIN_SUCCESS';
export const RESET_TRIGGER = 'RESET_TRIGGER'
export const EDIT_ADMIN_SUCCESS = 'EDIT_ADMIN_SUCCESS'
export const EDIT_ADMIN_ERROR = 'EDIT_ADMIN_ERROR'
export const ADD_ADMIN_SUCCESS = 'ADD_ADMIN_SUCCESS'
export const ADD_ADMIN_ERROR = 'ADD_ADMIN_ERROR'
export const DELETE_ADMIN_SUCCESS = 'DELETE_ADMIN_SUCCESS'
export const DELETE_ADMIN_ERROR = 'DELETE_ADMIN_ERROR'

export function getAllAdmin(page,pagesize,username) {
    return {
        type: 'GET_ALL_ADMIN',
        payload: {
            promise: api.postForm('/web/adminUser/getAllAdminUser.tj;',{
                data: {
                    page: page,
                    pagesize: pagesize,
                    username: username
                }
            })
        }
    }
}

export function resetAdminList() {
    return {
        type: 'RESET_ADMINLIST'
    }
}

export function lockAdmin(userid) {
    return {
        type: 'LOCK_ADMIN',
        payload: {
        	promise: api.postForm('/web/adminUser/updatelocked.tj;',{
                data: {
                    id: userid
                }
            })
        }
    }
}

export function editAdmin(userid, username, roleid) {
	return {
        type: 'EDIT_ADMIN',
        payload: {
        	promise: api.postForm('/web/adminUser/update.tj;',{
                data: {
                    adminUserName: username,
                    roleId: roleid,
                    userId: userid
                }
            })
        }
    }
}

export function addAdmin(adminUserName, adminPassword, adminSurePassword, roles,roleId) {
    return {
        type: 'ADD_ADMIN',
        payload: {
            promise: api.postForm('/web/adminUser/add.tj;',{
                data: {
                    adminUserName:adminUserName,
                    adminPassword:adminPassword,
                    adminSurePassword:adminSurePassword,
                    roles:roles,
                    roleId:roleId
                }
            })
        }
    }
}

export function deleteAdmin(ids) {
    return {
        type: 'DELETE_ADMIN',
        payload: {
            promise: api.postForm('/web/adminUser/updateIsDeleted.tj;',{
                data: {
                    ids: ids
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