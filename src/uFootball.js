// @flow
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import {Competitions} from './containers/Competitions';
import {Start} from './components/Start';

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
                    <Scene key="start" component={Start} hideNavBar={true} initial={true} />
                    <Scene key="competitions" component={Competitions} hideNavBar={true} passProps={true} year={2016} />
                </Scene>
            </Router>
        </View>
    );
}

