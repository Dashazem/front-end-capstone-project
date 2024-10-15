'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux'; 

export default function UserAddAddress() {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const userId = useSelector(state => state.auth.id);

  const [formData, setFormData] = useState({
    addresses_street_one: '',
    addresses_street_two: '',
    addresses_city: '',
    addresses_province: '',
    addresses_country: 'España',
    addresses_postal_code: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://back-end-capstone-project.onrender.com/add_address`, {
        ...formData,
        customers_id: userId,
      }, { withCredentials: true });
      setSuccessMessage('Dirección agregada correctamente!');
      setTimeout(() => {
        router.push('/user/addresses');
      }, 2000);

    } catch (error) {
      console.error('Error adding address:', error);
      setErrorMessage('Error al añadir la dirección. Inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <h2>Añadir Dirección</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="addresses_street_one"
            placeholder="Dirección*"
            value={formData.addresses_street_one}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="addresses_street_two"
            placeholder="Piso/Puerta u otro"
            value={formData.addresses_street_two}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="addresses_city"
            placeholder="Localidad*"
            value={formData.addresses_city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="addresses_province"
            placeholder="Provincia*"
            value={formData.addresses_province}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>
            <p>Región*</p>
            <input
              type="text"
              name="addresses_country"
              value={formData.addresses_country}
              onChange={handleChange}
              placeholder="Región" 
              readOnly  
              required
            />
          </label>
        </div>
        <div>
          <input
            type="text"
            name="addresses_postal_code"
            placeholder="Código postal*"
            value={formData.addresses_postal_code}
            onChange={handleChange}
            required
            maxLength={5} 
          />
        </div>
        <button type="submit">Añadir Dirección</button>
        {successMessage && <div className='success-message'><p>{successMessage}</p></div>}
        {errorMessage && <div className='error-message'><p>{errorMessage}</p></div>}
      </form>
    </div>
  );
}


