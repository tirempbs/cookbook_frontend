import React from 'react';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth';
import { fetchCookbooks, setCookbook } from '../actions/cookbook';
import { logoutUser, fetchCurrentUser } from '../actions/user';
import { fetchRecipes } from '../actions/recipe';

class Nav extends React.Component {

  state = { activeItem: '' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

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
      <Dropdown.Item key={cb.id} as={Link} to='/cookbook' onClick={this.handleSelectCookbook}>
        {cb.title}
      </Dropdown.Item>
    )
  }

  handleLogout = () => {
    localStorage.clear()
    this.props.logoutUser()
    window.location.reload()
  }

  render() {
    const { activeItem } = this.state
    return (
      <>
        <Menu inverted color='blue' borderless>
          <Menu.Item>
            <Icon circular inverted name='utensils' color='teal' size='large' />
          </Menu.Item>

          <Menu.Item as={Link} name='new cookbook' to='/cookbook/new' active={activeItem === 'new cookbook'} onClick={this.handleItemClick}>
            New Cookbook
          </Menu.Item>

          <Dropdown item text='Cookbooks' onClick={this.handleItemClick}>
            <Dropdown.Menu>
              {this.renderDropdownItems()}
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item as={Link} name='search' to='/search' active={activeItem === 'search'} onClick={this.handleItemClick}>
            Search
          </Menu.Item>

          <Menu.Menu position='right'>

            <Menu.Item content='Logout' onClick={this.handleLogout} />

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