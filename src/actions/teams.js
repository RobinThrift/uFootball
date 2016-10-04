import {getTeams as getTeamsFromApi} from '../api/footballDB';

export const GET_TEAMS_START = 'uFootball/GET_TEAMS_START';
export const GET_TEAMS_END = 'uFootball/GET_TEAMS_END';


export function getTeams(competition: number) {
    return (dispatch) => {
        dispatch({type: GET_TEAMS_START});
        getTeamsFromApi(competition)
            .then((teams) => {
                dispatch({type: GET_TEAMS_END, payload: teams});
            });
    };
}

