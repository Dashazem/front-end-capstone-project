'use client';
import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import axios from "axios";

import { clearCart } from '../../../store/reducers/cartReducer';
import { createNewOrder } from '../../../store/reducers/orderReducer';


const OrderPayment = () => {
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const auth = useSelector(state => state.auth);
  const cartItems = useSelector(state => state.cart.items);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState(null);
  
  useEffect(() => {
    const address = localStorage.getItem('selectedAddress');
    if (address) {
      setSelectedAddress(address);
    }
  }, []);
  
  if (!selectedAddress) {
    return <p>Eliga dirección de entrega antes de seguir</p>; 
  }
  
  const initialOptions = {
    clientId: "AdaHxKhHDvAyioG2ZLdMwbh3YMsm_3phw4Go2M3-jzp0bF1dOBbJ-Di9v55hLiQl845o4YfftOCCYuV_", 
    currency: "EUR",
    intent: "capture"
  };

  const createOrder = (data, actions) => {
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
      setSuccessMessage('Pago procesado correctamente!');
  
      const transactionData = {
        payer_name: details.payer.name.given_name,
        payer_email: details.payer.email_address,
        transaction_id: details.id,
        amount: details.purchase_units[0].amount.value,
      };

      
      axios.post('https://back-end-capstone-project.onrender.com/transactions', transactionData, { withCredentials: true })
        .then(response => {
          const transactionId = response.data.transaction_id;

          const orderDetails = {
            orders_number: `ORD-${details.id}`, 
            orders_products_id: cartItems.map(item => item.id),
            orders_product_quantity: cartItems.map(item => item.quantity),
            orders_customers_id: auth.id,
            orders_addresses_id: selectedAddress,
            orders_total_price: totalAmount.toFixed(2),
            orders_transactions_id: transactionId
          };

          dispatch(createNewOrder(orderDetails)); 
          dispatch(clearCart());
          localStorage.setItem('orders_number', orderDetails.orders_number);
          router.push('/order/success');
        })
        .catch(error => {
          console.error('Error during server request:', error);
          setErrorMessage('Se produjo un error al procesar el pago.');
        });
    });
  };
  
 
  return (
    <div className="order-payment-wrapper">
      <h2>INTRODUCE LOS DATOS DE PAGO</h2>

      <div className="paypal-wrapper">
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons 
            style={{ layout: "horizontal" }} 
            createOrder={(data, actions) => createOrder(data, actions)} 
            onApprove={(data, actions) => onApprove(data, actions)}
          />
        </PayPalScriptProvider>
        {successMessage && <div className='success-message'><p>{successMessage}</p></div>} 
        {errorMessage && <div className='error-message'><p>{errorMessage}</p></div>} 
      </div>
    </div>
  );
};

export default OrderPayment;


