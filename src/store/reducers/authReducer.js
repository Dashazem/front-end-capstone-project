import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { email: null, role: null, first_name: null, id: null, error: null, loading: true },
  reducers: {
    loginSuccess(state, action) {
      const { email, role, first_name, id } = action.payload; 
      state.email = email;
      state.role = role;
      state.first_name = first_name; 
      state.id = id;               
      state.error = null;
      state.loading = false; // Встановіть loading в false
    },
    loginFail(state, action) {
      state.error = action.payload;
      state.loading = false; // Встановіть loading в false
    },
    logout(state) { 
      state.email = null;
      state.role = null;
      state.first_name = null;
      state.id = null;
      state.error = null;
      state.loading = false; // Встановіть loading в false
    },
    setLoading(state, action) {
      state.loading = action.payload; // Додайте action для контролю loading
    },
  },
});


export const { loginSuccess, loginFail, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;






