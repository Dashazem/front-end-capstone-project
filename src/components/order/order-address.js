import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const AddressSelection = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]); 
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);
  
  
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/customers/${auth.id}/addresses`); 
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
    navigate('/order-payment', { state: { selectedAddress } });
  };

  return (
    <div>
      <h2>SELECCIONA DIRECCIÓN DE ENTREGA</h2>
      {addresses.length > 0 ? (
        addresses.map(address => (
          <div key={address.id}>
            <input 
              type="radio" 
              id={`address-${address.id}`} 
              name="address" 
              value={address.id} 
              onChange={() => setSelectedAddress(address.id)} 
            />
            <label htmlFor={`address-${address.id}`}><p>
            {address.street_one} - {address.street_two}<br/>
            {address.city}<br/>
            {address.province}<br/>
            {address.country}<br/>
            {address.postal_code}<br/>
          </p></label>
          </div>
        ))
      ) : (
        <p>No hay direcciones disponibles.</p>
      )}
      <button onClick={handleSubmit} disabled={!selectedAddress}>Continuar</button>
    </div>
  );
};

export default AddressSelection;
