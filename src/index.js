import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory,browserHistory,IndexRoute,IndexRedirect,Redirect} from "react-router";
import store from './redux/store'
import { Provider } from 'react-redux'

import './index.css';
import App from './App';
import ScreenShoot from './components/ScreenShoot';
import Drag from './components/Drag';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route path="/screenshoot" component={ScreenShoot}></Route>
                <Route path="/drag" component={Drag}></Route>
                <IndexRedirect to='/drag'/>
                {/* <Route path="/mine" component={Mine}>
                        <Route path="/login" component={Login}></Route>
                    </Route>
                    <Route path="/detail/:id" component={Detail}></Route>*/}
                <Redirect from='*' to="/drag"/>
            </Route>
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
