import React from 'react';
import UserEditAddress from './user-edit-address';
import ProtectedRoute from '../../../../../components/helpers/protected-routes';

const UserEditAddressPage = () => {
  return (
    <ProtectedRoute roles={['USER']}>
      <UserEditAddress />
    </ProtectedRoute>
  );
};

export default UserEditAddressPage;
