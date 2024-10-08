import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UserAddresses() {
  const location = useLocation();
  const navigate = useNavigate();
  const customerData = location.state?.customerData; 
  const [addresses, setAddresses] = useState([]);
  const [message, setMessage] = useState(''); 

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/customers/${customerData.customer_id}/addresses`);
        setAddresses(response.data.addresses);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchAddresses();
  }, [customerData.customer_id]);

  const handleEditAddress = (addressId) => {
    navigate(`/edit-address/${addressId}`); 
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/delete_address/${addressId}`);
      setAddresses(addresses.filter(address => address.id !== addressId));
    } catch (error) {
      console.error('Error deleting address:', error);
      setMessage('Error al eliminar la dirección. Inténtalo de nuevo.');
    }
  };

  const handleAddAddress = () => {
    navigate('/add-address'); 
  };

  return (
    <div>
      {message && <p>{message}</p>}
      <h2>Direcciones</h2>
      {addresses.map((address, index) => (
        <div key={address.id}>
          <p>
            {address.street_one} - {address.street_two}<br/>
            {address.city}<br/>
            {address.province}<br/>
            {address.country}<br/>
            {address.postal_code}<br/>
          </p>
          <button onClick={() => handleEditAddress(address.id)}>Editar</button>
          {index > 0 && (
            <button onClick={() => handleDeleteAddress(address.id)}>Eliminar</button>
          )}
        </div>
      ))}
      <button onClick={handleAddAddress}>Añadir Dirección</button>
    </div>
  );
}
