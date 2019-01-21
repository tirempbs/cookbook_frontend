import React, { Component } from 'react';
import { Menu, Button, Dropdown } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Search from './search';
import { logoutUser } from '../actions/user';
import { setCookbook } from '../actions/cookbook';
import { setRecipes } from '../actions/recipe';

class Nav extends Component {
  state = { 
    activeItem: ''
 }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleLogoutSubmit = () => {
    localStorage.clear()
    this.props.logoutUser()
    window.location.reload()
  }

  handleNavClick = (e) => {
    const foundCookbook = this.props.filteredCookbooks.find(cb=>cb.title===e.target.innerText)
    
    this.props.setCookbook(foundCookbook)
    this.props.setRecipes()
  }

  renderCookbookTitles = () => {
    return this.props.filteredCookbooks.map(cookbook => 
    <Dropdown.Item onClick={this.handleNavClick} key={cookbook.id}>{cookbook.title}</Dropdown.Item>
    )
  }

  render() {
    const { activeItem } = this.state
   
    return (
      <Menu pointing secondary>
        <Menu.Item
          header
          name='home'
          text='Home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        >
        </Menu.Item>

        <Dropdown 
          item
          name='cookbooks' 
          text='Cookbooks'  
          onClick={this.handleItemClick}
        >
          <Dropdown.Menu>
            {this.renderCookbookTitles()}
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Menu position='right'>
          <Menu.Item >
            <Search />
          </Menu.Item>
          
          <Menu.Item>
            <Button primary onClick={this.handleLogoutSubmit}>Logout</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedCookbook: state.cookbooksReducer.selectedCookbook
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    setCookbook: (cookbookData) => dispatch(setCookbook(cookbookData)),
    setRecipes: (recipeData) => dispatch(setRecipes(recipeData))
  }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav))