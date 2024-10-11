import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {},
  reducers: {
    createOrderSuccess(state, action) {
      return action.payload;
    },
    createOrderFail(state, action) {
      return { error: action.payload };
    },
  },
});

export const { createOrderSuccess, createOrderFail } = orderSlice.actions;

export const createNewOrder = (orderDetails) => async (dispatch) => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/orders', orderDetails, { withCredentials: true });
    dispatch(createOrderSuccess(response.data));
  } catch (error) {
    dispatch(createOrderFail(error.message));
  }
};

export default orderSlice.reducer;
