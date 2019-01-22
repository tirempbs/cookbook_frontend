import React from 'react';
import { Menu, Button, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth';
import { fetchCookbooks, setCookbook } from '../actions/cookbook';
import { logoutUser, fetchCurrentUser } from '../actions/user';
import { fetchRecipes } from '../actions/recipe';

class Nav extends React.Component {
  componentDidMount() {
    this.props.fetchCookbooks()
    this.props.fetchCurrentUser()
    this.props.fetchRecipes()
  }

  filterCookbooks = () => {
    return this.props.cookbooks.filter(cb=>cb.user_id === this.props.user.id)
  }

  handleSelectCookbook = event => {
    const foundCookbook = this.props.cookbooks.find(cb=>cb.title===event.target.innerText)
    this.props.setCookbook(foundCookbook)
  }

  renderDropdownItems = () => {
    const filteredCookbooks = this.filterCookbooks()

    return filteredCookbooks.map(cb =>
      <Dropdown.Item key={cb.id} onClick={this.handleSelectCookbook}>
      <Link to='/cookbook'>
      {cb.title}
      </Link>
      </Dropdown.Item>
    )
  }

  handleLogout = () => {
    localStorage.clear()
    this.props.logoutUser()
    window.location.reload()
  }

  render() {
    return (
      <>
        <Menu size='large'>
          <Dropdown item text='Cookbooks'>
            <Dropdown.Menu>
              {this.renderDropdownItems()}
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item name='search'>
            <Link to='/search'>
            Search
            </Link>
          </Menu.Item>

          <Menu.Menu position='right'>
            <Menu.Item>
              <Button color='blue' onClick={this.handleLogout}>Logout</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </>
    )
  }

} // end of Nav Class


const mapStateToProps = (state) => {
  return {
    user: state.usersReducer.user,
    cookbooks: state.cookbooksReducer.cookbooks
  }
} 

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
    logoutUser: () => dispatch(logoutUser()),
    fetchCookbooks: () => dispatch(fetchCookbooks()),
    setCookbook: (cookbookData) => dispatch(setCookbook(cookbookData)),
    fetchRecipes: () => dispatch(fetchRecipes())
  }
} 

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Nav))