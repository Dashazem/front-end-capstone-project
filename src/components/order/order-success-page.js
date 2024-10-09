import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function OrderSuccessPage() {
  const location = useLocation();
  const orders_number = location.state?.orders_number; 

  return (
    <div>
      <div>
        <h2>{`Su pedido ha sido creado exitosamente con el número ${orders_number}`}</h2>
      </div>
      
      <div>
        <div>
        <NavLink to="/user/orders">VER MIS PEDIDOS</NavLink>
        </div>

        <div>
        <NavLink to="/">IR A LA PÁGINA PRINCIPAL</NavLink>
        </div>
      </div>
    </div>
  );
}