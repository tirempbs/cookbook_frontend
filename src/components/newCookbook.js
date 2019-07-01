import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import withAuth from '../hocs/withAuth';
import { Header, Input, Form, Container, Segment, Grid, Card, Icon, Button } from 'semantic-ui-react';
import Nav from './nav';
import { cookbookInputUpdate, createCookbook, fetchCookbooks } from '../actions/cookbook';
import { fetchCurrentUser } from '../actions/user';

class NewCookbook extends React.Component {

  handleCookbookSubmit = () => {
    const user_id = this.props.user.id
    const title = this.props.cookbookUserInput
    this.props.createCookbook(user_id, title)
    window.location.reload()
  }

  filterCookbooks = () => {
    return this.props.cookbooks.filter(cb => cb.user_id === this.props.user.id)
  }

  renderCookbooks = () => {
    if (this.props.cookbooks) {
      const cookbooks = this.filterCookbooks()
      return cookbooks.map(cb =>
        <Grid.Column key={cb.id}>

          <Card>
            <Card.Content>
              <Icon name='book' size='huge' />
            </Card.Content>
            <Card.Content>
              <Card.Description>{cb.title}</Card.Description>
            </Card.Content>

            <Card.Content extra>
              <Link to='/cookbook'>
                <Button basic color='blue' id={cb.id}>
                  See Cookbook
                </Button>
              </Link>
            </Card.Content>
          </Card>

        </Grid.Column>
      )
    } else {
      return (
        <Segment padded basic>
          <h1>Create a cookbook!</h1>
        </Segment>
      )
    }
  }

  render() {
    console.log(this.props)
    return(
      <>
        <Nav />
        <Container>
          <Segment padded='very'>
            <Header as='h1'>New Cookbook</Header>
            <Form onSubmit={this.handleCookbookSubmit}>
              <Form.Group>
                <Input 
                  placeholder='Cookbook Name'
                  style={{ width: '300px' }}
                  value={this.props.cookbookUserInput}
                  onChange={this.props.cookbookInputUpdate}
                />
                <Form.Button content='Create Cookbook' />
              </Form.Group>
            </Form>
            <Grid columns={5}>
              {this.renderCookbooks()}
            </Grid>
          </Segment >
        </Container>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.usersReducer.user,
    cookbookUserInput: state.cookbooksReducer.cookbookUserInput,
    cookbooks: state.cookbooksReducer.cookbooks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
    cookbookInputUpdate: (event) => dispatch(cookbookInputUpdate(event)),
    createCookbook: (user_id, title) => dispatch(createCookbook(user_id, title)),
    fetchCookbooks: () => dispatch(fetchCookbooks())
  }
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(NewCookbook))