'use client';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

import Image from 'next/image';
import logo from '../../../static/assets/images/logo/logo-shop.png';
import CategoriesModal from '../modals/categories-modal';

export default class NavBar extends Component {
  constructor() {
    super();

    this.state = {
      userStatus: "",
      categoriesModalIsOpen: false
    }

    this.handleOpenAllCategoriesClick =  this.handleOpenAllCategoriesClick.bind(this);
    this.handleCloseAllCategories = this.handleCloseAllCategories.bind(this);
  }

  handleOpenAllCategoriesClick() {
    this.setState({
      categoriesModalIsOpen: true
    });
  } 

  handleCloseAllCategories() {
    this.setState({
      categoriesModalIsOpen: false
    });
  }

  render() {
    return (
      <div className='navbar'>
        
        <div>
          <CategoriesModal 
            handleCloseAllCategories={this.handleCloseAllCategories} 
            modalIsOpen={this.state.categoriesModalIsOpen} 
          /> 
          <a onClick={this.handleOpenAllCategoriesClick}><FontAwesomeIcon icon="fa-bars" className='nav-icon' /></a>
        </div>

        <div className='central-column'>
          <NavLink to="/">
            <Image
              src={logo}
              alt="Logo"
              layout="fill"
              objectFit="cover"
              priority
            />
          </NavLink>
        </div>

        <div className='right-side'>
          {this.state.userStatus === "ADMIN" ? 
            (<div>
            <NavLink to="/login">
              <FontAwesomeIcon icon="fa-user-tie" className='nav-icon'/>
            </NavLink>
            </div>)
          : (<div>
            <NavLink to="/login">
              <FontAwesomeIcon icon="fa-user" className='nav-icon'/>
            </NavLink>
          </div>) }
          
          
          <div>
            <NavLink to="/cart">
              <FontAwesomeIcon icon="fa-bag-shopping" className='nav-icon'/>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}