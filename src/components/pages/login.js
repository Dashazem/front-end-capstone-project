import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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

  const handleLogin = () => {
    if (!email || !password) {
        setErrorMessage('Correo electrónico o contraseña no puede ser vacío');
        return;
    }

    setSuccessMessage('');
    setErrorMessage('');

    console.log("Login request:", { email, password });

    dispatch(login(email, password));
    

    setSuccessMessage('Se ha iniciado sesión correctamente');
    
    setTimeout(() => {
      navigate('/');
    }, 2000);
    
  };


  /*const auth = useSelector(state => state.auth);
  const errorMessage = auth.error;

  useEffect(() => {
      if (errorMessage) {
          setErrorMessage(errorMessage);
      }
  }, [errorMessage]);*/

  /*const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Correo electrónico o contraseña no puede ser vacío');
      return;
     }

     setSuccessMessage('');
     setErrorMessage('');
     
     try {
      await dispatch(login(email, password));
      console.log("Response:", response);
      setSuccessMessage('Se ha iniciado sesión correctamente');
      setErrorMessage('');
      navigate('/'); 
    } catch (error) {
      console.error("Error:", error); 
      setErrorMessage('Correo electrónico o contraseña incorrectos');
      setSuccessMessage('');
    }
  };*/

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

          {successMessage && <div className="success-message">{successMessage}</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
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
