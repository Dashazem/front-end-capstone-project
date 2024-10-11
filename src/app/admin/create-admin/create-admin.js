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
  const [message, setMessage] = useState('');

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
      const response = await axios.post('http://127.0.0.1:5000/administrators', formData, { withCredentials: true });
      setMessage('Administrador agregado correctamente');
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
      setMessage('Error al agregar administrador. Inténtalo de nuevo');
    }
  };

  return (
    <div>
      <h2>AGREGAR NUEVO ADMINISTRADOR</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="first_name"
            placeholder="Nombre*"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="surname"
            placeholder="Apellidos*"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Contraseña*"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Agregar Administrador</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
