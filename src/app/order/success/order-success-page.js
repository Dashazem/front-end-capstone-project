'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function OrderSuccessPage() {
  const router = useRouter();
  const [orders_number, setOrdersNumber] = useState(null);
  
  useEffect(() => {
    const ordersNumber = localStorage.getItem('orders_number');
    if (ordersNumber) {
      setOrdersNumber(ordersNumber);
    }
  }, []);

  return (
    <div>
      <div>
        <h2>{`Su pedido ha sido creado exitosamente con el número ${orders_number}`}</h2>
      </div>
      
      <div>
        <div>
        <Link href="/user/orders">VER MIS PEDIDOS</Link>
        </div>

        <div>
        <Link href="/">IR A LA PÁGINA PRINCIPAL</Link>
        </div>
      </div>
    </div>
  );
}