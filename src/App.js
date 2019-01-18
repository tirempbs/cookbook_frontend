import React, { Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
// import Home from './components/home';
import Cookbook from './components/cookbook';
import Login from './components/login';
import Signup from './components/signup';
import NotFound from './components/notFound';
import './App.css';

const App = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path='/' render={() => <Redirect to='/cookbook' />} />

        {/* <Route exact path ='/home' component={Home} /> */}
        <Route exact path ='/cookbook' component={Cookbook} />
        <Route exact path ='/login' component={Login} />
        <Route exact path ='/signup' component={Signup} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  )
}

export default withRouter(App)
