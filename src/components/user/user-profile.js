import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { loginSuccess } from '../../store/reducers/authReducer';

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
      const response = await axios.post('http://127.0.0.1:5000/customers/verify_password', {
        customers_id: userId,
        customers_password: password
      });
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
      const response = await axios.patch('http://127.0.0.1:5000/customers/update_email', {
        customers_id: userId,
        customers_email: newEmail,
      });

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
      const response = await axios.patch('http://127.0.0.1:5000/customers/update_phone', {
        customers_id: userId,
        customers_phone_number: phoneNumber,
      });
  
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
      const response = await axios.patch('http://127.0.0.1:5000/customers/update_password', {
        customers_id: userId,
        customers_password: newPassword,
      });

      setPasswordMessage('Contraseña actualizada correctamente!');
      setCurrentPasswordForUpdate('');
      setNewPassword('');
      
    } catch (error) {
      console.error("Failed to update password:", error);
      setPasswordMessage('Error en la actualización de contraseña');
    }
  };

  return (
    <div>
      <div>
        <h2>CAMBIAR EMAIL</h2>
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
        <button className='btn' onClick={handleEmailUpdate}>Actualizar email</button>
        {emailMessage && <div><p>{emailMessage}</p></div>} 
        {passwordErrorEmailChangeMessage && <div><p>{passwordErrorEmailChangeMessage}</p></div>}
      </div>

      <div>
        <h2>CAMBIAR NÚMERO DE TELÉFONO</h2>
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
        
        <button className='btn'  onClick={handlePhoneUpdate}>Actualizar teléfono</button>
        {phoneMessage && <div><p>{phoneMessage}</p></div>} 
      </div>

      <div>
        <h2>CAMBIAR CONTRASEÑA</h2>
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
        <button className='btn' onClick={handlePasswordUpdate}>Guardar</button>
        {passwordMessage && <div><p>{passwordMessage}</p></div>}
        {passwordErrorPasswordChangeMessage && <div><p>{passwordErrorPasswordChangeMessage}</p></div>}
      </div>

      <div className='delete-link'>
        <NavLink to="/delete-account">Eliminar tu cuenta</NavLink><br />
      </div>
    </div>
  );
}

export default UserProfile;

