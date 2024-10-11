'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ImSpinner3 } from "react-icons/im";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/customers', { withCredentials: true });
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }  finally {
        setLoading(false); 
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div>
      <h2>TODOS CLIENTES</h2>
      {loading ? ( 
        <div className='spinner'>
          <ImSpinner3 className="spinner-icon" />
        </div>
      ) : (
        <div>
          {customers.length === 0 ? (
            <p>No customers found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Nombre y Apellido</th>
                  <th>Email</th>
                  <th>Dirección</th>
                  <th>Número de Teléfono</th>
                  <th>Número de Pedidos</th>
                  <th>Total Gastado</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={index}>
                    <td>{customer.full_name}</td>
                    <td>{customer.email}</td>
                    <td dangerouslySetInnerHTML={{ __html: customer.address }}></td>
                    <td>+{customer.phone_number}</td>
                    <td>{customer.order_count}</td>
                    <td>{(customer.total_spent || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
