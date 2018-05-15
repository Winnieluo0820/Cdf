import React from 'react'
import {createStore, applyMiddleware} from 'redux'

import rootReducer from './rootreducer.js'

import middleware from './middleware.js'

const store = createStore(rootReducer, applyMiddleware(middleware));

export default store;