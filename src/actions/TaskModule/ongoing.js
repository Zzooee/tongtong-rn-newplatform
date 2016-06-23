import api from '../../common/api'

export const GET_ALL_ONGOING_SUCCESS = 'GET_ALL_ONGOING_SUCCESS';
export const GET_ALL_ONGOING_ERROR = 'GET_ALL_ONGOING_ERROR';
export const RESET_ONGOINGLIST = 'RESET_ONGOINGLIST';
export const RESET_TRIGGER = 'RESET_TRIGGER'
export const EXEC_ONGOING_SUCCESS = 'EXEC_ONGOING_SUCCESS'
export const EXEC_ONGOING_ERROR = 'EXEC_ONGOING_ERROR'
export const RESUME_ONGOING_SUCCESS = 'RESUME_ONGOING_SUCCESS'
export const RESUME_ONGOING_ERROR = 'RESUME_ONGOING_ERROR'

export function getAllOngoing() {
    return {
        type: 'GET_ALL_ONGOING',
        payload: {
            promise: api.postForm('/web/scheduled/tasks.tj')
        }
    }
}

export function resetOngoingList() {
    return {
        type: 'RESET_ONGOINGLIST'
    }
}

export function execOngoing(taskGroup, taskName) {
	return {
        type: 'EXEC_ONGOING',
        payload: {
        	promise: api.postForm('/web/scheduled/execTasks.tj',{
                data: {
                  taskGroup: taskGroup,
                  taskName : taskName
                }
            })
        }
    }
}

export function resumeOngoing(taskGroup, taskName, status) {
    return {
        type: 'RESUME_ONGOING',
        payload: {
            promise: api.postForm('/web/scheduled/stopOrResume.tj',{
                data: {
                  taskGroup: taskGroup,
                  taskName : taskName,
                  status : status
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
