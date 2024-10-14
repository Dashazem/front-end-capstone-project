import React from 'react';
import CreateAdmin from './create-admin';
import ProtectedRoute from '../../../components/helpers/protected-routes';

const CreateAdminPage = () => {
  return (
    <ProtectedRoute roles={['ADMIN']}>
      <CreateAdmin />
    </ProtectedRoute>
  );
};

export default CreateAdminPage;
