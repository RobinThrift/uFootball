// @flow
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import {Fixtures} from './containers/Fixtures';

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
                    <Scene key="fixtures" component={Fixtures} title="Fixtures" />
                </Scene>
            </Router>
        </View>
    );
}

