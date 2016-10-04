// @flow
import {connect} from 'react-redux';
import {Teams as InternalTeams} from '../components/Teams';
import {getTeams} from '../actions/teams';

let mapStateToProps = store => ({
    teams: store.teams.teams
});

let mapDispatchToProps = {
    getTeams
};

export let Teams = connect(mapStateToProps, mapDispatchToProps)(InternalTeams);

