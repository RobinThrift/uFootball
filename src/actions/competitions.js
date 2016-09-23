import {getCompetitions as getCompetitionsFromApi} from '../api/footballDB';

export const GET_COMPETITIONS_START = 'uFootball/GET_COMPETITIONS_START';
export const GET_COMPETITIONS_END = 'uFootball/GET_COMPETITIONS_END';


export function getCompetitions(season: number) {
    return (dispatch) => {
        dispatch({type: GET_COMPETITIONS_START});
        getCompetitionsFromApi(season)
            .then((comps) => {
                dispatch({type: GET_COMPETITIONS_END, payload: comps});
            });
    }
}

