'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaUser, FaUserTie, FaBagShopping } from "react-icons/fa6";

import logo from '../../../static/assets/images/logo/logo-shop.png';
import CategoriesModal from '../modals/categories-modal';
import { loginSuccess, setLoading } from "../../store/reducers/authReducer";


const NavBar = () => {
  const userEmail = useSelector(state => state.auth.email); 
  const userRole = useSelector(state => state.auth.role);
  const userName = useSelector(state => state.auth.first_name);
  const dispatch = useDispatch();
  const [categoriesModalIsOpen, setCategoriesModalIsOpen] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        dispatch(loginSuccess(parsedUser));
      }
      dispatch(setLoading(false)); 
    }
  }, [dispatch]);
  
  const handleOpenAllCategoriesClick = () => {
    setCategoriesModalIsOpen(true);
  };

  const handleCloseAllCategories = () => {
    setCategoriesModalIsOpen(false);
  };

  return (
    <div className='navbar'>
      <div className='left-column'>
        <CategoriesModal 
          handleCloseAllCategories={handleCloseAllCategories} 
          modalIsOpen={categoriesModalIsOpen} 
        /> 
        <a onClick={handleOpenAllCategoriesClick}>
          <FaBars className='nav-icon' />
        </a>
      </div>

      <div className='central-column'>
        <Link href="/">
          <Image
            src={logo}
            alt="Logo"
            fill
            sizes="(max-width: 600px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </Link>
      </div>

      <div className='right-column'>
         
        {userEmail ? (
          userRole === "ADMIN" ? (
            <div className='icon-wrapper'>
              <Link href="/admin">
                <FaUserTie className='nav-icon'/>
              </Link>
              <div className='user-name'>{userName}</div>
            </div>
          ) : userRole === "USER" ? (
            <div className='icon-wrapper'>
              <Link href="/user">
                <FaUser className='nav-icon'/>
              </Link>
              <div className='user-name'>{userName}</div>
            </div>
          ) : (
            <div>
              <Link href="/login">
                <FaUser className='nav-icon'/>
              </Link>
            </div>
        )) : (
          <div>
            <Link href="/login">
              <FaUser className='nav-icon'/>
            </Link>
          </div>
        )}

        <div>
          <Link href="/cart">
            <FaBagShopping className='nav-icon' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

