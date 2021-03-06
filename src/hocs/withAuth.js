import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
// import * as actions from '../actions'
import { fetchCurrentUser } from '../actions/user'
import { Loader } from 'semantic-ui-react'

const withAuth = (WrappedComponent) => {
  class AuthorizedComponent extends React.Component {
    componentDidMount() {
      // POTENTIAL SECURITY FLAW!!! my tokens don't expire
      if (localStorage.getItem('jwt') && !this.props.loggedIn) this.props.fetchCurrentUser()
    }

    render() {
      if (localStorage.getItem('jwt') && this.props.loggedIn) {
        return <WrappedComponent />
      } else if (localStorage.getItem('jwt') && (this.props.authenticatingUser || !this.props.loggedIn)) {
        return <Loader active inline="centered" />
      } else {
        return <Redirect to='/login' />
      }
    }
  }

  const mapStateToProps = (state) => {
    return {
      loggedIn: state.usersReducer.loggedIn,
      authenticatingUser: state.usersReducer.authenticatingUser
    }
  }

  const mapDispatchToProps = { fetchCurrentUser: fetchCurrentUser }

  return connect(mapStateToProps, mapDispatchToProps)(AuthorizedComponent)
}

export default withAuth