import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Cart = ({ items }) => {
  const navigate = useNavigate(); 

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  return (
    <div>
      {items.length === 0 ? (
        <div className='empty-cart-wrapper'>
          <h3>TU CESTA ESTÁ VACÍA</h3>
          
          <p>También puedes recuperar tu cesta al iniciar sesión</p>

          <button className='btn' onClick={handleLoginClick}>INICIAR SESIÓN</button>
        </div>
      ) : (
        items.map(item => (
          <div key={item.id}>
            {item.name} - {item.price} EUR
            {item.id}
            {item.quantity}
            {item.id}
            {item.price_10}
            {item.price_20}
          </div>
        ))
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  items: state.cart.items,
});

export default connect(mapStateToProps)(Cart);

