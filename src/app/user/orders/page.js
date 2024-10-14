import React from 'react';
import UserOrders from './user-orders';
import ProtectedRoute from '../../../components/helpers/protected-routes'; 

const UserOrdersPage = () => {
  return (
    <ProtectedRoute roles={['USER']}>
      <UserOrders />
    </ProtectedRoute>
  );
};

export default UserOrdersPage;
