import React from 'react';
import UserAddresses from './user-addresses';
import ProtectedRoute from '../../../components/helpers/protected-routes';

const UserAddressesPage = () => {
  return (
    <ProtectedRoute roles={['USER']}>
      <UserAddresses />
    </ProtectedRoute>
  );
};

export default UserAddressesPage;
