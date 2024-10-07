import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/reducers/authReducer';

export default function Admin() {
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
          <NavLink to="/admin/profile">PERFIL DE ADMINISTRADOR</NavLink><br/>
        </div>
        
        <div className='category-link'>
          <NavLink to="/admin/orders">TODOS PEDIDOS</NavLink><br/>
        </div>

        <div className='category-link'>
          <NavLink to="/admin/customers">TODOS CLIENTES</NavLink><br/>
        </div>
        
        <div className='category-link'>
          <NavLink to="/admin/create-admin">AGREGAR NUEVO ADMINISTRADOR</NavLink><br/>
        </div>
      </div>
      
      <div className='button-wrapper'>
        <button className='btn' onClick={handleLogout}>CERRAR SESIÓN</button>
      </div>
      
    </div>
  );
}