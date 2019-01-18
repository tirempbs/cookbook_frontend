import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { createUser } from '../actions/user';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

class Signup extends Component {
  state = { username: '', password: '' }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleLoginSubmit = () => {
    this.props.createUser(this.state.username, this.state.password)
    this.setState({ username: '', password: '' })
  }

  render() {
    return this.props.loggedIn ? (
      <Redirect to='/' />
    ) : (
        <div className='login-form'>
          <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
      `}</style>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='blue' textAlign='center'>
                Sign Up for Cookbook
            </Header>
              <Form
                size='large'
                onSubmit={this.handleLoginSubmit}
                loading={this.props.authenticatingUser}
                error={this.props.failedLogin}
              >
                <Message error header={this.props.failedLogin ? this.props.error : null} />
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    name='username'
                    placeholder='Username'
                    onChange={this.handleChange}
                    value={this.state.username}
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    name='password'
                    placeholder='Password'
                    type='password'
                    onChange={this.handleChange}
                    value={this.state.password}
                  />

                  <Button
                    fluid color='blue'
                    size='large'
                    type='submit'
                  >
                    Create Account
                </Button>
                </Segment>
              </Form>
              <Message>
                Already a member? <a href='/login'>Log In</a>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
      )
  }
}

const mapStateToProps = ({ usersReducer: { authenticatingUser, failedCreation, error, loggedIn } }) => ({
  authenticatingUser,
  failedCreation,
  error,
  loggedIn
})

export default withRouter(connect(mapStateToProps, { createUser })(Signup))