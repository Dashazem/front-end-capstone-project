import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Product from './product-item';

const Products = () => {
  const { slug } = useParams(); 
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    if (slug) {
      getProductsByCategory(slug); 
    } else {
      getAllProducts(); 
    }
  }, [slug]);


  const getProductsByCategory = (category) => {
    axios.get(`http://127.0.0.1:5000/products?category=${category}`)
      .then(response => {
        setProducts(response.data.products.sort((a, b) => b.products_id - a.products_id)); 
      }).catch(error => {
        console.log('getProductsByCategory error', error);
      });
  };

  const getAllProducts = () => {
    axios.get('http://127.0.0.1:5000/products') 
      .then(response => {
        console.log('response', response.data);
        setProducts(response.data.products.sort((a, b) => b.products_id - a.products_id)); 
      }).catch(error => {
        console.log('getAllProducts error', error);
      });
  };

  const receivedProducts = () => {
    return products.map(product => {
      return <Product key={product.products_id} product={product} />;
    }
  )};

  return (
    <div className='products-wrapper'>
      {receivedProducts()}
    </div>
  );
};

export default Products;







