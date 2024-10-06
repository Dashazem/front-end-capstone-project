import axios from 'axios';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const login = (email, password) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
            console.log("API Response:", response);
            const { role } = response.data; // роль, отримана з API
            
            // Зберігаємо email та роль у стані Redux
            dispatch({ type: LOGIN_SUCCESS, payload: { email, role } });
        } catch (error) {
            dispatch({ type: LOGIN_FAIL, payload: error.response.data.error });
        }
    };
};



