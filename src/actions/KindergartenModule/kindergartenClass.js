import api from '../../common/api';

export const GET_KINDERGARTEN_CLASS_SUCCESS = 'GET_KINDERGARTEN_CLASS_SUCCESS';
export const GET_KINDERGARTEN_CLASS_ERROR = 'GET_KINDERGARTEN_CLASS_ERROR';
export const RESET_KINDERGARTEN_CLASS = 'RESET_KINDERGARTEN_CLASS';
export const ADD_KINDERGARTEN_CLASS_SUCCESS = 'ADD_KINDERGARTEN_CLASS_SUCCESS';
export const ADD_KINDERGARTEN_CLASS_ERROR = 'ADD_KINDERGARTEN_CLASS_ERROR';
export const EDIT_KINDERGARTEN_CLASS_SUCCESS = 'EDIT_KINDERGARTEN_CLASS_SUCCESS';
export const EDIT_KINDERGARTEN_CLASS_ERROR = 'EDIT_KINDERGARTEN_CLASS_ERROR';
export const RESET_TRIGGER = 'RESET_TRIGGER';

export function selectKindergartenClassAll(page,pagesize){
    return{
        type:'GET_KINDERGARTEN_CLASS',
        payload:{
            promise:api.postForm('/web/kindergartenClass/selectKindergartenClassAll.tj;',{
                data:{
                    page:page,
                    pagesize:pagesize
                }
            })
        }
    }
}

export function addKindergartenClass(className,kindergartenId,gradeId,sortNo){
    return {
        type:'ADD_KINDERGARTEN_CLASS',
        payload:{
            promise:api.postForm('/web/kindergartenClass/add.tj;',{
                data:{
                    className:className,
                    kindergartenId:kindergartenId,
                    gradeId:gradeId,
                    sortNo:sortNo
                }
            })
        }
    }
}

export function editKindergartenClass(id,className,kindergartenId,gradeId,sortNo){
    return {
        type:'EDIT_KINDERGARTEN_CLASS',
        payload:{
            promise:api.postForm('/web/kindergartenClass/update.tj;',{
                data:{
                    id:id,
                    className:className,
                    kindergartenId:kindergartenId,
                    gradeId:gradeId,
                    sortNo:sortNo
                }
            })
        }
    }
}

export function resetKindergartenClass() {
    return {
        type: 'RESET_KINDERGARTEN_CLASS'
    }
}

export function resetTrigger() {
    return {
        type: 'RESET_TRIGGER'
    }
}



