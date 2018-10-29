import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'

import 'react-datepicker/dist/react-datepicker.css';
// Containers
import Login from './views/Login/'

import '../translation';

import createStore from './redux/store';

//import transl from '../translation/sk'
//import {sortObject} from './helperFunctions';
//sortObject(transl);

const store=createStore();
ReactDOM.render((
  <Provider store={store}>
    <HashRouter className="fontFamilyMain">
      <Switch>
        <Route path="/" name="Home" component={Login}/>
      </Switch>
    </HashRouter>
  </Provider>
), document.getElementById('root'));
