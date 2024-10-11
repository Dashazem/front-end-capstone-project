import React from 'react';
import axios from 'axios';

export const createOrder = (orderData) => {
  return (dispatch) => {
    return axios.post('http://127.0.0.1:5000/orders', orderData, { withCredentials: true })
      .then((response) => {
        console.log(response.data.message);
        // обробити успішне замовлення,напр очистити кошик
      })
      .catch((error) => {
        console.error('Error creating order:', error);
      });
  };
};