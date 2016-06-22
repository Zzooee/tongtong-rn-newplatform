import _ from 'lodash';

import {
    GET_ALL_MENU_SUCCESS,
    GET_ALL_MENU_ERROR,
    UPDATE_NAVPATH
} from '../actions/menu';

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
            let navpath = [], tmpOb, tmpKey, sndchildMenus, thdchildMenus, frhchildMenus;
            if (action.payload.data) {
                action.payload.data.reverse().map((item)=> {
                    if (item.indexOf('sub') != -1) {
                        tmpKey = item.replace('sub', '');
                        tmpOb = _.find(state.items, function (o) {
                            return o.id == tmpKey;
                        });
                        sndchildMenus = tmpOb.childMenus;
                        navpath.push({
                            id: tmpOb.id,
                            name: tmpOb.name
                        })
                    }
                    if (item.indexOf('menu') != -1) {
                        tmpKey = item.replace('menu', '');
                        if (sndchildMenus) {
                            tmpOb = _.find(sndchildMenus, function (o) {
                                return o.id == tmpKey;
                            });
                            thdchildMenus = tmpOb.childMenus;
                            navpath.push({
                                id: tmpOb.id,
                                name: tmpOb.name
                            })
                        }
                    }
                    if (item.indexOf('thd') != -1) {
                        tmpKey = item.replace('thd', '');
                        if (thdchildMenus) {
                            tmpOb = _.find(thdchildMenus, function (o) {
                                return o.id == tmpKey;
                            });
                            frhchildMenus = tmpOb.childMenus;
                            navpath.push({
                                id: tmpOb.id,
                                name: tmpOb.name
                            })
                        }
                    }
                    if (item.indexOf('frh') != -1) {
                        tmpKey = item.replace('frh', '');
                        if (frhchildMenus) {
                            tmpOb = _.find(frhchildMenus, function (o) {
                                return o.id == tmpKey;
                            });
                            navpath.push({
                                id: tmpOb.id,
                                name: tmpOb.name
                            })
                        }
                    }
                })
            }

            return Object.assign({}, state, {
                currentIndex: action.payload.key * 1,
                navpath: navpath
            });
        default:
            return state;
    }
}
