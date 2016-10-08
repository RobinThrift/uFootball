// @flow
import {connect} from 'react-redux';
import {Competitions as InternalCompetitions} from '../components/Competitions';
import {getCompetitions} from '../actions/competitions';
import {openTeamSelection} from '../actions/teams';

let mapStateToProps = store => ({
    competitions: store.competitions.competitions,
    isTeamsOpen: store.teams.isOpen,
    selectedCompetition: store.teams.selectedCompetition
});

let mapDispatchToProps = {
    getCompetitions,
    openTeamSelection
};


export let Competitions = connect(mapStateToProps, mapDispatchToProps)(InternalCompetitions);

