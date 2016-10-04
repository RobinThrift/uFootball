// @flow
import {combineReducers} from 'redux';
import {user} from './user';
import {fixtures} from './fixtures';
import {competitions} from './competitions';
import {teams} from './teams';

export let rootReducer = combineReducers({
    user,
    fixtures,
    competitions,
    teams
});

