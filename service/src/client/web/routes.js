/**
 * Created by liujinhe on 17/2/7.
 */

import home from './pages/home'
import login from './pages/login/login.js'
import register from './pages/login/register.js'
import account from './pages/account'
import rule from './pages/account/rule'
import ruleCreate from './pages/account/rule/ruleCreate'
import ruleList from './pages/account/rule/ruleList'

import api from './pages/account/apiRule'
import apiList from './pages/account/apiRule/apiList'
import apiCreate from './pages/account/apiRule/apiCreate'
import success from './pages/success.js'

//import RuleList from './pages/account/ruleList/EditableTable.js'

import {browserHistory,Router,Route,IndexRoute} from 'react-router'
import React from 'react';
export default (
    <Router history={browserHistory}>
        <Route path='/' component={home}>
            <IndexRoute component={login}/>
            <Route path='login' component={login}/>
            <Route path='register' component={register}/>
            <Route path='account' component={account}>
                <IndexRoute component={rule}/>
                <Route path='rule' component={rule}/>
                <Route path='ruleCreate' component={ruleCreate}/>
                <Route path='ruleList' component={ruleList}/>


                <Route path='api' component={api}/>
                <Route path='apiList' component={apiList}/>
                <Route path='apiCreate' component={apiCreate}/>

            </Route>

            <Route path='success' component={success}/>
        </Route>
    </Router>

)


