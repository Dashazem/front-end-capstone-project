import React from 'react';
import User from './user'; 
import ProtectedRoute from '../../components/helpers/protected-routes';

const UserPage = () => {
  return (
    <ProtectedRoute roles={['USER']}>
      <User />
    </ProtectedRoute>
  );
};

export default UserPage;
