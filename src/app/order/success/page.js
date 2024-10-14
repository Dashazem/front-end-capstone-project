import React from 'react';
import OrderSuccessPage from './order-success-page'; 
import ProtectedRoute from '../../../components/helpers/protected-routes';

const OrderSuccessPagePage = () => {
  return (
    <ProtectedRoute roles={['USER']}>
      <OrderSuccessPage />
    </ProtectedRoute>
  );
};

export default OrderSuccessPagePage;
