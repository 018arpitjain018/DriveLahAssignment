/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import React from 'react';

import { Provider } from 'react-redux';
import factory from './src/Store/Store';
import { PersistGate } from 'redux-persist/integration/react';

import 'react-native-get-random-values'

const { store, persistor } = factory()

var app = () => {
    return (
        <Provider store={store} >
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => app);
