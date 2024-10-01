import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { NavLink } from 'react-router-dom';

//TODO ReactModal.setAppElement('.app-wrapper');

export default class ShoppingCartModal extends Component {
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
        backgroundColor: "rgba(255,255,255, 0)"
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
      <div>
        <ReactModal style={this.customStyles} onRequestClose={() => {this.props.handleCloseAllCategories();}} isOpen={this.props.modalIsOpen}>
          <div>
            <div>
              <p>Producto añadido a la cesta.</p>
            </div>

            <div>
              <NavLink to="/cart" onClick={this.handleLinkClick}>VER CESTA</NavLink>
            </div>
        

          </div>
        </ReactModal>
      </div>
    );
  }
}