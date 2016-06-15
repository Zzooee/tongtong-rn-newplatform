import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRedirect, useRouterHistory} from 'react-router';
import {createHistory} from 'history'

import configureStore from './store/configureStore';

import App from './containers/App';
import Home from './containers/Home';
import Login from './containers/Login';

import {getCookie} from './utils/index';
import authUtils from './utils/auth';


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
                    <IndexRedirect to="home"/>
                    <Route component={App}>
                        <Route path="home" component={Home}/>
                    </Route>
                    <Route path="login" component={Login}/>
                </Route>
            </Router>
        </div>
    </Provider>,
    document.getElementById('root')
);
