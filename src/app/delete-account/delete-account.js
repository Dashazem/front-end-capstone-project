'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logout } from '../../store/reducers/authReducer'; 

export default function DeleteAccount() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(state => ({
    id: state.auth.id,
    role: state.auth.role,
  }));

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDeleteAccount = async () => {
    try {
      const endpoint = user.role === 'ADMIN' 
        ? `https://back-end-capstone-project.onrender.com/administrators/${user.id}` 
        : `https://back-end-capstone-project.onrender.com/customers/${user.id}`;
      
      await axios.delete(endpoint, { withCredentials: true });

      setSuccessMessage('Tu cuenta ha sido eliminada exitosamente.');
      dispatch(logout());

      setTimeout(() => {
        router.push('/'); 
      }, 2000);

    } catch (error) {
      console.error('Error deleting account:', error);
      setErrorMessage('Error al eliminar la cuenta.');
    }
  };

  return (
    <div className='delete-account-wrapper'>
      <h2>ELIMINAR TU CUENTA</h2>
      <p>Vas a iniciar el proceso de eliminación de tu cuenta.
      Recuerda que: <strong>No podrás acceder a tu cuenta en Crochet & Knit.</strong></p>
      
      <button className='btn' onClick={handleDeleteAccount}>Continuar</button>
      {successMessage && <div className='success-message'><p>{successMessage}</p></div>}
      {errorMessage && <div className='error-message'><p>{errorMessage}</p></div>}
    </div>
  );
}
