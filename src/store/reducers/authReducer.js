/*import { LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/authActions';

const initialState = {
    email: null,
    role: null,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                email: action.payload.email,
                role: action.payload.role,
                error: null,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;*/

// store/authReducer.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { email: null, role: null, error: null },
  reducers: {
    loginSuccess(state, action) {
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.error = null;
    },
    loginFail(state, action) {
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, loginFail } = authSlice.actions;
export default authSlice.reducer;





