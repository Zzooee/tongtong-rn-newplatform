import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRedirect, useRouterHistory} from 'react-router';
import {createHistory} from 'history'

import configureStore from './store/configureStore';

import App from './containers/App';
import Blank from './containers/Blank';
import Home from './containers/Home';
import Login from './containers/Login';
import AdminList from './containers/AdminModule/AdminList';
import ResourceList from './containers/AdminModule/ResourceList';
import RoleList from './containers/AdminModule/RoleList';
import OrganizationList from './containers/AdminModule/OrganizationList';
import DictionaryTypeList from './containers/AdminModule/DictionaryTypeList';
import DictionaryList from './containers/AdminModule/DictionaryList';
import KindergartenList from './containers/KindergartenModule/KindergartenList';
import SchedulerList from './containers/TaskModule/schedulerlist';
import TgroupList from './containers/TaskModule/schedulergroup';
import Ongoing from './containers/TaskModule/OngoingTask';
import level3 from './containers/Level2Module/level3'
import level32 from './containers/Level2Module/level32'
import level4 from './containers/Level2Module/level4'

import BasicInfo from './containers/Module1/BasicInfo'

import {getCookie} from './common/utils/index';
import authUtils from './common/utils/auth';


const history = useRouterHistory(createHistory)({basename: ''})
const store = configureStore();

const validate = function (next, replace, callback) {
    const isLoggedIn = authUtils.getToken()

    if (!isLoggedIn && next.location.pathname != '/login') {
        replace('/login')
        localStorage.clear()
    }
    callback()
}

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Router history={history}>
                <Route path="/" onEnter={validate}>
                    <IndexRedirect to="login"/>
                    <Route component={Blank}>
                        <Route path="home" component={Home}/>
                        <Route path="adminList" component={AdminList}/>
                        <Route path="resourcelist" component={ResourceList}/>
                        <Route path="rolelist" component={RoleList}/>
                        <Route path="organizationlist" component={OrganizationList}/>
                        <Route path="schedulerlist" component={SchedulerList}/>
                        <Route path="schedulergroup" component={TgroupList}/>
                        <Route path="ongoingtask" component={Ongoing}/>
                    </Route>
                    <Route path="login" component={Login}/>
                    <Route path='/dictionary'>
                        <IndexRedirect to="dictionaryTypeList"/>
                        <Route component={App}>
                            <Route path="dictionaryTypeList" component={DictionaryTypeList}/>
                            <Route path="dictionaryList" component={DictionaryList}/>
                        </Route>
                    </Route>
                    <Route path="/kindergarten">
                        <IndexRedirect to="kindergartenList"/>
                        <Route component={App}>
                            <Route path="kindergartenList" component={KindergartenList}></Route>
                        </Route>
                    </Route>

                    <Route path='/level2'>
                        <IndexRedirect to="level4"/>
                        <Route component={App}>
                            <Route path="level4" component={level4}/>
                            <Route path="level32" component={level32}/>
                        </Route>
                    </Route>
                    <Route path='/level22'>
                        <IndexRedirect to="level3"/>
                        <Route component={App}>
                            <Route path="level3" component={level3}/>
                        </Route>
                    </Route>
                    <Route path='/ChildModule'>
                        <IndexRedirect to="BasicInfo"/>
                        <Route component={App}>
                            <Route path="basicinfo" component={BasicInfo}/>
                        </Route>
                    </Route>
                </Route>
            </Router>
        </div>
    </Provider>,
    document.getElementById('root')
);
