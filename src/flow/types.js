// @flow

export type FSA = {
    type: string,
    payload?: any,
    meta?: Object,
    error?: boolean
}

export type Team = {
    name: string,
    code: string
}

export type Fixture = {
    date: Date,
    status: 'SCHEDULED' | 'FINISHED',
    teams: [number, number],
    score: [number, number]
}

export type Competition = {
    id: number,
    name: string,
    year: number,
    lastUpdated: Date,
    currentMatchday: number
}

export type TablePosition = {
    id: number,
    position: number,
    teamName: string,
    playedGames: number,
    points: number,
    goals: number,
    goalsAgainst: number,
    goalDifference: number,
    wins: number,
    draws: number,
    losses: number
}

export type Table = Array<TablePosition>

