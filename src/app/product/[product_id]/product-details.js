'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux'; 
import axios from 'axios';
import { ImSpinner3 } from "react-icons/im";
import Slider from 'react-slick';

import { worksans } from '../../../fonts/fonts';
import { addToCart } from '../../../store/reducers/cartReducer';
import ShoppingCartModal from '../../../components/modals/cart-modal';
import EditProduct from '../../../components/products/product-edit';
import "../../../../node_modules/slick-carousel/slick/slick.css"; 
import "../../../../node_modules/slick-carousel/slick/slick-theme.css"; 

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { product_id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [cartModalIsOpen, setCartModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const userRole = useSelector((state) => state.auth.role);

  useEffect(() => {
    getProduct(product_id);
  }, [product_id]);


  const getProduct = (product_id) => {
    axios.get(`https://back-end-capstone-project.onrender.com/product/${product_id}`, { withCredentials: true })
      .then(response => {
        setProduct(response.data.product);

      }).catch(error => {
        console.error('getProduct error', error);
      }).finally(() => {
        setLoading(false); 
      });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  let image_product = [];
  let products_name, products_id, products_description, products_material, products_price, products_quantity, products_price_discounted_10,
  products_price_discounted_20;

  if (product) {
    ({
      image_product,
      products_name,
      products_id,
      products_description,
      products_material,
      products_quantity,
      products_price,
      products_price_discounted_10,
      products_price_discounted_20
    } = product);
  }

  const handleCloseCartModal = () => {
    setCartModalIsOpen(false);
  };


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
  };

    const toggleEdit = () => {
      setIsEditing(!isEditing);
  };

  if (isEditing && product) {
      return <EditProduct product={product} onClose={toggleEdit} />;
  }

  return (
    <div>
      <ShoppingCartModal 
        handleCloseCartModal={handleCloseCartModal} 
        modalIsOpen={cartModalIsOpen}
        products_name={products_name} 
        products_price={products_price}
        image_product={image_product}/>

      {loading ? ( 
        <div className='spinner'>
          <ImSpinner3 className="spinner-icon" />
        </div>
      ) : (
        <div>
        {product ? (
          <div className='product-details'>
            <div className='left-column'>

              {image_product.length > 1 ? (
                <Slider {...settings} >
                  {image_product.map((url, index) => (
                    <div key={index} className='slick-slide'>
                      <img src={url} alt={products_name} />
                    </div>
                  ))}
                </Slider>
              ) : (
                <img src={image_product[0]} alt={products_name} />
              )}
            </div>

            <div className='right-column'>
              <h3>{products_name}</h3>

              <div className='products-id'>
                <p className={`${worksans.className}`}>REF. {products_id}</p>
              </div>
              
              <p className={`${worksans.className}`}>{products_price} EUR</p>
              <p>{products_description}</p>
              <p>Composición: {products_material}</p>

              <div className='btn-wrapper'>
                <div className='add-btn'>
                  {products_quantity > 0 ? (
                    <button onClick={handleAddProductToCart} className='btn'>Añadir</button>
                  ) : (
                    <div className='btn-agotado'><button disabled className='btn'>Agotado</button></div>
                  )}
                </div>
                
                <div className='edit-btn'>
                  {userRole === 'ADMIN' && (
                    <button onClick={toggleEdit} className='btn'>Editar</button>
                  )}
                </div>
              </div>
            </div>  
          </div>
        ) : (
          <p>Loading...</p>
        )} 
        </div>
      )}
    </div>
  );
};

export default ProductDetails;