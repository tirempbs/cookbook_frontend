import React from 'react';
import { Grid, Image, Container, Card, Header } from 'semantic-ui-react'
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth';

class Cookbook extends React.Component {
  
  filterRecipes = () => {
    if (this.props.selectedCookbook.cookbook_recipes) {
      const ids = this.props.selectedCookbook.cookbook_recipes.map(r=>r.recipe_id)
      return this.props.recipes.filter(r=>ids.indexOf(r.id) >= 0)
    }
  }

  renderRecipes = () => {
    if (this.props.selectedCookbook.cookbook_recipes) {
      const filteredRecipes = this.filterRecipes()
      return filteredRecipes.map(r=>
        <Grid.Column key={r.id}>
          <Image src={r.image_url}/>
          <Card.Content>
            <Card.Header>{r.title}</Card.Header>
          </Card.Content>
        </Grid.Column>
      )
    }
  }

  render() {
    console.log(this.props)
    return (
      <>
        <Container>
          <Header as='h1'>{this.props.selectedCookbook.title}</Header>
          <Grid columns={4}>
            {this.renderRecipes()}
          </Grid>
        </Container>
      </>
    )
  }

} //end of Cookbook component

const mapStateToProps = (state) => {
  return {
    selectedCookbook: state.cookbooksReducer.selectedCookbook,
    recipes: state.recipesReducer.recipes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
} 

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Cookbook))