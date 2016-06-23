import api from '../../common/api'

export const GET_ALL_SCHEDULER_SUCCESS = 'GET_ALL_SCHEDULER_SUCCESS';
export const GET_ALL_SCHEDULER_ERROR = 'GET_ALL_SCHEDULER_ERROR';
export const RESET_SCHEDULERLIST = 'RESET_SCHEDULERLIST';
export const RESET_TRIGGER = 'RESET_TRIGGER'
export const EDIT_SCHEDULER_SUCCESS = 'EDIT_SCHEDULER_SUCCESS'
export const EDIT_SCHEDULER_ERROR = 'EDIT_SCHEDULER_ERROR'
export const ADD_SCHEDULER_SUCCESS = 'ADD_SCHEDULER_SUCCESS'
export const ADD_SCHEDULER_ERROR = 'ADD_SCHEDULER_ERROR'

export function getAllScheduler(page,pagesize,taskName) {
    return {
        type: 'GET_ALL_SCHEDULER',
        payload: {
            promise: api.postForm('/web/scheduler/selectAll.tj',{
                data: {
                    page: page,
                    pagesize: pagesize,
                    taskName: taskName
                }
            })
        }
    }
}

export function resetSchedulerList() {
    return {
        type: 'RESET_SCHEDULERLIST'
    }
}

export function editScheduler(id, groupId, taskName, taskType, taskDesc, taskCron, enable) {
	return {
        type: 'EDIT_SCHEDULER',
        payload: {
        	promise: api.postForm('/web/scheduler/updateOne.tj',{
                data: {
                  id: id,
                  groupId : groupId,
                  taskName : taskName,
                  taskType : taskType,
                  taskDesc : taskDesc,
                  taskCron : taskCron,
                  enable : enable
                }
            })
        }
    }
}

export function addScheduler(groupId, taskName, taskType, taskDesc, taskCron, enable) {
    return {
        type: 'ADD_SCHEDULER',
        payload: {
            promise: api.postForm('/web/scheduler/insertOne.tj',{
                data: {
                  groupId: groupId,
                  taskName : taskName,
                  taskType : taskType,
                  taskDesc : taskDesc,
                  taskCron : taskCron,
                  enable : enable
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
