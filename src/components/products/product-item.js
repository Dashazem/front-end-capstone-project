import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { worksans } from '../../app/fonts/fonts';

import ShoppingCartModal from '../modals/cart-modal';

export default class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productItemClass: "",
      categoriesModalIsOpen: false,
    }
    
    this.addProductToCart = this.addProductToCart.bind(this);
    
    this.handleCloseAllCategories = this.handleCloseAllCategories.bind(this);
  }


  addProductToCart(event) {
    //event.preventDefault(); // Запобігаємо переходу
    //event.stopPropagation();
    this.setState({ categoriesModalIsOpen: true });// логіка для додавання продукту до кошика
    console.log(`Product ID: ${this.props.product.products_id} added to cart`);
  }

  handleCloseAllCategories() {
    this.setState({
      categoriesModalIsOpen: false
    });
  }
  render() {
    const { 
      products_id, 
      products_name, 
      products_price, 
      products_price_discounted_10, 
      products_price_discounted_20, 
      image_product 
    } = this.props.product;

    return (
      <div className='product-wrapper'>
        <ShoppingCartModal 
            handleCloseAllCategories={this.handleCloseAllCategories} 
            modalIsOpen={this.state.categoriesModalIsOpen}/>

        <div className='image-wrapper'>
          <Link to={`/product/${products_id}`} >
            <img src={image_product[0]} alt={products_name} />
          </Link>

          <div className='icon-wrapper'>
            
            
            <button onClick={this.addProductToCart} className='icon-button' aria-label="Add to cart"><FontAwesomeIcon icon="circle-plus" className='add-to-cart-icon'/></button>
          </div> 
        </div>

        <Link to={`/product/${products_id}`} >
          <div className='product-name'>
            <p>{products_name}</p>
          </div>
        </Link>

        <div className='product-price'>
          <p className={`${worksans.className}`}>{products_price} EUR</p>
        </div>

      </div>
    );
  }
}


/*(
  <div key={product.products_id}>
    <h1>{product.products_name}</h1>
    <img className='image-product' src={product.image_product[0]} alt={product.products_name} />
  </div>
));*/