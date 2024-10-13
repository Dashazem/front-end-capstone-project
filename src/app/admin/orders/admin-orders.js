'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ImSpinner3 } from "react-icons/im";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const fetchOrders = async (currentPage) => {
    setLoadingMore(currentPage > 1);
    setLoading(currentPage === 1);

    try {
      const response = await axios.get(`http://localhost:5000/orders/admin?page=${currentPage}`, { withCredentials: true });
      setOrders(prevOrders => {
        const existingIds = new Set(prevOrders.map(order => order.order_number));
        const newOrders = response.data.orders.filter(order => !existingIds.has(order.order_number));
        return [...prevOrders, ...newOrders];
      });
      setTotalOrders(response.data.total);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoadingMore(false);
      setLoading(false);
    }
  };

  const handleOrderClick = async (orderNumber) => {
    try {
      const response = await axios.get(`http://localhost:5000/orders/admin/number/${orderNumber}`, { withCredentials: true });
      setSelectedOrder(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
      setSelectedOrder(null);
    }
  };

  const markAsSeen = async (orderNumber) => {
    try {
      await axios.patch(`http://localhost:5000/orders/mark-seen/${orderNumber}`, { withCredentials: true });
      setOrders(orders.map(order => 
        order.order_number === orderNumber ? { ...order, seen: true } : order
      ));
    } catch (error) {
      console.error('Error marking order as seen:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading && !loadingMore) {
        if (orders.length < totalOrders) {
          setPage(prevPage => prevPage + 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [orders, loading, loadingMore, totalOrders]);

  return (
    <div>
      <h2>TODOS LOS PEDIDOS</h2>

      {loading && orders.length === 0 ? (
        <div className='spinner'>
          <ImSpinner3 className="spinner-icon" />
        </div>
      ) : (
        <div>
          {orders.length === 0 ? (
            <p>No hay pedidos disponibles.</p>
          ) : (
            <ul>
              {orders.map(order => (
                <li key={order.order_number}>
                  <button onClick={() => handleOrderClick(order.order_number)}>
                    {order.order_number} - {order.total_price} - {new Date(order.date).toLocaleString()} 
                    {order.seen ? ' (Visto)' : ' (Nuevo)'}
                  </button>

                  {!order.seen && (
                    <button onClick={() => markAsSeen(order.order_number)}>Marcar como visto</button>
                  )}
                </li>
              ))}
            </ul>
          )}

          {selectedOrder && (
            <div>
              <h3>Detalles del pedido: {selectedOrder.order_number}</h3>
              {selectedOrder.customer ? (
                <>
                  <p>Cliente: {selectedOrder.customer.first_name} {selectedOrder.customer.surname}</p>
                  <p>Email: {selectedOrder.customer.email}</p>
                </>
              ) : (
                <p>Información del cliente no disponible.</p>
              )}
              {selectedOrder.contact && (
                <p>Teléfono: +{selectedOrder.contact.phone_number}</p>
              )}
              {selectedOrder.transaction && (
                <p>Transacción: {selectedOrder.transaction.number} - Monto: {selectedOrder.transaction.amount}</p>
              )}
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
      {loadingMore && (
        <div className='spinner'>
          <ImSpinner3 className="spinner-icon" />
        </div>
      )}
    </div>
  );
};

export default AdminOrders;

