// @flow
import React from 'react';
import {View, Text, StyleSheet, ListView, TouchableHighlight} from 'react-native';
import type {List} from 'immutable';
import type {Team} from '../flow/types';

let styles = StyleSheet.create({
    base: {
        flex: 1,
        marginTop: 70
    },
    row: {
        flex: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#c0c0c0',
        borderBottomWidth: 1
    }
});

export type TeamsProps = {
    teams: List<Team>,
    getTeams: (competition: number) => void,
    competition: number
}

export class Teams extends React.Component {
    props: TeamsProps;

    state: {
        teams: ListView.DataSource
    };

    constructor(props: TeamsProps, context?: Object) {
        super(props, context);
        this.props.getTeams(this.props.competition);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            teams: ds.cloneWithRows(this.props.teams.toJS())
        };
    }

    componentWillReceiveProps(nextProps: TeamsProps) {
        this.setState({
            teams: this.state.teams.cloneWithRows(nextProps.teams.toJS())
        });
    }

    openTeam(id: number) {
        console.log('openTeam', id);
    }

    renderRow(data: Team) {
        return (
            <TouchableHighlight onPress={() => this.openTeam(data.id)}>
                <View
                    key={data.id}
                    style={styles.row}
                >
                    <Text>{data.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <ListView
                style={styles.base}
                dataSource={this.state.teams}
                renderRow={this.renderRow.bind(this)}
            />
        );
    }
}

