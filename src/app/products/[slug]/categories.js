'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { ImSpinner3 } from "react-icons/im";

import Product from '../../../components/products/product-item';

const ProductsByCategory = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  

  useEffect(() => {
    if (slug) {
      getProductsByCategory(slug); 
    }
  }, [slug]);

  const getProductsByCategory = (category) => {
    axios.get(`http://127.0.0.1:5000/products?category=${category}`, { withCredentials: true })
      .then(response => {
        setProducts(response.data.products.sort((a, b) => b.products_id - a.products_id)); 
      }).catch(error => {
        console.log('getProductsByCategory error', error);
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

export default ProductsByCategory;







