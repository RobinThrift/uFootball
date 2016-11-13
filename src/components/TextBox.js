// @flow
import React from 'react';
import {View, Text} from 'react-native';

import styleVars from '../styleVars';

export type TextBoxProps = {
    textStyle: {[key: string]: string | number},
    height: number,
    width: number,
    x: number,
    y: number,
    background?: string,
    children: ReactElement<*> | string
};

export function TextBox(props: TextBoxProps) {
    return (
        <View
            style={{
                height: props.height,
                width: props.width,
                top: props.y,
                left: props.x,
                backgroundColor: props.background || styleVars.textBox,
                position: 'absolute',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {typeof props.children === 'string'
                ? <Text style={props.textStyle}>{props.children}</Text>
                : props.children
            }
        </View>
    );
}

