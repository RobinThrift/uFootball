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

