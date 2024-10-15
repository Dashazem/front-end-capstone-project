import React from 'react';
import axios from 'axios';

export const createOrder = (orderData) => {
  return (dispatch) => {
    return axios.post('https://back-end-capstone-project.onrender.com/orders', orderData, { withCredentials: true })
      .then((response) => {
        return response.data.message;
      })
      .catch((error) => {
        console.error('Error creating order:', error);
      });
  };
};