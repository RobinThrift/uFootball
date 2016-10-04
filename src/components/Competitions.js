// @flow
import React from 'react';
import {View, Text, StyleSheet, ListView, TouchableHighlight} from 'react-native';
import type {List} from 'immutable';
import type {Competition} from '../flow/types';

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

export type CompetitionsProps = {
    competitions: List<Competition>,
    goToTeams: (competition: number) => void,
    year: number,
    getCompetitions: (year: number) => void
}

export class Competitions extends React.Component {
    props: CompetitionsProps;

    state: {
        comps: ListView.DataSource
    };

    constructor(props: CompetitionsProps, context?: Object) {
        super(props, context);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.props.getCompetitions(this.props.year);
        this.state = {
            comps: ds.cloneWithRows(this.props.competitions.toJS())
        };
    }

    componentWillReceiveProps(nextProps: CompetitionsProps) {
        this.setState({
            comps: this.state.comps.cloneWithRows(nextProps.competitions.toJS())
        });
    }

    renderRow(data: Competition) {
        return (
            <TouchableHighlight
                onPress={() => this.props.goToTeams(data.id)}
                underlayColor="#c0c0c0"
            >
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
                dataSource={this.state.comps}
                renderRow={this.renderRow.bind(this)}
            />
        );
    }
}

