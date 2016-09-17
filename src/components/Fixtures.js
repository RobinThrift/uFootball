// @flow
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

let styles = StyleSheet.create({
    base: {
        flex: 1,
        marginTop: 80,
        marginHorizontal: 20
    }
});

export function Fixtures() {
    return (
        <View style={styles.base}>
            <Text>Hello from Fixtures</Text>
        </View>
    );
}

