import {createStore, applyMiddleware, combineReducers,compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import promiseMiddleware from '../middlewares/promiseMiddleware'

import user from '../reducers/user';
import menu from '../reducers/menu';
import admin from '../reducers/admin';
import rolelist from '../reducers/rolelist';
import resource from '../reducers/resource';
import keyword from '../reducers/keyword';
import organization from '../reducers/organization'

import DevTools from '../utils/DevTools';

const reducer = combineReducers({user, menu, admin, rolelist, resource, keyword, organization});

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
