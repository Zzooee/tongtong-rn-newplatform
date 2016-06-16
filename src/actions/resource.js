import api from '../api'

export const GET_ALL_RESOURCE_SUCCESS = 'GET_ALL_RESOURCE_SUCCESS';
export const GET_ALL_RESOURCE_ERROR = 'GET_ALL_RESOURCE_ERROR'
export const RESET_RESOURCELIST = 'RESET_RESOURCELIST';
export const RESET_TRIGGER = 'RESET_TRIGGER'
export const ADD_RESOURCE_SUCCESS = 'ADD_RESOURCE_SUCCESS';
export const ADD_RESOURCE_ERROR = 'ADD_RESOURCE_ERROR';
export const EDIT_RESOURCE_SUCCESS = 'EDIT_RESOURCE_SUCCESS';
export const EDIT_RESOURCE_ERROR = 'EDIT_RESOURCE_ERROR';
export const GET_ALL_RESOURCE_BY_TYPE_SUCCESS = 'GET_ALL_RESOURCE_BY_TYPE_SUCCESS';
export const GET_ALL_RESOURCE_BY_TYPE_ERROR = 'GET_ALL_RESOURCE_BY_TYPE_ERROR'

export function getAllResource(page, pagesize, name) {
    return {
        type: 'GET_ALL_RESOURCE',
        payload: {
            promise: api.postForm('/web/resource/getAdminResource.tj;',{
                data: {
                    page: 1,
                    pagesize: 100,
                    name: name
                }
            })
        }
    }
}

export function getAllResourceByType(type) {
    return {
        type: 'GET_ALL_RESOURCE_BY_TYPE',
        payload: {
            promise: api.postForm('/web/resource/getResourceByType.tj',{
                data: {
                    type: type
                }
            })
        }
    }
}

export function addResource(name, type, url, routeUrl, iconType, available, parentId, permission, property){
    return {
        type: 'ADD_RESOURCE',
        payload: {
            promise: api.postForm('/web/resource/add.tj;',{
                data: {
                    name: name,
                    type: type,
                    url: url,
                    routeUrl: routeUrl,
                    available: available,
                    parentId: parentId,
                    permission: permission,
                    iconType: iconType,
                    property: property
                }
            })
        }
    }
}

export function editResource(resourceId, name, type, url, routeUrl, iconType, available, parentId, permission, userId, property){
    return {
        type: 'EDIT_RESOURCE',
        payload: {
            promise: api.postForm('/web/resource/updateResource.tj;',{
                data: {
                    resourceId: resourceId,
                    name: name,
                    type: type,
                    url: url,
                    routeUrl: routeUrl,
                    available: available,
                    parentId: parentId,
                    permission: permission,
                    userId: userId,
                    iconType: iconType,
                    property: property
                }
            })
        }
    }
}

export function resetResourceList() {
    return {
        type: 'RESET_RESOURCELIST'
    }
}

export function resetTrigger() {
    return {
        type: 'RESET_TRIGGER'
    }
}
