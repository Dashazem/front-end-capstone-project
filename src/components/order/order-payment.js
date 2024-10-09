import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useLocation } from 'react-router-dom';


import { clearCart } from '../../store/reducers/cartReducer';
import { createNewOrder } from '../../store/reducers/orderReducer';


const PayPalButtonComponent = ({ productPrice }) => {
  const totalAmount = useSelector(state => state.cart.totalAmount);
 
  const auth = useSelector(state => state.auth);
  const cartItems = useSelector(state => state.cart.items);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedAddress = location.state?.selectedAddress;
  

  const initialOptions = {
    clientId: "AdaHxKhHDvAyioG2ZLdMwbh3YMsm_3phw4Go2M3-jzp0bF1dOBbJ-Di9v55hLiQl845o4YfftOCCYuV_", 
    currency: "EUR",
    intent: "capture"
  };

  const createOrder = (data, actions) => {
    console.log('Actions:', actions);
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: `${totalAmount}` 
          }
        }
      ]
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function(details) {
      setMessage('Pago procesado correctamente!');
  
      const transactionData = {
        payer_name: details.payer.name.given_name,
        payer_email: details.payer.email_address,
        transaction_id: details.id,
        amount: details.purchase_units[0].amount.value,
      };

      const orderDetails = {
        orders_number: `ORD-${details.id}`, 
        orders_products_id: cartItems.map(item => item.id),
        orders_product_quantity: cartItems.map(item => item.quantity),
        orders_customers_id: auth.id,
        orders_addresses_id: selectedAddress,
        orders_total_price: totalAmount.toFixed(2),
      };
  
      axios.post('http://localhost:5000/transactions', transactionData)
        .then(response => {
          console.log('Server response:', response.data);
          dispatch(createNewOrder(orderDetails)); 
          dispatch(clearCart());
          navigate('/');
        })
        .catch(error => {
          console.error('Error during server request:', error);
          setMessage('Se produjo un error al procesar el pago.');
        });
    });
  };
  

  return (
    <div>
      <h2>INTRODUCE LOS DATOS DE PAGO</h2>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons 
          style={{ layout: "horizontal" }} 
          createOrder={(data, actions) => createOrder(data, actions)} 
          onApprove={(data, actions) => onApprove(data, actions)}
        />
      </PayPalScriptProvider>
      {message && <p>{message}</p>}
    </div>
    
  );
};

export default PayPalButtonComponent;


