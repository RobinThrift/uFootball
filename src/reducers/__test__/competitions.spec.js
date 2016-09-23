import test from 'ava';
import {List} from 'immutable';
import {competitions} from '../competitions';

test('GET_COMPETITIONS_START', (t) => {
    t.deepEqual(
        competitions(undefined, {
            type: 'uFootball/GET_COMPETITIONS_START'
        }),
        {
            competitions: new List(),
            loading: true
        }
    );
});

test('GET_COMPETITIONS_END', (t) => {
    t.deepEqual(
        competitions(undefined, {
            type: 'uFootball/GET_COMPETITIONS_END',
            payload: new List(['Hello'])
        }),
        {
            competitions: new List(['Hello']),
            loading: false
        }
    );
});

