// @flow
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import {Competitions} from './containers/Competitions';
import {Teams} from './containers/Teams';

let styles = StyleSheet.create({
    base: {
        flex: 1
    }
});

export function uFootball() {
    return (
        <View style={styles.base}>
            <Router>
                <Scene key="root">
                    <Scene key="competitions" component={Competitions} title="Competitions" initial={true} passProps={true} year={2016} />
                    <Scene key="teams" component={Teams} title="Teams" />
                </Scene>
            </Router>
        </View>
    );
}

