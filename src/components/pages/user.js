import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/reducers/authReducer';

export default function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); 
  };

  return (
    <div className='account-page'>
      <div className='category-links'>
        <div className='category-link'>
          <NavLink to="/user/profile">MI PERFIL</NavLink><br/>
        </div>
        
        <div className='category-link'>
          <NavLink to="/user/orders">MIS PEDIDOS</NavLink><br/>
        </div>

        <div className='category-link'>
          <NavLink to="/user/addresses">MIS DIRECCIONES</NavLink><br/>
        </div>
        
        <div className='category-link'>
          <NavLink to="/user/payment-details">MIS MÉTODOS DE PAGO</NavLink><br/>
        </div>
      </div>
      
      <div className='button-wrapper'>
        <button className='btn' onClick={handleLogout}>CERRAR SESIÓN</button>
      </div>
      
    </div>
  );
}