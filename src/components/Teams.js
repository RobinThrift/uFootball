// @flow
import React from 'react';
import {View, Text, StyleSheet, ListView, TouchableHighlight} from 'react-native';
import type {List} from 'immutable';
import type {Team} from '../flow/types';

let styles = StyleSheet.create({
    base: {
        flex: 1
    },
    listView: {
        flex: 1,
        paddingVertical: 20,
        marginHorizontal: 20,
        marginVertical: 40,
        backgroundColor: '#ffffff',
        borderRadius: 3
    },
    row: {
        flex: 1,
        height: 55,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginVertical: 5,
        marginHorizontal: 20,
        borderBottomColor: '#dbdee3',
        borderBottomWidth: 1
    },
    teamName: {
        color: '#92979b',
        fontSize: 18,
        fontFamily: 'Avenir-Black'
    }
});

export type TeamsProps = {
    teams: List<Team>,
    getTeams: (competition: number) => void,
    competition: number,
    style: {[key: string]: string | number}
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

    selectTeam(id: number) {
        return id;
    }

    renderRow(data: Team) {
        return (
            <TouchableHighlight onPress={() => this.selectTeam(data.id)}>
                <View
                    key={data.id}
                    style={styles.row}
                >
                    <Text style={styles.teamName}>{data.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <ListView
                enableEmptySections={true}
                style={[styles.base, this.props.style]}
                dataSource={this.state.teams}
                renderRow={this.renderRow.bind(this)}
            />
        );
    }
}

