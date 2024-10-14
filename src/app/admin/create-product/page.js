import React from 'react';
import CreateProduct from './create_product';
import ProtectedRoute from '../../../components/helpers/protected-routes';

const CreateProductPage = () => {
  return (
    <ProtectedRoute roles={['ADMIN']}>
      <CreateProduct />
    </ProtectedRoute>
  );
};

export default CreateProductPage;
