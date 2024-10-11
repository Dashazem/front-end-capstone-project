import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Link from 'next/link';

ReactModal.setAppElement('body');

export default class CategoriesModal extends Component {
  constructor(props) {
    super(props);

    this.customStyles = {
      content: {
        top: "50px", 
        left: "60px", 
        bottom: "auto",
        marginRight: "0",
        marginLeft: "0",
        width: "300px",
        height: "auto", 
        paddingTop: "40px"
      },

      overlay: {
        backgroundColor: "rgba(255,255,255, 0)",
        zIndex: "1000"
      }
    }

    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  componentDidMount() {
    if (this.props.modalIsOpen) {
      document.body.style.overflow = 'hidden'; 
    }
  }

 componentDidUpdate(prevProps) {
    if (prevProps.modalIsOpen !== this.props.modalIsOpen) {
      document.body.style.overflow = this.props.modalIsOpen ? 'hidden' : 'auto'; 
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
  }

  handleLinkClick() {
    this.props.handleCloseAllCategories(); 
  }

  render() {
    return (
      <div className='categories-modal-wrapper'>
        <ReactModal style={this.customStyles} onRequestClose={() => {this.props.handleCloseAllCategories();}} isOpen={this.props.modalIsOpen}>
          <div className='category-links'>
            <div className='category-link'>
              <Link href="/products/juguetes" onClick={this.handleLinkClick}>JUGUETES AMIGURUMI</Link><br/>
            </div>
            
            <div className='category-link'>
              <Link href="/products/mordedores" onClick={this.handleLinkClick}>MORDEDORES</Link><br/>
            </div>

            <div className='category-link'>
              <Link href="/products/patucos" onClick={this.handleLinkClick}>PATUCOS</Link><br/>
            </div>
            
            <div className='category-link'>
              <Link href="/products/moviles" onClick={this.handleLinkClick}>MÓVILES DE CUNA</Link><br/>
            </div>
            
            <div className='category-link'>
              <Link href="/products" onClick={this.handleLinkClick}>VER TODO</Link><br/>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}