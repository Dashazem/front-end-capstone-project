import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/reducers/authReducer';
import axios from 'axios';

export default function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState(null); 
  const userId = useSelector(state => state.auth.id);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/customers/${userId}`);
        setCustomerData(response.data.customer);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, [userId]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); 
  };

  return (
    <div className='account-page'>
       {customerData ? (
        <>
          <h2>{customerData.first_name} {customerData.surname}</h2>
          <p>Email: {customerData.email}</p>
          <p>Teléfono: +{customerData.contact.phone_number}</p>
        </>
      ) : (
        <p>Loading customer data...</p> 
      )}
      
      <div className='category-links'>
        <div className='category-link'>
          <NavLink to="/user/profile">CAMBIAR DATOS DE PERFIL</NavLink><br/>
        </div>
        
        <div className='category-link'>
          <NavLink to="/user/orders">MIS PEDIDOS</NavLink><br/>
        </div>

        <div className='category-link'>
          <NavLink to="/user/addresses" state={{ customerData }}>MIS DIRECCIONES</NavLink><br/>
        </div>
        
      </div>
      
      <div className='button-wrapper'>
        <button className='btn' onClick={handleLogout}>CERRAR SESIÓN</button>
      </div>
      
    </div>
  );
}