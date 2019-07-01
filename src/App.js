import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import NewCookbook from './components/newCookbook';
import Cookbook from './components/cookbook';
import Search from './components/search';
import SearchResult from './components/searchResult';
import Login from './components/login';
import Signup from './components/signup';
import NotFound from './components/notFound';
import './App.css';

const App = () => {
  return (
    <Switch>
      <Route exact path='/' render={() => <Redirect to='/cookbook' />} />

      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/search' component={Search} />
      <Route exact path='/search/result' component={SearchResult} />
      <Route exact path='/cookbook' component={Cookbook} />
      <Route exact path='/cookbook/new' component={NewCookbook} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default withRouter(App)
