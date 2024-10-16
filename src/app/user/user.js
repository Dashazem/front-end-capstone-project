'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux'; 
import { useRouter } from 'next/navigation';
import { logout } from '../../store/reducers/authReducer';
import axios from 'axios';

export default function User() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [customerData, setCustomerData] = useState(null); 
  const userId = useSelector(state => state.auth.id);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`https://back-end-capstone-project.onrender.com/customers/${userId}`, { withCredentials: true });
        setCustomerData(response.data.customer);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, [userId]);

  const handleLogout = () => {
    dispatch(logout());
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('cart');
    }
    router.push('/'); 
  };

  return (
    <div className='account-page'>
       {customerData ? (
        <div className='customer-data'>
          <h2>{customerData.first_name} {customerData.surname}</h2>
          <p>Email: {customerData.email}</p>
          <p>Teléfono: +{customerData.contact.phone_number}</p>
        </div>
      ) : (
        <p>Loading customer data...</p> 
      )}
      
      <div className='category-links'>
        <div className='category-link'>
          <Link href="/user/profile">CAMBIAR DATOS DE PERFIL</Link><br/>
        </div>
        
        <div className='category-link'>
          <Link href="/user/orders">MIS PEDIDOS</Link><br/>
        </div>

        <div className='category-link'>
          <Link href="/user/addresses" state={{ customerData }}>MIS DIRECCIONES</Link><br/>
        </div>
        
      </div>
      
      <div className='button-wrapper'>
        <button className='btn' onClick={handleLogout}>CERRAR SESIÓN</button>
      </div>
    </div>
  );
}