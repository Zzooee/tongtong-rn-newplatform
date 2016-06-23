import api from '../common/api'

export const GET_ALL_BIZSERVER = 'GET_ALL_BIZSERVER';
export const GET_ALL_BIZSERVER_SUCCESS = 'GET_ALL_BIZSERVER_SUCCESS';
export const RESET_BIZSERVERLIST = 'RESET_BIZSERVERLIST';
export const RESET_TRIGGER = 'RESET_TRIGGER'
export const ADD_BIZSERVER_SUCCESS = 'ADD_BIZSERVER_SUCCESS'
export const ADD_BIZSERVER_ERROR = 'ADD_BIZSERVER_ERROR'
export const EDIT_BIZSERVER_SUCCESS = 'EDIT_BIZSERVER_SUCCESS'
export const EDIT_BIZSERVER_ERROR = 'EDIT_BIZSERVER_ERROR'

export function getAllBizserver(page,pagesize,name) {
    return {
        type: 'GET_ALL_BIZSERVER',
        payload: {
            promise: api.postForm('/web/bizServer/bizServerAll.tj',{
                data: {
                    page: page,
                    pagesize: pagesize,
                    name: name
                }
            })
        }
    }
}

export function addBizserver(name, readip, readDomain, writeip, writeDomain, description) {
    return {
        type: 'ADD_BIZSERVER',
        payload: {
            promise: api.postForm('/web/bizServer/addBizServer.tj',{
                data: {
                    name: name,
                    readip: readip,
                    readDomain: readDomain,
                    writeip: writeip,
                    writeDomain: writeDomain,
                    description: description
                }
            })
        }
    }
}

export function editBizserver(name, id, readip, readDomain, writeip, writeDomain, description) {
    return {
        type: 'EDIT_BIZSERVER',
        payload: {
            promise: api.postForm('/web/bizServer/updateBizServer.tj',{
                data: {
                    name: name,
                    id: id,
                    readip: readip,
                    readDomain: readDomain,
                    writeip: writeip,
                    writeDomain: writeDomain,
                    description: description
                }
            })
        }
    }
}

export function resetBizserverList() {
    return {
        type: 'RESET_BIZSERVERLIST'
    }
}

export function resetTrigger() {
    return {
        type: 'RESET_TRIGGER'
    }
}
