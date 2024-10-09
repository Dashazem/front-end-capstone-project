import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { worksans } from '../../app/fonts/fonts';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { increaseItemQuantity, decreaseItemQuantity } from '../../store/reducers/cartReducer';

const Cart = ({ items, increaseItemQuantity, decreaseItemQuantity, auth }) => {
  const navigate = useNavigate(); 
  const [message, setMessage] = useState(''); 
  const totalAmount = useSelector(state => state.cart.totalAmount);
  

  /*const getTotalAmount = () => {
    const total = items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
    return Number(total.toFixed(2)); 
  };*/

  const handleLoginClick = () => {
    navigate('/login'); 
  };

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
      navigate('/order-address');
    } else {
      navigate('/login');
    }
  };
//TODO переглянути чи можна зарекуперарити корзину якщо залогінився якщо ні то видалити ту кнопку або поставити умова що залогінений
  return (
    <div>
      {items.length === 0 ? (
        <div className='empty-cart-wrapper'>
          <h2>TU CESTA ESTÁ VACÍA</h2>
          
          <p>También puedes recuperar tu cesta al iniciar sesión</p>

          <button className='btn' onClick={handleLoginClick}>INICIAR SESIÓN</button> 
        </div>
      ) : (
        <div className='full-cart-wrapper'>
          <h2>TU CESTA ({getTotalQuantity()})</h2>

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
                      <FontAwesomeIcon icon="circle-minus" className='cart-icon'/>
                    </button>
                  </div>

                  <div className='quantity-number'>
                    <p>{getQuantity(item.id)}</p>
                  </div>

                  <div>
                    <button className='icon-button' onClick={() => increaseItemQuantity({ id: item.id })}>
                      <FontAwesomeIcon icon="circle-plus" className='cart-icon'/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className='process-order-contaniner'>
            <div className='process-order-button' >
              <button className='btn' onClick={handleStartOrder}>TRAMITAR PEDIDO</button>
              {message && <p>{message}</p>}
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

