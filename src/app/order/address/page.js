import React from 'react';
import AddressSelection from './order-address'; 
import ProtectedRoute from '../../../components/helpers/protected-routes'; 

const AddressSelectionPage = () => {
  return (
    <ProtectedRoute roles={['USER']}>
      <AddressSelection />
    </ProtectedRoute>
  );
};

export default AddressSelectionPage;
