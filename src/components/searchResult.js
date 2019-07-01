import React from 'react';
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth';
import { Container, Divider, Header, Image, List, Segment, Grid, Item,Form, Button, Icon } from 'semantic-ui-react';
import Nav from './nav';
import { Link } from 'react-router-dom';

class SearchResult extends React.Component {

  state = {}

  handleDropdownChange = (e, { value }) => this.setState({ value })

  renderIngredients = () => {
    if (this.props.singleRecipeResult.ingredientLines) {
      const ingredients = this.props.singleRecipeResult.ingredientLines
      return ingredients.map( (i, index) => <List.Item key={index}>{i}</List.Item>)
    }
  }

  renderAttribution = () => {
    if (this.props.singleRecipeResult) {
      const recipe = this.props.singleRecipeResult
      return (
        <Segment padded>
          <Header size='large'>Directions</Header>
            <Item>
              <Item.Content>
                <Item.Meta>
                  View at: <a 
                    href={recipe.source.sourceRecipeUrl}
                    target='_blank'
                    rel="noopener noreferrer"
                  >{recipe.source.sourceDisplayName}</a>
                </Item.Meta>
                <Item.Meta>
                  <a 
                    href={recipe.attribution.url} 
                    target='_blank'
                    rel="noopener noreferrer"
                  >{recipe.name} recipe</a> information powered by
                  <img alt='Yummly' src={recipe.attribution.logo} />
                </Item.Meta>
              </Item.Content>
            </Item>
        </Segment>
      )
    }
  }

  addRecipeToCookbook = (cookbook_id, recipe_id) => {
    const cookbookURL = `${process.env.REACT_APP_API_ENDPOINT}/api/v1/cookbook_recipes`

    fetch(cookbookURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        cookbook_recipe: {
          cookbook_id: cookbook_id,
          recipe_id: recipe_id
        }
      })
    })
      .then(r => r.json())
      .then(r => console.log(r))
  }

  loopIngredientAdd = (recipeID) => {
    const ingredients = this.props.singleRecipeResult.ingredientLines
    const ingredientURL = `${process.env.REACT_APP_API_ENDPOINT}/api/v1/ingredients`

    ingredients.forEach(i=> 
      fetch(ingredientURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
          ingredient: {
            recipe_id: recipeID,
            line_item: i
          }
        })
      })
        .then(r => r.json())
        .then(r => console.log(r))
    )
  }

  handleRecipeAddSubmit = () => {
    const recipe = this.props.singleRecipeResult
    const recipeBody = {
      title: recipe.name,
      image_url: recipe.images[0].hostedLargeUrl,
      source_url: recipe.source.sourceRecipeUrl,
      publisher_name: recipe.source.sourceDisplayName,
      publisher_url: recipe.source.sourceSiteUrl,
      user_generated: false
    }
    const recipeURL = `${process.env.REACT_APP_API_ENDPOINT}/api/v1/recipes`

    fetch(recipeURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        recipe: recipeBody
      })
    })
      .then(response => response.json())
      .then(recipe => {
        this.loopIngredientAdd(recipe.id)
        this.addRecipeToCookbook(this.state.value, recipe.id)
      })


  } // end of Handle Recipe Add Submit

  filterCookbooks = () => {
    return this.props.cookbooks.filter(cb => cb.user_id === this.props.user.id)
  }

  renderCookbookOptions = () => {
    const cookbooks = this.filterCookbooks()
    return cookbooks.map(cb=> ({text: cb.title, value: cb.id, icon: 'book'}))
  }

  renderCookbookAdd = () => {
    if (this.props.singleRecipeResult) {
      // const recipe = this.props.singleRecipeResult
      const { value } = this.state
      const cookbookOptions = this.renderCookbookOptions()

      return (
        <Segment>
          <Form onSubmit={this.handleRecipeAddSubmit}>
            <Form.Group>
              <Form.Dropdown 
                placeholder='Select Cookbook' 
                selection 
                options={cookbookOptions} 
                onChange={this.handleDropdownChange}
                value={value}
              />
              
              <Form.Button animated>
                <Button.Content visible>Add to Cookbook</Button.Content>
                <Button.Content hidden><Icon name='right arrow' /></Button.Content>
                <Link to='/search' />
              </Form.Button>
        
            </Form.Group>
          </Form>
        </Segment>
      )
    }
  }

  renderRecipeResult = () => {
    if (this.props.singleRecipeResult) {
      const recipe = this.props.singleRecipeResult
      return (
        <Container>
          <Segment padded>
            <Header size='huge'>{recipe.name}</Header>
            <Divider />
            <Grid columns={2} relaxed>
              <Grid.Column>
                <Segment>
                  <Image src={recipe.images[0].hostedLargeUrl} rounded centered bordered/>
                  <Header size='large'>Ingredients</Header>
                  <List bulleted>
                    {this.renderIngredients()}
                  </List>
                </Segment>
              </Grid.Column>

              <Grid.Column>
                {this.renderAttribution()}
                {this.renderCookbookAdd()}
              </Grid.Column>
            </Grid>
          </Segment>
        </Container>
      )
    }
  }

  render() {
    return (
      <>
        <Nav />
        {this.renderRecipeResult()}
      </>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    singleRecipeResult: state.searchReducer.singleRecipeResult,
    user: state.usersReducer.user,
    cookbooks: state.cookbooksReducer.cookbooks,
    newRecipeId: state.recipesReducer.newRecipeId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(SearchResult))