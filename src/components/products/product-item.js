'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaCirclePlus } from "react-icons/fa6";
import { useDispatch } from 'react-redux'; 
import { addToCart } from '../../store/reducers/cartReducer';

import { worksans } from '../../fonts/fonts';

import ShoppingCartModal from '../modals/cart-modal';

const Product = ({ product }) => {
  const [cartModalIsOpen, setCartModalIsOpen] = useState(false);
  const dispatch = useDispatch();


  const handleCloseCartModal = () => {
    setCartModalIsOpen(false);
  };

  const { 
    products_id, 
    products_name, 
    products_price,
    products_quantity,
    products_price_discounted_10,
    products_price_discounted_20,
    image_product 
  } = product;

  const handleAddProductToCart = () => {
    const productData = {
      id: products_id,
      name: products_name,
      price: products_price,
      image: image_product,
      max_quantity: products_quantity,
      price_10: products_price_discounted_10,
      price_20: products_price_discounted_20,
      action: "increment"
    };
    dispatch(addToCart(productData));
    setCartModalIsOpen(true);
    console.log(`Product ID: ${products_id} added to cart`);
  };

  return (
    <div className='product-wrapper'>
      <ShoppingCartModal 
          handleCloseCartModal={handleCloseCartModal} 
          modalIsOpen={cartModalIsOpen}
          products_name={products_name} 
          products_price={products_price}
          image_product={image_product}/>

      <div className='image-wrapper'>
        <div className={`${products_quantity > 0 ? 'image-section' : 'image-agotado'}`}>
          <Link href={`/product/${products_id}`}>
            <img src={image_product[0]} alt={products_name} />
          </Link>
        </div>
        

        <div className='icon-wrapper'>
          {products_quantity > 0 ? (
            <button onClick={handleAddProductToCart} className='icon-button' aria-label="Add to cart">
              <FaCirclePlus className='add-to-cart-icon'/>
            </button>
          ) : (
            <button disabled className='icon-button'><p>AGOTADO</p></button>
          )}
        </div> 
      </div>

      <Link href={`/product/${products_id}`}>
        <div className='product-name'>
          <p>{products_name}</p>
        </div>
      </Link>

      <div className='product-price'>
      <p className={`${worksans.className}`}>{products_price} EUR</p>
        {/* {products_quantity > 0 ? (
          <p className={`${worksans.className}`}>{products_price} EUR</p>
        ) : (
          <p className={`${worksans.className}`}>AGOTADO</p>
        )} */}
        
      </div>
    </div>
  );
};

export default Product;


