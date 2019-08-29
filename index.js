/** @format */

// symbol polyfills
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');

// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

import {
    Sentry
} from 'react-native-sentry';
Sentry.config('https://9caca37be0ec4fbb8628ea99ae6e6e84@sentry.io/1359547').install();

import {
    AppRegistry
} from 'react-native';
import {
    App
} from './src/App';
import {
    name as appName
} from './app.json';

AppRegistry.registerComponent(appName, () => App);


// To see all the requests in the chrome Dev tools in the network tab.
XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
    GLOBAL.originalXMLHttpRequest :
    GLOBAL.XMLHttpRequest;

// fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
    return global._fetch(uri, options, ...args).then((response) => {
        console.log('Fetch', {
            request: {
                uri,
                options,
                ...args
            },
            response
        });
        return response;
    });
};