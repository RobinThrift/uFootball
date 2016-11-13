// @flow
import React from 'react';
import {View} from 'react-native';

import styleVars from '../styleVars';

export type BGBoxProps = {
    height: number,
    width: number,
    x: number,
    y: number,
    background?: string
};

export function BGBox(props: BGBoxProps) {
    return (
        <View
            style={{
                height: props.height,
                width: props.width,
                top: props.y,
                left: props.x,
                backgroundColor: props.background || styleVars.bgBox,
                position: 'absolute'
            }}
        />
    );
}

