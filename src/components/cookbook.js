import React from 'react';
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth';
import { Container, Segment, Grid, Image, Card, Header, Divider } from 'semantic-ui-react';
import Nav from './nav';

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
          <Card>
            <Image src={r.image_url}/>
            <Card.Content>
              <Card.Header>{r.title}</Card.Header>
            </Card.Content>
          </Card>
        </Grid.Column>
      )
    } else {
      return (
        <Segment padded basic>
          <h1>Select a cookbook!</h1>
        </Segment>
      )
    }
  }

  render() {
    return (
      <>
        <Nav />
        <Container>
          <Segment>
            <Header as='h1'>{this.props.selectedCookbook.title}</Header>
          <Divider />
            <Grid columns={4}>
              {this.renderRecipes()}
            </Grid>
          </Segment >
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