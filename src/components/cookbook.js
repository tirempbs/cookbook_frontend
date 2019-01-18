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



  render() {
    const filteredCookbooks = this.filterCookbooks()
    console.log(this.props)
    return (
      <div>
        <Nav filteredCookbooks={filteredCookbooks}/>
        <Container>
          <Header as='h1'>{this.props.selectedCookbook.title}</Header>
          <Grid columns={4}>
            <Grid.Column>
              <Card>
                <Image src='/images/avatar/large/matthew.png' />
                <Card.Content>
                  <Card.Header>Card Header</Card.Header>
                </Card.Content>
              </Card>
            </Grid.Column>
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
    recipes: state.recipesReducer.recipes
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