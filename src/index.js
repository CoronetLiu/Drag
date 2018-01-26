import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory,browserHistory,IndexRoute,IndexRedirect,Redirect} from "react-router";
import store from './redux/store'
import { Provider } from 'react-redux'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                {/* <IndexRedirect to='/sale'/>
                    <Route path="/mine" component={Mine}>
                        <Route path="/login" component={Login}></Route>
                    </Route>
                    <Route path="/detail/:id" component={Detail}></Route>
                    <Redirect from='*' to="/sale"/> */}
            </Route>
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
