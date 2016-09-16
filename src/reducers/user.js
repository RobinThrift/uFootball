// @flow
import {createReducer} from '../utils/createReducer';

export const INITIAL_SETUP_DONE = 'uFootball/user/INITIAL_SETUP_DONE';

export type UserState = {
    isInitialSetup: boolean
}

const initState: UserState = {
    isInitialSetup: true
};

export let user = createReducer({
    [INITIAL_SETUP_DONE]: (state: UserState) => ({
        ...state,
        isInitialSetup: false
    })
}, initState);

