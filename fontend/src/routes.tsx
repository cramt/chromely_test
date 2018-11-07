import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Leads } from './components/Leads';
import { Group } from './components/Group';
import { Lead } from './components/Lead';
import { NewLead } from './components/NewLead';

export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/leads/:groupname" component={Leads} />
    <Route exact path="/leads/:groupname/:search" component={Leads} />
    <Route exact path="/group/:name" component={Group} />
    <Route exact path="/lead/:leadid" component={Lead} />
    <Route exact path="/newLead/:groupname" component={NewLead} />
</Layout>