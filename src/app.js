import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router, hashHistory, browserHistory} from 'react-router'

import store from './redux/store.js'
import routes from './router/router.js'


import './style/App.scss'

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes}></Router>
    </Provider>,
    document.getElementById('app')
)