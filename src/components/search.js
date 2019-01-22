import React from 'react';
import { connect } from 'react-redux';
import { Input, Form, Segment, Button, Icon } from 'semantic-ui-react';
import withAuth from '../hocs/withAuth';
import { inputUpdate, recipeSearch } from '../actions/search';

class Search extends React.Component {

  handleSubmit = () => {
    this.props.recipeSearch(this.props.userInput)
  }

  render () {
    console.log(this.props)
    return (
      <>
        <Segment basic padded>
          <Form onSubmit={this.handleSubmit}>
            <Input 
              type='text'
              placeholder='Search recipes...' 
              onChange={this.props.inputUpdate}
              value={this.props.userInput}
              action
            >
            <input />
            <Button animated type='submit' color='blue'>
              <Button.Content visible>Search</Button.Content>
              <Button.Content hidden>
                <Icon name='search' />
              </Button.Content>
            </Button>
            </Input>
          </Form>
        </Segment>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInput: state.searchReducer.userInput,
    searchResults: state.searchReducer.searchResults
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    inputUpdate: (event) => dispatch(inputUpdate(event)),
    recipeSearch: (userInput) => dispatch(recipeSearch(userInput))
  }
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Search))