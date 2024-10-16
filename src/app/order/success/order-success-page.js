'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function OrderSuccessPage() {
  const router = useRouter();
  const [orders_number, setOrdersNumber] = useState(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ordersNumber = localStorage.getItem('orders_number');
      if (ordersNumber) {
        setOrdersNumber(ordersNumber);
      }
    }
  }, []);

  return (
    <div className='order-success-wrapper'>
      <div className='order-success-text'>
        <h2>{`Su pedido ha sido creado con éxito con el número ${orders_number}`}</h2>
      </div>
      
      <div className='order-success-links'>
        <div className='order-success-link'>
          <Link href="/user/orders">VER MIS PEDIDOS</Link>
        </div>
        
        <div className='order-success-link'>
          <Link href="/">IR A LA PÁGINA PRINCIPAL</Link>
        </div>
      </div>
    </div>
  );
}