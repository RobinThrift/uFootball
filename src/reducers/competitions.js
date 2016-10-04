// @flow
import {List} from 'immutable';
import {createReducer} from '../utils/createReducer';
import type {Competition} from '../flow/types';
import {GET_COMPETITIONS_START, GET_COMPETITIONS_END} from '../actions/competitions';


export type CompState = {
    competitions: List<Competition>,
    loading: boolean
}

const initState = {
    competitions: new List(),
    loading: false
};

export let competitions = createReducer({
    [GET_COMPETITIONS_START]: (state) => ({
        ...state,
        loading: true
    }),
    [GET_COMPETITIONS_END]: (state, {payload}) => ({
        ...state,
        competitions: payload,
        loading: false
    })
}, initState);

