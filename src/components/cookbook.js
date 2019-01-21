import React, { Component } from 'react';
import { Grid, Image, Container, Card, Header } from 'semantic-ui-react'
import { fetchCookbooks } from '../actions/cookbook';
import { fetchCurrentUser } from '../actions/user';
import { fetchRecipes } from '../actions/recipe';
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth';
import Nav from './nav';

class Cookbook extends Component {
  
  componentDidMount = () => {
    this.props.fetchCookbooks()
    this.props.fetchRecipes()
  }

  filterCookbooks = () => {
    return this.props.cookbooks.filter(cb=>cb.user_id === this.props.user.id)
  }

  filterRecipes = () => {
    if (this.props.selectedCookbook.cookbook_recipes) {
      const recipe_ids = this.props.selectedCookbook.cookbook_recipes.map(r => r.recipe_id)
      return this.props.recipes.filter(r => recipe_ids.indexOf(r.id) >= 0)
    }
  }

  renderRecipeCards = () => {
    const filteredRecipes = this.filterRecipes()

    if (filteredRecipes) {
      return filteredRecipes.map(r => 
        <Grid.Column key={r.id}>
          <Card>
            <Image src={r.image_url} />
            <Card.Content>
              <Card.Header>{r.title}</Card.Header>
            </Card.Content>
          </Card>
        </Grid.Column>
      )
    }
  }  
  
  render() {
    const filteredCookbooks = this.filterCookbooks()
    
    return (
      <div>
        <Nav filteredCookbooks={filteredCookbooks}/>
        <Container>
          <Header as='h1'>{this.props.selectedCookbook.title}</Header>
          <Grid columns={4}>
            {this.renderRecipeCards()}
          </Grid>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.usersReducer.user,
    cookbooks: state.cookbooksReducer.cookbooks,
    selectedCookbook: state.cookbooksReducer.selectedCookbook,
    recipes: state.recipesReducer.recipes,
    selectedRecipes: state.recipesReducer.selectedRecipes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCookbooks: () => dispatch(fetchCookbooks()),
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
    fetchRecipes: () => dispatch(fetchRecipes())
  }
} 

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Cookbook))