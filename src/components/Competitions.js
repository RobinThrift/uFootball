// @flow
import React from 'react';
import {View, Text, StyleSheet, ListView, TouchableHighlight, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient/index.ios.js';
import type {List} from 'immutable';
import {Teams} from '../containers/Teams';
import type {Competition} from '../flow/types';


const NAME_SPLIT = / ([0-9\/]+)$/;
function splitNameYear(name) {
    let split = name.split(NAME_SPLIT);
    return {
        name: split[0].trim(),
        year: split[1].trim()
    };
}

let styles = StyleSheet.create({
    base: {
        flex: 1
    },
    listView: {
        flex: 1,
        marginVertical: 30,
        backgroundColor: 'transparent'
    },
    row: {
        flex: 1,
        height: 60,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderBottomColor: '#ffffff',
        borderBottomWidth: 1
    },
    compName: {
        color: '#ffffff',
        fontSize: 18,
        fontFamily: 'Avenir-Black'
    },
    compYear: {
        color: '#ffffff',
        fontSize: 15,
        fontFamily: 'Avenir'
    },
    teamSelectionAnim: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: -10,
        zIndex: 100
    },
    teamSelection: {
        paddingVertical: 30,
        backgroundColor: '#738bd0'
    }
});

export type CompetitionsProps = {
    competitions: List<Competition>,
    getCompetitions: (year: number) => void,
    openTeamSelection: () => void,
    isTeamsOpen: boolean,
    selectedCompetition: number,
    selectCompetition: (id: number) => void,
    year: number
}

export class Competitions extends React.Component {
    props: CompetitionsProps;

    state: {
        comps: ListView.DataSource,
        teamAnimation: Animated.Value
    };

    constructor(props: CompetitionsProps, context?: Object) {
        super(props, context);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.props.getCompetitions(this.props.year);
        this.state = {
            comps: ds.cloneWithRows(this.props.competitions.toJS()),
            teamAnimation: new Animated.Value(0)
        };
    }

    componentWillReceiveProps(nextProps: CompetitionsProps) {
        if (nextProps.isTeamsOpen) {
            Animated.timing(this.state.teamAnimation, {duration: 300, toValue: 1}).start();
        } else {
            Animated.timing(this.state.teamAnimation, {duration: 300, toValue: 0}).start();
        }

        this.setState({
            ...this.state,
            comps: this.state.comps.cloneWithRows(nextProps.competitions.toJS())
        });
    }

    renderRow(data: Competition) {
        let {name, year} = splitNameYear(data.name);
        return (
            <TouchableHighlight
                onPress={() => this.props.openTeamSelection(data.id)}
                underlayColor="rgba(0,0,0,0.1)"
            >
                <View
                    key={data.id}
                    style={styles.row}
                >
                    <Text style={styles.compName}>{name}</Text>
                    <Text style={styles.compYear}>{year}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        let outputRange: Array<number> = [500, 20]; // because flow...
        let translation = {
            left: this.state.teamAnimation.interpolate({
                inputRange: [0, 1],
                outputRange
            })
        };

        return (
            <LinearGradient
                style={styles.base}
                colors={[
                    '#86c777',
                    '#75af67'
                ]}
            >
                <ListView
                    enableEmptySections={true}
                    style={styles.listView}
                    dataSource={this.state.comps}
                    renderRow={this.renderRow.bind(this)}
                />
                {
                    this.props.isTeamsOpen &&
                        <Animated.View style={[styles.teamSelectionAnim, translation]}>
                            <Teams
                                style={styles.teamSelection}
                                competition={this.props.selectedCompetition}
                            />
                        </Animated.View>
                }
            </LinearGradient>
        );
    }
}
