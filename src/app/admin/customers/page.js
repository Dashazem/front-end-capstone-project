import React from 'react';
import AdminCustomers from './admin-customers';
import ProtectedRoute from '../../../components/helpers/protected-routes';

const AdminCustomersPage = () => {
  return (
    <ProtectedRoute roles={['ADMIN']}>
      <AdminCustomers />
    </ProtectedRoute>
  );
};

export default AdminCustomersPage;
