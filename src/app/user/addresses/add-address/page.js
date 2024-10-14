import React from 'react';
import UserAddAddress from './user-add-address';
import ProtectedRoute from '../../../../components/helpers/protected-routes'; 

const UserAddAddressPage = () => {
  return (
    <ProtectedRoute roles={['USER']}>
      <UserAddAddress />
    </ProtectedRoute>
  );
};

export default UserAddAddressPage;
