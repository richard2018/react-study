
var react = require("react");
var render = require("react-dom");
var routes = require("react-router");

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
//render(<Router routes={rootRoute}/>, document.getElementById('content'))

