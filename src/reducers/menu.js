import _ from 'lodash';

import {
    GET_ALL_MENU,
    GET_ALL_MENU_SUCCESS,
    GET_ALL_MENU_ERROR,
    UPDATE_NAVPATH
} from '../actions/menu';

import authUtils from '../utils/auth';

let initialState = {
    currentIndex: 0,
    items: [],
    navpath: [],
    menuErrors: null
};

export default function menu(state = initialState, action = {}) {
    switch (action.type) {
        case GET_ALL_MENU_SUCCESS:
            return Object.assign({}, initialState, {items: action.payload.body});
        case GET_ALL_MENU_ERROR:
            return {
                ...state,
                currentIndex: 0,
                menuErrors: '获取管理员列表失败'
            };
        case UPDATE_NAVPATH:
            let navpath = [], tmpOb, tmpKey, childMenus;
            if (action.payload.data) {
                action.payload.data.reverse().map((item)=> {
                    if (item.indexOf('sub') != -1) {
                        tmpKey = item.replace('sub', '');
                        tmpOb = _.find(state.items, function (o) {
                            return o.id == tmpKey;
                        });
                        childMenus = tmpOb.childMenus;
                        navpath.push({
                            id: tmpOb.id,
                            name: tmpOb.name
                        })
                    }
                    if (item.indexOf('menu') != -1) {
                        tmpKey = item.replace('menu', '');
                        if (childMenus) {
                            tmpOb = _.find(childMenus, function (o) {
                                return o.id == tmpKey;
                            });
                        }
                        navpath.push({
                            id: tmpOb.id,
                            name: tmpOb.name
                        })
                    }
                })
            }

            var indexNum = action.payload.key.replace(/[^0-9]/ig,"");
            return Object.assign({}, state, {
                currentIndex: indexNum * 1,
                navpath: navpath
            });
        default:
            return state;
    }
}
