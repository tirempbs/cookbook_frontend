import React from 'react'
import Nav from './nav';
import Cookbook from './cookbook';
import withAuth from '../hocs/withAuth'
import { fetchCookbook } from '../actions/cookbook';
import { fetchRecipes } from '../actions/recipe';
import { connect } from 'react-redux';

class Home extends React.Component {

  render() {
    
    return (
      <>
        <Nav />
        <Cookbook />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.usersReducer.user,
    cookbooks: state.cookbooksReducer.cookbooks,
    recipes: state.recipesReducer.recipes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCookbook: () => dispatch(fetchCookbook()),
    fetchRecipes: () => dispatch(fetchRecipes())
  }
} 

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Home))