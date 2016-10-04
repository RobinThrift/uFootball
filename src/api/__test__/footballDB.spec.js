import test from 'ava';
import nock from 'nock';
import 'isomorphic-fetch';
import {List} from 'immutable';
import {getTeams, getCompetitions, getFixtures, getTable} from '../footballDB';

const BASE_URL = 'https://api.football-data.org';

test.afterEach(() => {
    nock.cleanAll();
});

test('getTeams', async (t) => {
    t.plan(4);

    let api = nock(BASE_URL)
        .get('/v1/competitions/426/teams')
        .query({season: 2016})
        .reply(200, require('../../../fixtures/teams.json'));

    let teams = await getTeams(426);

    t.true(List.isList(teams));
    t.is(teams.size, 2);
    t.deepEqual(teams.get(0), {
        id: 322,
        name: 'Hull City FC',
        code: 'HUL',
        shortName: 'Hull',
        crestUrl: 'http://upload.wikimedia.org/wikipedia/de/a/a9/Hull_City_AFC.svg'
    });
    t.deepEqual(teams.get(1), {
        id: 338,
        name: 'Leicester City FC',
        code: 'LCFC',
        shortName: 'Foxes',
        crestUrl: 'http://upload.wikimedia.org/wikipedia/en/6/63/Leicester02.png'
    });

    api.isDone();
});

test('getCompetitions', async (t) => {
    t.plan(4);

    let api = nock(BASE_URL)
        .get('/v1/competitions')
        .query({season: 2016})
        .reply(200, require('../../../fixtures/competitions.json'));

    let comps = await getCompetitions(2016);

    t.true(List.isList(comps));
    t.is(comps.size, 2);
    t.deepEqual(comps.get(0), {
        id: 426,
        name: 'Premier League 2016/17',
        year: 2016,
        lastUpdated: new Date('2016-09-18T00:00:25Z'),
        currentMatchday: 5
    });
    t.deepEqual(comps.get(1), {
        id: 430,
        name: '1. Bundesliga 2016/17',
        year: 2016,
        lastUpdated: new Date('2016-09-18T00:01:57Z'),
        currentMatchday: 3
    });

    api.isDone();
});

test('getFixtures', async (t) => {
    t.plan(4);

    let api = nock(BASE_URL)
        .get('/v1/competitions/426/fixtures')
        .query({matchday: 5})
        .reply(200, require('../../../fixtures/fixtures.json'));

    let fixtures = await getFixtures(426, 5);
    t.true(List.isList(fixtures));
    t.is(fixtures.size, 2);
    t.deepEqual(fixtures.get(0), {
        date: new Date('2016-09-16T19:00:00Z'),
        status: 'FINISHED',
        teams: [61, 64],
        score: [1, 2]
    });
    t.deepEqual(fixtures.get(1), {
        date: new Date('2016-09-17T14:00:00Z'),
        status: 'FINISHED',
        teams: [322, 57],
        score: [1, 4]
    });

    api.isDone();
});

test('getTable', async (t) => {
    t.plan(4);

    let api = nock(BASE_URL)
        .get('/v1/competitions/426/leagueTable')
        .reply(200, require('../../../fixtures/table.json'));

    let table = await getTable(426);
    t.true(List.isList(table));
    t.is(table.size, 2);
    t.deepEqual(table.get(0), {
        id: 65,
        position: 1,
        teamName: 'Manchester City FC',
        playedGames: 5,
        points: 15,
        goals: 15,
        goalsAgainst: 4,
        goalDifference: 11,
        wins: 5,
        draws: 0,
        losses: 0
    });
    t.deepEqual(table.get(1), {
        id: 62,
        position: 2,
        teamName: 'Everton FC',
        playedGames: 5,
        points: 13,
        goals: 10,
        goalsAgainst: 3,
        goalDifference: 7,
        wins: 4,
        draws: 1,
        losses: 0
    });

    api.isDone();
});
