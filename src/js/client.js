import React from "react";
import ReactDOM from "react-dom";
import {Router,Route,IndexRoute,hashHistory,browserHistory} from "react-router";
import Layout from "./components/Layout";
import { Provider } from "react-redux";
import store from "./store";
import DisplayPanel from "./components/DisplayPanel/DisplayPanel";

import DetailPanel from "./components/DisplayPanel/DetailPanel";
import Maintain from "./components/MaintainBestpractice/Maintain";

import Login from "./components/Login/login"

import requireAuth from "./requireAuth";
import  ReactHighCharts  from "react-highcharts";


const app = document.getElementById('app');
ReactDOM.render(
    <Provider store = {store}>
    <Router history={browserHistory}>
    <Route path="/maintain" component ={Maintain}> </Route> 
    
     <Route path="/login" component ={Login}> </Route>  
     <Route path="/" component ={requireAuth(Layout)}>  
      </Route>
  </Router>
    </Provider>,
app);