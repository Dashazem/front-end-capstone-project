'use client';
import React, { useState } from 'react';
import axios from 'axios';

export default function CreateAdmin() {
  const [formData, setFormData] = useState({
    first_name: '',
    surname: '',
    email: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/administrators', formData, { withCredentials: true });
      setErrorMessage('');
      setSuccessMessage('Administrador agregado correctamente');
      setFormData({
        first_name: '',
        surname: '',
        email: '',
        password: '',
      }); 
      setTimeout(() => {
        navigate('/admin'); 
      }, 2000);
    } catch (error) {
      console.error('Error creating administrator:', error);
      setErrorMessage('Error al agregar administrador. Inténtalo de nuevo');
    }
  };

  return (
    <div className='create-admin-wrapper'>
      <div className='create-admin-header'>
        <h2>AGREGAR NUEVO ADMINISTRADOR</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className='create-admin-inputs'>
          <input
            type="text"
            name="first_name"
            placeholder="Nombre*"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        
          <input
            type="text"
            name="surname"
            placeholder="Apellidos*"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            required
          />
        
          <input
            type="password"
            name="password"
            placeholder="Contraseña*"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
       
        <div className='create-admin-button'>
          <button className='btn' type="submit">Agregar Administrador</button>
        </div>
        
        {successMessage && <div className='success-message'><p>{successMessage}</p></div>}
        {errorMessage && <div className='error-message'><p>{errorMessage}</p></div>}
      </form>
    </div>
  );
}
