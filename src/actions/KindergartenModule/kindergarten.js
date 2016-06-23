/**
 * Created by qujian on 2016/6/20.
 */
import api from '../../common/api'

export const GET_ALL_Kindergarten_SUCCESS = 'GET_ALL_Kindergarten_SUCCESS';
export const GET_ALL_Kindergarten_ERROR = 'GET_ALL_Kindergarten_ERROR';
export const RESET_ALL_Kindergarten = 'RESET_ALL_Kindergarten';
export const ADD_ALL_Kindergarten_SUCCESS = 'ADD_ALL_Kindergarten_SUCCESS';
export const ADD_ALL_Kindergarten_ERROR = 'ADD_ALL_Kindergarten_ERROR';
export const EDIT_ALL_Kindergarten_SUCCESS = 'EDIT_ALL_Kindergarten_SUCCESS';
export const EDIT_ALL_Kindergarten_ERROR = 'EDIT_ALL_Kindergarten_ERROR';
export const RESET_TRIGGER = 'RESET_TRIGGER'


export function selectKindergartenAll(page,pagesize){
    return {
        type:'GET_ALL_Kindergarten',
        payload:{
            promise:api.postForm('/web/kindergarten/selectKindergartenAll.tj;',{
                data:{
                    page:page,
                    pagesize:pagesize
                }
            })
        }
    }
}


export function addKindergarten(name,pinyin,level,nature,type,phone,street,address,status,upGradeStep){
    return {
        type:'ADD_ALL_Kindergarten',
        payload:{
            promise:api.postForm('/web/kindergarten/add.tj;',{
                data:{
                    name:name,
                    pinyin:pinyin,
                    level:level,
                    nature:nature,
                    type:type,
                    phone:phone,
                    street:street,
                    address:address,
                    status:status,
                    upGradeStep:upGradeStep
                }
            })
        }
    }
}


export function editKindergarten(id,name,pinyin,level,nature,type,phone,street,address,status,upGradeStep){
    return {
        type:'EDIT_ALL_Kindergarten',
        payload:{
            promise:api.postForm('/web/kindergarten/update.tj;',{
                data:{
                    id:id,
                    name:name,
                    pinyin:pinyin,
                    level:level,
                    nature:nature,
                    type:type,
                    phone:phone,
                    street:street,
                    address:address,
                    status:status,
                    upGradeStep:upGradeStep
                }
            })
        }
        }
}

export function resetKindergartenAll() {
    return {
        type: 'RESET_ALL_Kindergarten'
    }
}

export function resetTrigger() {
    return {
        type: 'RESET_TRIGGER'
    }
}
