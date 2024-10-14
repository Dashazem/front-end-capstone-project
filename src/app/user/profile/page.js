import React from 'react';
import UserProfile from './user-profile';
import ProtectedRoute from '../../../components/helpers/protected-routes'; 

const UserProfilePage = () => {
  return (
    <ProtectedRoute roles={['USER']}>
      <UserProfile />
    </ProtectedRoute>
  );
};

export default UserProfilePage;
