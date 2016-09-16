// @flow
import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {uFootball as UFootball} from './src/uFootball';
import {configureStore} from './src/store';
import {Provider} from 'react-redux';

class Root extends Component {
    state: {
        preparing: boolean,
        store: Object
    }

    constructor() {
        super();
        this.state = {
            preparing: false,
            store: configureStore(() => this.setState({
                preparing: false
            }))
        }
    }

    render() {
        if (this.state.preparing) {
            return null;
        }

        return (
            <Provider store={this.state.store}>
                <UFootball />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('uFootball', () => Root);

