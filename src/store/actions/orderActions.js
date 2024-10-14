import React from 'react';
import axios from 'axios';

export const createOrder = (orderData) => {
  return (dispatch) => {
    return axios.post('http://127.0.0.1:5000/orders', orderData, { withCredentials: true })
      .then((response) => {
        return response.data.message;
      })
      .catch((error) => {
        console.error('Error creating order:', error);
      });
  };
};