import {createStore, applyMiddleware, combineReducers,compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from '../common/middlewares/promiseMiddleware';

import user from '../reducers/user';
import menu from '../reducers/menu';
import admin from '../reducers/AdminModule/admin';
import dictionaryType from '../reducers/AdminModule/dictionaryType';
import dictionary from '../reducers/AdminModule/dictionary';
import rolelist from '../reducers/AdminModule/rolelist';
import resource from '../reducers/AdminModule/resource';
import keyword from '../reducers/keyword';
import organization from '../reducers/AdminModule/organization'
import kindergarten from '../reducers/KindergartenModule/kindergarten';
import scheduler from '../reducers/TaskModule/scheduler';
import tgroup from '../reducers/TaskModule/group';
import ongoing from '../reducers/TaskModule/ongoing'
import bizserver from '../reducers/bizserver';

import DevTools from '../common/utils/DevTools';

const reducer = combineReducers({user, menu, admin,dictionaryType,dictionary,rolelist, resource, keyword, organization, kindergarten, scheduler, tgroup, ongoing, bizserver});

const enhancer = compose(
    // Middleware you want to use in development:
    applyMiddleware(
        thunkMiddleware,
        //createLogger(),
        promiseMiddleware({promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'ERROR']})),
    // Required! Enable Redux DevTools with the monitors you chose
    DevTools.instrument()
);

export default function configureStore(initialState) {
    // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
    // See https://github.com/rackt/redux/releases/tag/v3.1.0
    const store = createStore(reducer, initialState, enhancer);

    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    // if (module.hot) {
    //     module.hot.accept('../reducers', () =>
    //         store.replaceReducer(require('../reducers')/*.default if you use Babel 6+ */)
    //     );
    // }

    return store;
}
