import api from '../../common/api'

export const GET_ROLE_LIST_SUCCESS = 'GET_ROLE_LIST_SUCCESS';
export const GET_ROLE_LIST_ERROR = 'GET_ROLE_LIST_ERROR';
export const RESET_ROLELIST = 'RESET_ROLELIST'
export const RESET_TRIGGER = 'RESET_TRIGGER'
export const ADD_ROLE_SUCCESS = 'ADD_ROLE_SUCCESS'
export const ADD_ROLE_ERROR = 'ADD_ROLE_ERROR'
export const EDIT_ROLE_SUCCESS = 'EDIT_ROLE_SUCCESS'
export const EDIT_ROLE_ERROR = 'EDIT_ROLE_ERROR'
export const AUTH_ROLE_SUCCESS = 'AUTH_ROLE_SUCCESS'
export const AUTH_ROLE_ERROR = 'AUTH_ROLE_ERROR'

export function getRoleList(page,pagesize,role) {
    return {
        type: 'GET_ROLE_LIST',
        payload: {
            promise: api.postForm('/web/role/getRoleList.tj',{
                data: {
                    page: page,
                    pagesize: pagesize,
                    role: role
                }
            })
        }
    }
}

export function addRole(roleName, roleDescription, available, type) {
    return {
        type: 'ADD_ROLE',
        payload: {
            promise: api.postForm('/web/role/add.tj;',{
                data: {
                    roleName: roleName,
                    roleDescription: roleDescription,
                    available: available,
                    type: type
                }
            })
        }
    }
}

export function editRole(roleId, roleName, roleDescription, available, type) {
    return {
        type: 'EDIT_ROLE',
        payload: {
            promise: api.postForm('/web/role/updateRole.tj;',{
                data: {
                    roleId: roleId,
                    roleName: roleName,
                    roleDescription: roleDescription,
                    available: available,
                    type: type
                }
            })
        }
    }
}

export function authRole(roleId, resourceIds){
    return {
        type: 'AUTH_ROLE',
        payload: {
            promise: api.postForm('/web/role/authorityEditSave.tj;',{
                data: {
                    roleId: roleId,
                    resourceIds: resourceIds
                }
            })
        }
    }
}

export function resetRoleList() {
    return {
        type: 'RESET_ROLELIST'
    }
}

export function resetTrigger() {
    return {
        type: 'RESET_TRIGGER'
    }
}
