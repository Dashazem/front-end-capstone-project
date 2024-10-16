'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux'; 
import axios from 'axios';
import { ImSpinner3 } from "react-icons/im";

export default function UserAddresses() {
  const router = useRouter();
  const [addresses, setAddresses] = useState([]);
  const [message, setMessage] = useState(''); 
  const userId = useSelector(state => state.auth.id);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`https://back-end-capstone-project.onrender.com/customers/${userId}/addresses`, { withCredentials: true });
        setAddresses(response.data.addresses);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }finally {
        setLoading(false); 
      }
    };

    fetchAddresses();
  }, [userId]);

  const handleEditAddress = (addressId) => {
    if (addressId) {
      router.push(`/edit-address/${addressId}`);
    } else {
      console.error('Invalid address ID');
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await axios.delete(`https://back-end-capstone-project.onrender.com/delete_address/${addressId}`, { withCredentials: true });
      setAddresses(addresses.filter(address => address.id !== addressId));
    } catch (error) {
      console.error('Error deleting address:', error);
      setMessage('Error al eliminar la dirección. Inténtalo de nuevo.');
    }
  };

  const handleAddAddress = () => {
    router.push('/add-address'); 
  };

  return (
    <div>
      {loading ? ( 
        <div className='spinner'>
          <ImSpinner3 className="spinner-icon" />
        </div>
      ) : (
        <div className='user-addresses-wrapper'>
          {message && <div className='error-message'><p>{message}</p></div>}
          <h2>Direcciones</h2>

          <div className='address-containers'>
            {addresses.map((address, index) => (
              <div key={address.id} className='address-container'>
                <p>
                  <strong>{address.street_one} - {address.street_two}</strong><br/>
                  {address.city}<br/>
                  {address.province}<br/>
                  {address.country}<br/>
                  {address.postal_code}<br/>
                </p>
                <div className='address-container-buttons'>
                  <button className='btn' onClick={() => handleEditAddress(address.id)}>Editar</button>
                  {index > 0 && (
                    <button className='btn' onClick={() => handleDeleteAddress(address.id)}>Eliminar</button>
                  )}
                </div>
                
              </div>
            ))}
          </div>
          
          <button className='btn' onClick={handleAddAddress}>Añadir Dirección</button>
        </div>
      )}
    </div>
  );
}
