import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
        setProducts(response.data.products); 
      }).catch(error => {
        console.log('getProductsByCategory error', error);
      });
  };

  const getAllProducts = () => {
    axios.get('http://127.0.0.1:5000/products') 
      .then(response => {
        setProducts(response.data.products); 
      }).catch(error => {
        console.log('getAllProducts error', error);
      });
  };

  const portfolioItems = () => {
    return products.map(product => (
      <div key={product.products_id}>
        <h1>{product.products_name}</h1>
        <img className='image-product' src={product.image_product[0]} alt={product.products_name} />
      </div>
    ));
  };

  return (
    <div>
      {portfolioItems()}
    </div>
  );
};

export default Products;



