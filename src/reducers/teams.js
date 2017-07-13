// @flow
import {List} from 'immutable';
import {createReducer} from '../utils/createReducer';
import type {Team} from '../flow/types';
import {GET_TEAMS_START, GET_TEAMS_END, SET_OPEN, ADD_TEAM} from '../actions/teams';


export type CompState = {
    competitions: List<Team>,
    loading: boolean,
    isOpen: boolean,
    selectedCompetition?: number
}

const initState = {
    teams: new List(),
    loading: false,
    isOpen: false,
    selectedCompetition: undefined
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
    }),
    [SET_OPEN]: (state, {payload}) => ({
        ...state,
        isOpen: payload.isOpen,
        selectedCompetition: payload.id
    })
}, initState);

