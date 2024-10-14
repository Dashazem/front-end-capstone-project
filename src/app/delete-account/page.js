import React from 'react';
import DeleteAccount from './delete-account'; 
import ProtectedRoute from '../../components/helpers/protected-routes';

const DeleteAccountPage = () => {
  return (
    <ProtectedRoute roles={['USER']}>
      <DeleteAccount />
    </ProtectedRoute>
  );
};

export default DeleteAccountPage;
