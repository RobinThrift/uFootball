// @flow
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import {Competitions} from './containers/Competitions';

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
                    <Scene key="competitions" component={Competitions} hideNavBar={true} initial={true} passProps={true} year={2016} />
                </Scene>
            </Router>
        </View>
    );
}

