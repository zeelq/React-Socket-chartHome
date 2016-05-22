import React from 'react';
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Route,IndexRoute} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import {Router,browserHistory,hashHistory} from 'react-router'

import routes from './routes'
import configureStore from './store/configureStore'
import createDevTools from './createDevtools'



const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);


createDevTools(store);

render(
    <Provider store={store}>
        <Router history={history}>
            {routes()}
        </Router>
    </Provider>,
    document.getElementById('root')
);
