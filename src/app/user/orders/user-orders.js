'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ImSpinner3 } from "react-icons/im";

const UserOrders = () => {
  const userId = useSelector(state => state.auth.id);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/orders/user/${userId}`, { withCredentials: true });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchOrders();
  }, [userId]);

  const handleOrderClick = async (orderNumber) => {
    try {
      const response = await axios.get(`http://localhost:5000/orders/user/number/${orderNumber}`, { withCredentials: true });
      setSelectedOrder(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  return (
    <div>
      <h2>MIS PEDIDOS</h2>

      {loading ? ( 
        <div className='spinner'>
          <ImSpinner3 className="spinner-icon" />
        </div>
      ) : (
      <div>
        {orders.length === 0 ? (
          <p>Todavía no tienes pedidos</p>
        ) : (
          <ul>
            {orders.map(order => (
              <li key={order.order_number}>
                <button onClick={() => handleOrderClick(order.order_number)}>
                  {order.order_number} - {order.total_price} - {new Date(order.date).toLocaleString()}
                </button>
              </li>
            ))}
          </ul>
        )}

        {selectedOrder && (
          <div>
            <h3>Detalles del pedido: {selectedOrder.order_number}</h3>
            <ul>
              {selectedOrder.products.map(product => (
                <li key={product.id}>
                  <h4>{product.name}</h4>
                  <p>Precio: {product.price} - Cantidad: {product.quantity} - Ref. ID: {product.id}</p>
                </li>
              ))}
            </ul>
            <p>Total: {selectedOrder.total_price}</p>
            <h4>Dirección de entrega:</h4>
            <p>{selectedOrder.address.street_one}, {selectedOrder.address.city}, {selectedOrder.address.province}, {selectedOrder.address.country}, {selectedOrder.address.postal_code}</p>
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export default UserOrders;
