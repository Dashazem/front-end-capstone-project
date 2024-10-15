'use client';
import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Link from 'next/link';
import { worksans } from '../../fonts/fonts';

ReactModal.setAppElement('body');

export default class ShoppingCartModal extends Component {
  constructor(props) {
    super(props);

    this.customStyles = {
      content: {
        top: "100px", 
        left: "1175px", 
        bottom: "auto",
        marginRight: "0",
        marginLeft: "0",
        width: "300px",
        height: "auto",
      },

      overlay: {
        backgroundColor: "rgba(255,255,255, 0)",
        zIndex: "1000",
      },

      mobile: {
        content: {
          top: "100px",
          left: "25px",
          right: "20px",
          bottom: "auto",
          margin: "0 auto",
          width: "80%",
          maxWidth: "300px",
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "white",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        },
      },
    }

    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.autoCloseModal = null; 
  }

  componentDidMount() {
    if (this.props.modalIsOpen) {
      document.body.style.overflow = 'hidden'; 
      this.autoCloseModal = setTimeout(() => {
        this.props.handleCloseCartModal();
      }, 5000); 
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.modalIsOpen !== this.props.modalIsOpen) {
      document.body.style.overflow = this.props.modalIsOpen ? 'hidden' : 'auto'; 
      if (this.props.modalIsOpen) {
        this.autoCloseModal = setTimeout(() => {
          this.props.handleCloseCartModal();
        }, 5000); 
      } else {
        clearTimeout(this.autoCloseModal); 
      }
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
    clearTimeout(this.autoCloseModal); 
  }

  handleLinkClick() {
    this.props.handleCloseCartModal(); 
    clearTimeout(this.autoCloseModal); 
  }

  render() {
    const { products_name, products_price, image_product, modalIsOpen } = this.props; 
    const isMobile = window.innerWidth <= 615; 

    return (
      <div className='cart-modal-wrapper'>
        <ReactModal 
          style={isMobile ? this.customStyles.mobile : this.customStyles} 
          onRequestClose={() => {this.props.handleCloseCartModal();}} 
          isOpen={modalIsOpen}>
          <div className='cart-modal-content'>
            <p>AÑADIDO A TU CESTA</p>

            <div className='cart-modal-container'>
              <div className='cart-modal-image'>
                <img src={image_product[0]} alt={products_name} />
              </div>

              <div className='cart-modal-text'>
                <p>{products_name}</p>
                <p className={worksans.className}>{products_price} EUR</p>
              </div>
            </div>

            <div className='cart-modal-link'>
              <Link href="/cart" onClick={this.handleLinkClick}><p>VER CESTA</p></Link>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}