import test from 'ava';
import mockery from 'mockery';
import td from 'testdouble';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {List} from 'immutable';

test.beforeEach(() => {
    mockery.enable({
        warnOnUnregistered: false
    });
});

test.afterEach(() => {
    mockery.deregisterAll();
    mockery.disable();
});

test('getCompetitions returns a thunk', async (t) => {
    t.plan(1);

    let returnValue = new List();
    let getCompetitionsFromApi = td.function();
    mockery.registerMock('../api/footballDB', {
        getCompetitions: getCompetitionsFromApi
    });
    td.when(getCompetitionsFromApi(2016)).thenResolve(returnValue);

    let {getCompetitions} = require('../competitions');

    let thunky = getCompetitions(2016);
    t.true(typeof thunky === 'function');

    mockery.deregisterMock('../api/footballDB');
});

test('getCompetitions action', async (t) => {
    let store = configureStore([thunk])();
    let returnValue = new List();

    let getCompetitionsFromApi = td.function();
    mockery.registerMock('../api/footballDB', {
        getCompetitions: getCompetitionsFromApi
    });
    td.when(getCompetitionsFromApi(2016)).thenResolve(returnValue);

    let {getCompetitions} = require('../competitions');

    await store.dispatch(getCompetitions(2016));

    t.deepEqual(store.getActions(), [
        {type: 'uFootball/GET_COMPETITIONS_START'},
        {type: 'uFootball/GET_COMPETITIONS_END', payload: returnValue}
    ]);

    mockery.deregisterMock('../api/footballDB');
});
