// @flow
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import {rootReducer} from './reducers';
import createLogger from 'redux-logger';

let middleware = [thunk];

if (__DEV__) {
    let logger = createLogger({
        collapsed: true
    });

    middleware = [...middleware, logger];
}


export function configureStore(onComplete: Function) {
    let createAppStore = applyMiddleware(...middleware)(createStore);
    let store = autoRehydrate()(createAppStore)(rootReducer);

    persistStore(store, {
        whitelist: ['user', 'fixtures'],
        storage: AsyncStorage
    }, onComplete);

    return store;
}

