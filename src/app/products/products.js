'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ImSpinner3 } from "react-icons/im";

import Product from '../../components/products/product-item';

const AllProducts = () => { 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    getAllProducts(); 
  }, []);


  const getAllProducts = () => {
    axios.get('http://127.0.0.1:5000/products', { withCredentials: true }) 
      .then(response => {
        setProducts(response.data.products.sort((a, b) => b.products_id - a.products_id)); 
      }).catch(error => {
        console.log('getAllProducts error', error);
      }).finally(() => {
        setLoading(false); 
      });
  };

  const receivedProducts = () => {
    return products.map(product => {
      return <Product key={product.products_id} product={product} />;
    }
  )};

  return (
    <div className='products-wrapper'>
      {loading ? ( 
        <div className='spinner'>
          <ImSpinner3 className="spinner-icon" />
        </div>
      ) : (
        receivedProducts()
      )}
    </div>
  );
};

export default AllProducts;







