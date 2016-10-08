// @flow
/* eslint-disable no-underscore-dangle */
import {List} from 'immutable';
import last from 'lodash/last';
import type {Team, Competition, Fixture, Table} from '../flow/types';

const BASE_URL = 'https://api.football-data.org/v1';

const BASE_HEADERS = new Headers({
    'X-Auth-Token': 'API_TOKEN_HERE'
});

function getIdFromUrl(url: string): number {
    return parseInt(last(url.split('/')), 10);
}

function dataToList<T>(transform: (d: Object) => T) {
    return (data: Array<Object>) => new List(data.map(transform));
}

// @TODO: error handling
// @TODO: docs
export function getTeams(competition: number): Promise<List<Team>> {
    return fetch(`${BASE_URL}/competitions/${competition}/teams`, {headers: BASE_HEADERS})
        .then(resp => resp.json())
        .then(data => data.teams)
        .then(dataToList(d => ({
            id: getIdFromUrl(d._links.self.href),
            name: d.name,
            code: d.code,
            shortName: d.shortName,
            crestUrl: d.crestUrl
        })));
}

// @TODO: error handling
// @TODO: docs
export function getCompetitions(year: number): Promise<List<Competition>> {
    return fetch(`${BASE_URL}/competitions?season=${year}`, {headers: BASE_HEADERS})
        .then(resp => resp.json())
        .then(data => new List(data.map(d => ({
            id: d.id,
            name: d.caption,
            year: parseInt(d.year, 10),
            lastUpdated: new Date(d.lastUpdated),
            currentMatchday: d.currentMatchday
        }))));
}

// @TODO: error handling
// @TODO: docs
export function getFixtures(competition: number, matchday: number): Promise<List<Fixture>> {
    return fetch(`${BASE_URL}/competitions/${competition}/fixtures?matchday=${matchday}`)
        .then(resp => resp.json())
        .then(data => data.fixtures)
        .then(dataToList(d => ({
            date: new Date(d.date),
            status: d.status,
            teams: [
                getIdFromUrl(d._links.homeTeam.href),
                getIdFromUrl(d._links.awayTeam.href)
            ],
            score: [
                d.result.goalsHomeTeam,
                d.result.goalsAwayTeam
            ],
            matchday: d.matchday
        })));
}


export function getTable(competition: number): Promise<List<Table>> {
    return fetch(`${BASE_URL}/competitions/${competition}/leagueTable`)
        .then(resp => resp.json())
        .then(data => data.standing)
        .then(dataToList(team => ({
            id: getIdFromUrl(team._links.team.href),
            position: team.position,
            teamName: team.teamName,
            playedGames: team.playedGames,
            points: team.points,
            goals: team.goals,
            goalsAgainst: team.goalsAgainst,
            goalDifference: team.goalDifference,
            wins: team.wins,
            draws: team.draws,
            losses: team.losses
        })
    ));
}
