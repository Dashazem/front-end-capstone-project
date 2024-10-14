import React from 'react';
import AdminOrders from './admin-orders';
import ProtectedRoute from '../../../components/helpers/protected-routes';

const AdminOrdersPage = () => {
  return (
    <ProtectedRoute roles={['ADMIN']}>
      <AdminOrders />
    </ProtectedRoute>
  );
};

export default AdminOrdersPage;
