import api from '../../common/api'

export const GET_ORGANIZATION_LIST_SUCCESS = 'GET_ORGANIZATION_LIST_SUCCESS';
export const GET_ORGANIZATION_LIST_ERROR = 'GET_ORGANIZATION_LIST_ERROR';
export const RESET_ORGANIZATIONLIST = 'RESET_ORGANIZATIONLIST'
export const RESET_TRIGGER = 'RESET_TRIGGER'
export const ADD_ORGANIZATION_SUCCESS = 'ADD_ORGANIZATION_SUCCESS'
export const ADD_ORGANIZATION_ERROR = 'ADD_ORGANIZATION_ERROR'
export const EDIT_ORGANIZATION_SUCCESS = 'EDIT_ORGANIZATION_SUCCESS'
export const EDIT_ORGANIZATION_ERROR = 'EDIT_ORGANIZATION_ERROR'

export function getOrganizationList(page,pagesize,name) {
    return {
        type: 'GET_ORGANIZATION_LIST',
        payload: {
            promise: api.postForm('/web/adminOrganization/getAll.tj',{
                data: {
                    page: page,
                    pagesize: pagesize,
                    name: name
                }
            })
        }
    }
}

export function addOrganization(name, parentId, available, type, kindergartenId) {
    return {
        type: 'ADD_ORGANIZATION',
        payload: {
            promise: api.postForm('/web/adminOrganization/add.tj;',{
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

export function editOrganization(id, name, parentId, available, type, kindergartenId) {
    return {
        type: 'EDIT_ORGANIZATION',
        payload: {
            promise: api.postForm('/web/adminOrganization/update.tj;',{
                data: {
                    id: id,
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

export function resetOrganizationList() {
    return {
        type: 'RESET_ORGANIZATIONLIST'
    }
}

export function resetTrigger() {
    return {
        type: 'RESET_TRIGGER'
    }
}
