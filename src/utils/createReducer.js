// @flow
import has from 'lodash/has';
import type {FSA} from '../flow/types';

export type Handlers<T> = {[key: string]: (state: T, actions: FSA) => T}

export function createReducer<S>(handlers: Handlers<S>, initialState: S) {
    return function reducer(state: S = initialState, action: FSA) {
        if (has(handlers, action.type)) {
            return handlers[action.type](state, action);
        }

        return state;
    };
}

