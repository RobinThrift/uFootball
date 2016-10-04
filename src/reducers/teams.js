// @flow
import {List} from 'immutable';
import {createReducer} from '../utils/createReducer';
import type {Team} from '../flow/types';
import {GET_TEAMS_START, GET_TEAMS_END} from '../actions/teams';


export type CompState = {
    competitions: List<Team>,
    loading: boolean
}

const initState = {
    teams: new List(),
    loading: false
};

export let teams = createReducer({
    [GET_TEAMS_START]: (state) => ({
        ...state,
        loading: true
    }),
    [GET_TEAMS_END]: (state, {payload}) => ({
        ...state,
        teams: payload,
        loading: false
    })
}, initState);

