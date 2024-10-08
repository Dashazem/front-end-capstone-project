import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logout } from '../../store/reducers/authReducer'; 

export default function DeleteAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => ({
    id: state.auth.id,
    role: state.auth.role,
  }));

  const [message, setMessage] = useState('');

  const handleDeleteAccount = async () => {
    try {
      const endpoint = user.role === 'ADMIN' 
        ? `http://127.0.0.1:5000/administrators/${user.id}` 
        : `http://127.0.0.1:5000/customers/${user.id}`;
      
      await axios.delete(endpoint);

      setMessage('Tu cuenta ha sido eliminada exitosamente.');
      dispatch(logout());

      setTimeout(() => {
        navigate('/'); 
      }, 2000);

    } catch (error) {
      console.error('Error deleting account:', error);
      setMessage('Error al eliminar la cuenta.');
    }
  };

  return (
    <div>
      <h2>Eliminar tu cuenta</h2>
      <p>Vas a iniciar el proceso de eliminación de tu cuenta. 
      Recuerda que: No podrás acceder a tu cuenta en Crochet & Knit.</p>
      
      <button className='btn' onClick={handleDeleteAccount}>Continuar</button>
      {message && <div className="notification">{message}</div>}
    </div>
  );
}
