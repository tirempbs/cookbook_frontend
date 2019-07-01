import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Segment, Container, Button, Grid, Image, Card, Divider, Icon } from 'semantic-ui-react';
import withAuth from '../hocs/withAuth';
import Nav from './nav';
import { inputUpdate, recipeSearch, singleRecipeFetch } from '../actions/search';

class Search extends React.Component {

  handleSearchSubmit = () => {
    if (this.props.userInput) {
      this.props.recipeSearch(this.props.userInput)
    }
  }

  handleRecipeClick = (event) => {
    this.props.singleRecipeFetch(event.target.id)
  }

  renderResults = () => {
    if (this.props.searchResults.matches) {
      const results = this.props.searchResults.matches
      return results.map(r =>
        <Grid.Column key={r.id}>

          <Card>
            <Card.Content>
              <Image floated='left' size='small' src={r.smallImageUrls[0]} />
            </Card.Content>
            <Card.Content>
              <Card.Header>{r.recipeName}</Card.Header>
              <Card.Meta>{r.sourceDisplayName}</Card.Meta>
            </Card.Content>

            <Card.Content extra>
              <Link to='/search/result'>
                <Button basic color='blue' id={r.id} onClick={this.handleRecipeClick}>
                  See Recipe
                </Button>
              </Link>
            </Card.Content>
          </Card>

        </Grid.Column>
      )
    } else {
      return (
      <Segment padded basic>
        <h1>Search for some recipes!</h1>
      </Segment>
      )
    }
  }

  render () {
    return (
      <>
        <Nav />
          <Container>
            <Segment padded>
              <Form onSubmit={this.handleSearchSubmit}>
                <Form.Group>
                  <Form.Input
                    style={{ width: '300px', height: '36px' }}
                    placeholder='Search By Ingredients or Name'
                    value={this.props.userInput}
                    onChange={this.props.inputUpdate}
                  />
                  <Form.Button animated>
                    <Button.Content visible>Search</Button.Content>
                    <Button.Content hidden><Icon name='search' /></Button.Content>
                  </Form.Button>
                </Form.Group>
              </Form>
              <Divider />
              <Grid columns={5}>
                {this.renderResults()}
              </Grid>
            </Segment>
          </Container>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInput: state.searchReducer.userInput,
    searchResults: state.searchReducer.searchResults,
    singleRecipeResult: state.searchReducer.singleRecipeResult
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    inputUpdate: (event) => dispatch(inputUpdate(event)),
    recipeSearch: (userInput) => dispatch(recipeSearch(userInput)),
    singleRecipeFetch: (recipeID) => dispatch(singleRecipeFetch(recipeID))
  }
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Search))