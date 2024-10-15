'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const CreateAccount = () => {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    first_name: '',
    surname: '',
    email: '',
    password: '',
    address: {
      street_one: '',
      street_two: '',
      city: '',
      province: '',
      country: 'España',
      postal_code: ''
    },
    contact: {
      phone_number: ''
    }
  });


  const handleChange = (event) => {
    const { name, value } = event.target;

    const keys = name.split('.');

    if (keys.length === 2) {
      setFormData(prevState => ({
        ...prevState,
        [keys[0]]: {
          ...prevState[keys[0]],
          [keys[1]]: value
        }
      }));
      
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
      setErrorMessage('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage(''); 

    axios.post('https://back-end-capstone-project.onrender.com/customers', 
      formData, 
      { withCredentials: true }
    ).then(response => {
      setSuccessMessage('La cuenta se ha creado correctamente'); 

      setFormData({
        first_name: '',
        surname: '',
        email: '',
        password: '',
        address: {
          street_one: '',
          street_two: '',
          city: '',
          province: '',
          country: 'España',
          postal_code: ''
        },
        contact: {
          phone_number: ''
        }
      });

      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }).catch(error => {
      if (error.response) {
        if (error.response.status === 400) {
          setErrorMessage('No se pudo crear la cuenta. Por favor, comprueba tus datos.');
        } else if (error.response.status === 409) {
          setErrorMessage('Ya existe una cuenta con este correo electrónico.');
        } else {
          setErrorMessage('Error al crear la cuenta. Inténtalo de nuevo más tarde.');
        }
      } else {
        setErrorMessage('Error de red. Inténtalo de nuevo más tarde.');
      }
    });     
  };

  return (
    <div className='create-account-wrapper'>
      <h3>¿NO TIENES CUENTA? REGÍSTRATE</h3>

      <div className='success-message'>
        {successMessage && <p>{successMessage}</p>}
      </div>

      <div className="error-message">
        {errorMessage && <p>{errorMessage}</p>}
      </div>
      
      <form onSubmit={handleSubmit} className='form-wrapper'>
        <div className='form-container'>
          <div className='left-column'>
            <input type="text" name="first_name" placeholder="Nombre*" value={formData.first_name} onChange={handleChange} required />
            <input type="text" name="surname" placeholder="Apellidos*" value={formData.surname} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleChange} required />
            <input className="password" type="password" name="password" placeholder="Contraseña*" value={formData.password} onChange={handleChange} required />

            <div className="phone-input">
              <label><p>Teléfono*</p></label>
              <PhoneInput
                country={'es'}
                value={formData.contact.phone_number}
                onChange={phone => setFormData({
                    ...formData,
                    contact: { phone_number: phone }
                })}
                placeholder="Teléfono*"
                required
              />
            </div>
                
            <input type="text" name="address.postal_code" placeholder="Código postal*" value={formData.address.postal_code} onChange={handleChange} required />
          </div>

          <div className='right-column'>
            <label><p>Región*</p></label>
            <input type="text" name="address.country" placeholder="Región" value='España' readOnly required />
            <input type="text" name="address.province" placeholder="Provincia*" value={formData.address.province} onChange={handleChange} required />
            <input type="text" name="address.city" placeholder="Localidad*" value={formData.address.city} onChange={handleChange} required />
            <input type="text" name="address.street_one" placeholder="Dirección*" value={formData.address.street_one} onChange={handleChange} required />
            <input type="text" name="address.street_two" placeholder="Piso/Puerta u otro" value={formData.address.street_two} onChange={handleChange} />
          </div>
        </div>

        <button type="submit" className='btn'>CREAR CUENTA</button>
      </form>
    </div>
  );
};

export default CreateAccount;
