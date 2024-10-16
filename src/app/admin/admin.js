'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux'; 
import { useRouter } from 'next/navigation';
import { logout } from '../../store/reducers/authReducer';

export default function Admin() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      const cart = localStorage.getItem('cart');
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    router.push('/'); 
  };

  return (
    <div className='account-page'>
      <div className='category-links'>
        <div className='category-link'>
          <Link href="/admin/profile">PERFIL DE ADMINISTRADOR</Link><br/>
        </div>
        
        <div className='category-link'>
          <Link href="/admin/orders">TODOS PEDIDOS</Link><br/>
        </div>

        <div className='category-link'>
          <Link href="/admin/customers">TODOS CLIENTES</Link><br/>
        </div>
        
        <div className='category-link'>
          <Link href="/admin/create-admin">AGREGAR NUEVO ADMINISTRADOR</Link><br/>
        </div>

        <div className='category-link'>
          <Link href="/admin/create-product">CREAR NUEVO PRODUCTO</Link><br/>
        </div>
      </div>
      
      <div className='button-wrapper'>
        <button className='btn' onClick={handleLogout}>CERRAR SESIÓN</button>
      </div>
    </div>
  );
}