// @flow
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    StatusBar,
    TouchableWithoutFeedback
} from 'react-native';

import styleVars from '../styleVars';

import {BGBox} from './BGBox';
import {TextBox} from './TextBox';

let styles = StyleSheet.create({
    base: {
        flex: 1
    },
    image: {
        position: 'absolute',
        left: 0
    },
    titleText: {
        color: 'rgb(255, 255, 255)',
        fontSize: 40,
        fontWeight: '300'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: 'rgb(255, 255, 255)',
        borderRadius: 4,
        height: 41.5,
        width: 148.5,
        marginLeft: -40
    },
    buttonText: {
        color: 'rgb(255, 255, 255)',
        fontWeight: 'normal',
        fontSize: 18
    }
});

const BG_IMAGE = require('../assets/ball-bg.png');
const BG_IMAGE_RATIO = 0.883058471;

export function Start() {
    let { height, width } = Dimensions.get('window');
    return (
        <View style={styles.base}>
            <StatusBar barStyle="light-content" />
            <Image
                source={BG_IMAGE}
                style={[
                    styles.image,
                    {
                        height: height,
                        width: height * BG_IMAGE_RATIO
                    }
                ]}
            />

            <BGBox
                width={275}
                height={290.8}
                x={-39.5}
                y={62.5}
            />
            <TextBox
                height={74.1}
                width={270.7}
                x={39}
                y={111.5}
                textStyle={styles.titleText}
            >
                μFootball
            </TextBox>

            <BGBox
                width={209.9}
                height={269}
                x={189.4}
                y={450.5}
            />
            <TextBox
                height={61}
                width={241.8}
                x={133.3}
                y={474.5}
            >
                <TouchableWithoutFeedback>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Select League</Text>
                    </View>
                </TouchableWithoutFeedback>
            </TextBox>
        </View>
    );
}
