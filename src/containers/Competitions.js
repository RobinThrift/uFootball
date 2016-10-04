// @flow
import React from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Competitions as InternalCompetitions} from '../components/Competitions';
import {getCompetitions} from '../actions/competitions';

let mapStateToProps = store => ({
    competitions: store.competitions.competitions
});

let mapDispatchToProps = {
    getCompetitions,
    goToTeams: (competition: number) => {
        Actions.teams({competition});
        return {
            type: 'uFootball/GO_TO_TEAMS'
        };
    }
};


export let Competitions = connect(mapStateToProps, mapDispatchToProps)(InternalCompetitions);

