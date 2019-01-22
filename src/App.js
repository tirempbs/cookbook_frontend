import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Nav from './components/nav';
import Login from './components/login';
import Signup from './components/signup';
import NotFound from './components/notFound';
import Search from './components/search';
import Cookbook from './components/cookbook';
import './App.css';

function App() {
  return (
    <>
      <Nav />
      <Switch>
        <Route exact path='/' render={() => <Redirect to='/cookbook' />} />

        <Route exact path='/cookbook' component={Cookbook} />
        <Route exact path='/search' component={Search} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route component={NotFound} />
      </Switch>
    </>
  )
}

export default withRouter(App)
