import {getTeams as getTeamsFromApi} from '../api/footballDB';

export const GET_TEAMS_START = 'uFootball/GET_TEAMS_START';
export const GET_TEAMS_END = 'uFootball/GET_TEAMS_END';
export const SET_OPEN = 'uFootball/SET_OPEN';
export const ADD_TEAM = 'uFootball/ADD_TEAM';


export function getTeams(competition: number) {
    return (dispatch) => {
        dispatch({type: GET_TEAMS_START});
        getTeamsFromApi(competition)
            .then((teams) => {
                dispatch({type: GET_TEAMS_END, payload: teams});
            });
    };
}

export function openTeamSelection(id: number) {
    return {
        type: SET_OPEN,
        payload: {isOpen: true, id}
    };
}

export function closeTeamSelection() {
    return {
        type: SET_OPEN,
        payload: {isOpen: false}
    };
}

export function addTeam(id: number) {
    return {
        type: ADD_TEAM,
        payload: {id}
    }
}
