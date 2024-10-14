import React from 'react';
import Admin from './admin';
import ProtectedRoute from '../../components/helpers/protected-routes';

const AdminPage = () => {
  return (
    <ProtectedRoute roles={['ADMIN']}>
      <Admin />
    </ProtectedRoute>
  );
};

export default AdminPage;
