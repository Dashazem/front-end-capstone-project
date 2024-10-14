import React from 'react';
import AdminProfile from './admin-profile';
import ProtectedRoute from '../../../components/helpers/protected-routes';

const AdminProfilePage = () => {
  return (
    <ProtectedRoute roles={['ADMIN']}>
      <AdminProfile />
    </ProtectedRoute>
  );
};

export default AdminProfilePage;
