import axios from 'axios';
import { loginSuccess, loginFail } from '../reducers/authReducer';

export const login = (email, password) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('https://back-end-capstone-project.onrender.com/login', 
                { email, password },
                { withCredentials: true });
            const { role, first_name, id } = response.data; 

            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify({ email, role, first_name, id }));
            }
            
            dispatch(loginSuccess({ email, role, first_name, id })); 
            return { type: 'LOGIN_SUCCESS' };
        } catch (error) {
            dispatch(loginFail(error));
            return { type: 'LOGIN_FAIL', error: 'Correo electrónico o contraseña incorrectos' };
        }
    };
};







