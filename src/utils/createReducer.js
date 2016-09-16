// @flow
import type {FSA} from '../flow/types';

export type Handlers<T> = {[key: string]: (state: T, actions: FSA) => T}

export function createReducer<S>(handlers: Handlers<S>, initialState: S) {
    return function reducer(state: S = initialState, action: FSA) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    };
};

