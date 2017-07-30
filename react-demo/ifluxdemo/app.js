
import React from 'react';
import { render } from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
const history = useRouterHistory(createHashHistory)({queryKey: false})

const rootRoute = {
    component: '',
    childRoutes: [{
        path: '/',
        component: require('./modules/main'),
        indexRoute: [{
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, require('./modules/home'))
                })
            }
        }]
    }]
}
render(<Router history={history} routes={rootRoute}/>, document.getElementById('content'))

