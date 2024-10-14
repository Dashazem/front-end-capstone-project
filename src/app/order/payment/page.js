import React from 'react';
import OrderPayment from './order-payment';
import ProtectedRoute from '../../../components/helpers/protected-routes';

const OrderPaymentPage = () => {
  return (
    <ProtectedRoute roles={['USER']}>
      <OrderPayment />
    </ProtectedRoute>
  );
};

export default OrderPaymentPage;
