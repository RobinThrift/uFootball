// @flow
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

let styles = StyleSheet.create({
    base: {
        flex: 1
    }
});

export function Fixtures() {
    return (
        <View style={styles.base}>
            <Text>Hello from Fixtures</Text>
        </View>
    );
}

