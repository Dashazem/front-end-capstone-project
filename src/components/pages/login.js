import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'; 
import { login } from '../../store/actions/authActions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  
  const handleCreateAccountClick = () => {
    navigate('/register'); 
  };


  const handleLogin = async () => {
    setSuccessMessage('');  
    setErrorMessage('');  

    if (!email || !password) {
      setErrorMessage('Correo electrónico o contraseña no puede ser vacío');
      return;
    }

    try {
      const resultAction = await dispatch(login(email, password));
      if (resultAction.type === 'LOGIN_SUCCESS') {
        setSuccessMessage('Se ha iniciado sesión correctamente');

        setTimeout(() => {
          navigate('/');
        }, 2000);

      } else if (resultAction.type === 'LOGIN_FAIL') {
        setErrorMessage(resultAction.error);
      }
    } catch (err) {
      setErrorMessage('Ha ocurrido un error, por favor Inténtalo de nuevo');
    }
  };

  return (
    <div className='login-wrapper'>
      <h2>INICIA SESIÓN O CREA TU CUENTA</h2>

      <div className='login-container'>
        <div className='left-column'>
          <h3>¿YA TIENES CUENTA? INICIA SESIÓN</h3>

          <form className='input-container'>
            <input 
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Introduce tu email"/>

            <input 
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"/>
          </form>

          <button className='btn' onClick={handleLogin}>INICIAR SESIÓN</button>

          {successMessage && <div className='success-message'><p>{successMessage}</p></div>} 
          {errorMessage && <div className='error-message'><p>{errorMessage}</p></div>} 
        </div>

        <div className='right-column'>
          <h3>¿NO TIENES CUENTA? REGÍSTRATE</h3>

          <div className='right-column-text'>
            <p><FontAwesomeIcon icon="fa-house" className='text-icon' />Guarda tus datos de envío y de pago para ahorrar tiempo en tus siguientes compras</p>

            <p><FontAwesomeIcon icon="fa-clipboard" className='text-icon' />Gestiona tus pedidos</p>
          </div>

          <button className='btn' onClick={handleCreateAccountClick}>CREAR CUENTA</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
