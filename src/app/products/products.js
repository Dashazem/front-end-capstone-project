'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ImSpinner3 } from "react-icons/im";

import Product from '../../components/products/product-item';

const AllProducts = () => { 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    getAllProducts(page); 
  }, [page]);

  const getAllProducts = (currentPage) => {
    setLoadingMore(page > 1); 
    setLoading(page === 1); 

    axios.get(`http://127.0.0.1:5000/products?page=${currentPage}`, { withCredentials: true }) 
      .then(response => {
        setProducts(prevProducts => {
          const existingIds = new Set(prevProducts.map(product => product.products_id));
          const newProducts = response.data.products.filter(product => !existingIds.has(product.products_id));
          return [...prevProducts, ...newProducts];
        });
        setTotalProducts(response.data.total);
      })
      .catch(error => {
        console.error('getAllProducts error', error);
      })
      .finally(() => {
        setLoadingMore(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading && !loadingMore) {
        if (products.length < totalProducts) {
          setPage(prevPage => prevPage + 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [products, loading, loadingMore, totalProducts]);

  const receivedProducts = () => {
    return products.map(product => (
      <Product key={product.products_id} product={product} />
    ));
  };

  return (
    <div className='products-wrapper'>
      {loading && products.length === 0 && ( 
        <div className='spinner'>
          <ImSpinner3 className="spinner-icon" />
        </div>
      )}
      {receivedProducts()}
      {loadingMore && (
        <div className='spinner'>
          <ImSpinner3 className="spinner-icon" />
        </div>
      )}
    </div>
  );
};

export default AllProducts;




