'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/style.css';
import { loginSuccess } from '../../../store/reducers/authReducer';

const UserProfile = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [phoneMessage, setPhoneMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [currentPasswordForUpdate, setCurrentPasswordForUpdate] = useState('');
  const [passwordErrorEmailChangeMessage, setPasswordErrorEmailChangeMessage] = useState('');
  const [passwordErrorPasswordChangeMessage, setPasswordErrorPasswordChangeMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
   
  const dispatch = useDispatch();

  
  const userId = useSelector(state => state.auth.id);

  const verifyCurrentPassword = async (password) => {
    try {
      const response = await axios.post('https://back-end-capstone-project.onrender.com/customers/verify_password', {
        customers_id: userId,
        customers_password: password
      }, { withCredentials: true });
      return response.data.isValid; 
    } catch (error) {
      console.error("Password verification failed:", error);
      return false;
    }
  };

  const handleEmailUpdate = async () => {
    const isPasswordValid = await verifyCurrentPassword(currentPassword);

    if (!isPasswordValid) {
      setPasswordErrorEmailChangeMessage('Contraseña actual incorrecta');
      return;
    } else {
      setPasswordErrorEmailChangeMessage(''); 
    }

    if (!newEmail) {
      setEmailMessage('El nuevo correo no puede estar vacío');
      return;
    }

    try {
      const response = await axios.patch('https://back-end-capstone-project.onrender.com/customers/update_email', {
        customers_id: userId,
        customers_email: newEmail,
      }, { withCredentials: true });

      dispatch(loginSuccess({ email: response.data.customers_email, id: userId }));

      setEmailMessage('Email actualizado correctamente!');
      setCurrentPassword(''); 
      setNewEmail(''); 
    } catch (error) {
      console.error("Failed to update email:", error);
      setEmailMessage('Error en la actualización de email');
    }
  };


  const handlePhoneInputChange = (value) => {
    setPhoneNumber(value); 
    setPhoneMessage(''); 
  };


  const handlePhoneUpdate = async () => {
    if (!phoneNumber) {
      setPhoneMessage('El nuevo correo no puede estar vacío');
      return;
    }
  
    try {
      const response = await axios.patch('https://back-end-capstone-project.onrender.com/customers/update_phone', {
        customers_id: userId,
        customers_phone_number: phoneNumber,
      }, { withCredentials: true });
  
      setPhoneMessage('Número de teléfono actualizado correctamente!');
      setPhoneNumber(''); 
    } catch (error) {
      console.error("Failed to update phone number:", error);
      setPhoneMessage('Error en la actualización de número de teléfono');
    }
  };

  const handlePasswordUpdate = async () => {

    const isPasswordValid = await verifyCurrentPassword(currentPasswordForUpdate); 

    if (!isPasswordValid) {
      setPasswordErrorPasswordChangeMessage('Contraseña actual incorrecta');
      return;
    } else {
      setPasswordErrorPasswordChangeMessage(''); 
    }

    try {
      const response = await axios.patch('https://back-end-capstone-project.onrender.com/customers/update_password', {
        customers_id: userId,
        customers_password: newPassword,
      }, { withCredentials: true });

      setPasswordMessage('Contraseña actualizada correctamente!');
      setCurrentPasswordForUpdate('');
      setNewPassword('');
      
    } catch (error) {
      console.error("Failed to update password:", error);
      setPasswordMessage('Error en la actualización de contraseña');
    }
  };

  return (
    <div className='profile-wrapper'>
      <div className='change-email-wrapper'>
        <div className='change-email-header'>
         <h2>CAMBIAR EMAIL</h2>
        </div>
        
        <div className='change-email-inputs'>
          <input
            type="password"
            placeholder="Contraseña actual"
            value={currentPassword}
            onChange={(e) => {setCurrentPassword(e.target.value);
              setEmailMessage('');
              setPasswordErrorEmailChangeMessage('')}
            }
          />

          <input
            type="email"
            placeholder="Nuevo email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        
        <div className='change-email-button'>
          <button className='btn' onClick={handleEmailUpdate}>Actualizar email</button>
        </div>
        
        {emailMessage && <div className='error-message'><p>{emailMessage}</p></div>} 
        {passwordErrorEmailChangeMessage && <div className='error-message'><p>{passwordErrorEmailChangeMessage}</p></div>}
      </div>

      <div className='change-phone-number-wrapper'>
        <div className='change-phone-number-header'>
          <h2>CAMBIAR NÚMERO DE TELÉFONO</h2>
        </div>
        
        <div className='change-phone-number-inputs'>
          <div className="phone-input">
            <label><p>Teléfono*</p></label>
            <PhoneInput
              country={'es'}
              value={phoneNumber}
              placeholder="Nuevo número de teléfono"
              onChange={handlePhoneInputChange}
              required
            />
          </div>
        </div>
        
        <div className='change-phone-number-button'>
          <button className='btn'  onClick={handlePhoneUpdate}>Actualizar teléfono</button>
        </div>
        
        {phoneMessage && <div className='error-message'><p>{phoneMessage}</p></div>} 
      </div>

      <div className='change-password-wrapper'>
        <div className='change-password-header'>
          <h2>CAMBIAR CONTRASEÑA</h2>
        </div>

        <div className='change-password-inputs'>
          <input
            type="password"
            placeholder="Contraseña actual"
            value={currentPasswordForUpdate}
            onChange={(e) => {setCurrentPasswordForUpdate(e.target.value);
              setPasswordErrorPasswordChangeMessage('');
            }}
          />
          
          <input 
            type="password" 
            placeholder="Nueva contraseña" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
          />
        </div>
        
        <div className='change-password-button'>
          <button className='btn' onClick={handlePasswordUpdate}>Guardar</button>
        </div>
       
        {passwordMessage && <div className='error-message'><p>{passwordMessage}</p></div>}
        {passwordErrorPasswordChangeMessage && <div className='error-message'><p>{passwordErrorPasswordChangeMessage}</p></div>}
      </div>

      <div className='delete-link'>
        <Link href="/delete-account"><h3>ELIMINAR TU CUENTA</h3></Link><br />
      </div>
    </div>
  );
}

export default UserProfile;

