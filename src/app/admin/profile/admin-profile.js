'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../../store/reducers/authReducer';

const AdminProfile = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [currentPasswordForUpdate, setCurrentPasswordForUpdate] = useState('');
  const [passwordErrorEmailChangeMessage, setPasswordErrorEmailChangeMessage] = useState('');
  const [passwordErrorPasswordChangeMessage, setPasswordErrorPasswordChangeMessage] = useState('');

  
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.id);

  const verifyCurrentPassword = async (password) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/administrators/verify_password', {
        administrators_id: userId,
        administrators_password: password
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
      const response = await axios.patch('http://127.0.0.1:5000/administrators/update_email', {
        administrators_id: userId,
        administrators_email: newEmail,
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

  
  const handlePasswordUpdate = async () => {

    const isPasswordValid = await verifyCurrentPassword(currentPasswordForUpdate); 

    if (!isPasswordValid) {
      setPasswordErrorPasswordChangeMessage('Contraseña actual incorrecta');
      return;
    } else {
      setPasswordErrorPasswordChangeMessage(''); 
    }

    try {
      const response = await axios.patch('http://127.0.0.1:5000/administrators/update_password', {
        administrators_id: userId,
        administrators_password: newPassword,
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
        
        {emailMessage && <div className='success-message'><p>{emailMessage}</p></div>} 
        {passwordErrorEmailChangeMessage && <div className='error-message'><p>{passwordErrorEmailChangeMessage}</p></div>}
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
        
        {passwordMessage && <div className='success-message'><p>{passwordMessage}</p></div>}
        {passwordErrorPasswordChangeMessage && <div className='error-message'><p>{passwordErrorPasswordChangeMessage}</p></div>}
      </div>

      <div className='delete-link'>
        <Link href="/delete-account"><h3>ELIMINAR TU CUENTA</h3></Link><br />
      </div>
    </div>
  );
}

export default AdminProfile;
