'use client';
import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { worksans } from '../../fonts/fonts';
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { increaseItemQuantity, decreaseItemQuantity } from '../../store/reducers/cartReducer';

const Cart = ({ items, increaseItemQuantity, decreaseItemQuantity, auth }) => {
  const router = useRouter();
  const [message, setMessage] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const incrementMessage = useSelector(state => state.cart.errorMessage);

  
  useEffect(() => {
    if (incrementMessage) {
      setErrorMessage(incrementMessage);
      const timer = setTimeout(() => setErrorMessage(''), 2000); 
      return () => clearTimeout(timer); 
    }
  }, [incrementMessage]);
  

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
    }
  }, []);


  const getQuantity = (itemId) => {
    const existingItem = items.find(item => item.id === itemId);
    return existingItem ? existingItem.quantity : 0;
  };

  const getTotalQuantity = () => {
    return items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };

  const handleStartOrder = () => {
    if (auth.role === "ADMIN") {
      setMessage("No se puede tramitar pedido para Administrador");
    } else if (auth.role === "USER") {
      router.push('/order/address');
    } else {
      router.push('/login');
    }
  };

  return (
    <div>
      {items.length === 0 ? (
        <div className='empty-cart-wrapper'>
          <h2>TU CESTA ESTÁ VACÍA</h2>
          
          <p>Añade algunos artículos y comienza su pedido</p>
        </div>
      ) : (
        <div className='full-cart-wrapper'>
          <div className='header-wrapper'>
            <h2>TU CESTA ({getTotalQuantity()})</h2>

            <div className="error-message">
              {errorMessage && <div className='error-message'><p>{errorMessage}</p></div>}
            </div>
          </div>
          

          {items.map(item => (
            <div key={item.id} className='cart-product-container'>
              <div className='left-column'>
                <img src={item.image[0]} alt={item.name} />
              </div>

              <div className='central-column'>
                <p>{item.name}</p>
                <p className={`${worksans.className}`}>REF. {item.id}</p>
              </div>

              <div className='right-column'>
                <p className={`${worksans.className}`}>{item.price} EUR</p>
                
                {/* {item.price_10} EUR
                {item.price_20} EUR */}

                <div className='icons'>
                  <div>
                  <button className='icon-button' onClick={() => decreaseItemQuantity({ id: item.id })}>
                      <FaCircleMinus className='cart-icon'/>
                    </button>
                  </div>

                  <div className='quantity-number'>
                    <p>{getQuantity(item.id)}</p>
                  </div>

                  <div>
                    <button className='icon-button' onClick={() => increaseItemQuantity({ id: item.id })}>
                      <FaCirclePlus className='cart-icon'/>
                    </button>
                  </div>
                
                </div>

                
              </div>
            </div>
          ))}

          <div className='process-order-contaniner'>
            <div className='process-order-button' >
              <button className='btn' onClick={handleStartOrder}>TRAMITAR PEDIDO</button>
              {message && <div className='error-message'><p>{message}</p></div>}
            </div>

            <div className='process-order-content'>
              <div className='process-order-price'>
                <h4 className={`${worksans.className}`}>TOTAL {totalAmount.toFixed(2)} EUR</h4>
              </div>

              <div className='process-order-text'>
                <p>Impuestos incluidos</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  items: state.cart.items,
  auth: state.auth,
});

export default connect(mapStateToProps, { increaseItemQuantity, decreaseItemQuantity })(Cart);

