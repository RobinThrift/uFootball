// @flow
import {combineReducers} from 'redux';
import {user} from './user';
import {fixtures} from './fixtures';

export let rootReducer = combineReducers({
    user,
    fixtures
});

