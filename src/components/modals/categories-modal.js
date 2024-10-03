import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { NavLink } from 'react-router-dom';

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
              <NavLink to="/categories/juguetes" onClick={this.handleLinkClick}>JUGUETES AMIGURUMI</NavLink><br/>
            </div>
            
            <div className='category-link'>
              <NavLink to="/categories/mordedores" onClick={this.handleLinkClick}>MORDEDORES</NavLink><br/>
            </div>

            <div className='category-link'>
              <NavLink to="/categories/patucos" onClick={this.handleLinkClick}>PATUCOS</NavLink><br/>
            </div>
            
            <div className='category-link'>
              <NavLink to="/categories/moviles" onClick={this.handleLinkClick}>MÓVILES DE CUNA</NavLink><br/>
            </div>
            
            <div className='category-link'>
              <NavLink to="/products" onClick={this.handleLinkClick}>VER TODO</NavLink><br/>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}