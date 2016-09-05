import React from "react";
import ReactDOM from "react-dom";
import {Router,Route,IndexRoute,hashHistory} from "react-router";
import Layout from "./components/Layout";
import Article from "./components/Article";
import { Provider } from "react-redux";
import store from "./store";
import DisplayPanel from "./components/DisplayPanel/DisplayPanel";

import DetailPanel from "./components/DisplayPanel/DetailPanel";

import Login from "./components/Login/login"

import requireAuth from "./requireAuth";


const app = document.getElementById('app');
ReactDOM.render(
    <Provider store = {store}>
    <Router history={hashHistory}>
    <Route path="/login" component ={Login}> </Route>	
    <Route path="/" component={requireAuth(Layout)}>
		<Route path="/overview/" component = {DisplayPanel}>
    	</Route>
    </Route>
  </Router>
    </Provider>,
app);
