'use strict';

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import ChatView from './chat.view.reducer'
import Header from './header.reducer'

const appReducer = combineReducers({
    ChatView,
    Header,
    routing: routerReducer,
    form: formReducer
});

export default appReducer;