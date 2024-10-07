import React, { useState } from 'react';
import { useSelector } from 'react-redux'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import Image from 'next/image';
import logo from '../../../static/assets/images/logo/logo-shop.png';
import CategoriesModal from '../modals/categories-modal';

const NavBar = () => {
  const userEmail = useSelector(state => state.auth.email); 
  const userRole = useSelector(state => state.auth.role);
  const userName = useSelector(state => state.auth.first_name);
  const [categoriesModalIsOpen, setCategoriesModalIsOpen] = useState(false);

  const handleOpenAllCategoriesClick = () => {
    setCategoriesModalIsOpen(true);
  };

  const handleCloseAllCategories = () => {
    setCategoriesModalIsOpen(false);
  };

  return (
    <div className='navbar'>
      <div>
        <CategoriesModal 
          handleCloseAllCategories={handleCloseAllCategories} 
          modalIsOpen={categoriesModalIsOpen} 
        /> 
        <a onClick={handleOpenAllCategoriesClick}>
          <FontAwesomeIcon icon="fa-bars" className='nav-icon' />
        </a>
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
         
        {userEmail ? (
          userRole === "ADMIN" ? (
            <div className='icon-wrapper'>
              <NavLink to="/admin">
                <FontAwesomeIcon icon="fa-user-tie" className='nav-icon' />
              </NavLink>
              <div className='user-name'>{userName}</div>
            </div>
          ) : userRole === "USER" ? (
            <div className='icon-wrapper'>
              <NavLink to="/user">
                <FontAwesomeIcon icon="fa-user" className='nav-icon' />
              </NavLink>
              <div className='user-name'>{userName}</div>
            </div>
          ) : (
            <div>
              <NavLink to="/login">
                <FontAwesomeIcon icon="fa-user" className='nav-icon' />
              </NavLink>
            </div>
        )) : (
          <div>
            <NavLink to="/login">
              <FontAwesomeIcon icon="fa-user" className='nav-icon' />
            </NavLink>
          </div>
        )}

        <div>
          <NavLink to="/cart">
            <FontAwesomeIcon icon="fa-bag-shopping" className='nav-icon' />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

