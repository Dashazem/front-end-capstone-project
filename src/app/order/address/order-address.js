'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';


const AddressSelection = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]); 
  const router = useRouter();
  const auth = useSelector(state => state.auth);
  
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch(`https://back-end-capstone-project.onrender.com/customers/${auth.id}/addresses`, { withCredentials: true }); 
        const data = await response.json();

        if (Array.isArray(data.addresses)) {
          setAddresses(data.addresses);
        } else {
          console.error('Received data is not an array:', data);
          setAddresses([]); 
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
        setAddresses([]); 
      }
    };
    
    fetchAddresses();
  }, [auth.id]);


  const handleSubmit = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedAddress', selectedAddress);
    }
    router.push('/order/payment');
  };
  

  return (
    <div className='order-address-wrapper'>
      <h2>SELECCIONA DIRECCIÓN DE ENTREGA</h2>
      {addresses.length > 0 ? (
        addresses.map(address => (
          <div key={address.id} className='address-container'>
            <div className='address-input'>
              <input 
                type="radio" 
                id={`address-${address.id}`} 
                name="address" 
                value={address.id} 
                onChange={() => setSelectedAddress(address.id)} 
              />
            </div>

            <div  className='address-label'>
              <label htmlFor={`address-${address.id}`}>
                <p>
                  <strong>{address.street_one} - {address.street_two}</strong><br/>
                  {address.city}<br/>
                  {address.province}<br/>
                  {address.country}<br/>
                  {address.postal_code}<br/>
                </p>
              </label>
            </div>  
          </div>
        ))
      ) : (
        <p>No hay direcciones disponibles.</p>
      )}
      <button className='btn' onClick={handleSubmit} disabled={!selectedAddress}>Continuar</button>
    </div>
  );
};

export default AddressSelection;
