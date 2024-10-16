'use client';
import axios from 'axios';
import React, { Component } from 'react';
import { DropzoneComponent } from 'react-dropzone-component';

import "../../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default class CreateProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products_name: "",
      products_category: "Juguetes",
      products_description: "",
      products_material: "",
      products_quantity: "",
      products_price: "",
      image_product: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleImageDrop = this.handleImageDrop.bind(this);
    this.mainRef = React.createRef();
    this.firstAdditionalRef = React.createRef();
    this.secondAdditionalRef = React.createRef();
  }

  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post"
    }
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1
    }
  }

  handleImageDrop = (file, dropzone) => {
    this.setState(prevState => {
      const newImages = [...prevState.image_product]; 
  
      
      if (dropzone === 'main') {
        newImages[0] = file; 
      } else if (dropzone === 'firstAdditional') {
        newImages[1] = file; 
      } else if (dropzone === 'secondAdditional') {
        newImages[2] = file; 
      }
  
      return { image_product: newImages, successMessage: "" };
    });
  }
  


  buildForm() {
    let formData = new FormData();

    formData.append("products_name", this.state.products_name);
    formData.append("products_category", this.state.products_category);
    formData.append("products_description", this.state.products_description);
    formData.append("products_material", this.state.products_material);
    formData.append("products_quantity", this.state.products_quantity);
    formData.append("products_price", this.state.products_price);
    
    return formData;
  }

  buildImage() {
    let formData = new FormData();
    this.state.image_product.forEach((image, index) => {
      if (image) {
        formData.append(`image_product_${index}`, image);
      }
    });
    return formData;
  }
  
  handleSubmit(event) {
    event.preventDefault(); 
  
    const formData = this.buildForm(); 
    axios.post('https://backend-crochet-knit.onrender.com/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }, { withCredentials: true })
    .then(response => {
      const productId = response.data.products_id; 

      const imageFormData = this.buildImage();
      imageFormData.append('products_id', productId); 

      return axios.post('https://backend-crochet-knit.onrender.com/upload_image', imageFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
    })
    .then(response => {
      this.setState({
          products_name: "",
          products_category: "Juguetes",
          products_description: "",
          products_material: "",
          products_quantity: "",
          products_price: "",
          image_product: {},
          successMessage: "Producto creado con éxito."
      });

      [this.mainRef, this.firstAdditionalRef, this.secondAdditionalRef].forEach(ref => {
        ref.current.dropzone.removeAllFiles();
      });
    })
    .catch(error => {
      console.error('Error', error);
    });
  }


  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      successMessage: "" 
    })
  }

  render() {
    return (
      <div className='create-product-wrapper'>
        <form onSubmit={this.handleSubmit}>
          <div className='create-product-container'>
            <div className='create-product-inputs'>
              <input 
                type="text"
                onChange={this.handleChange} 
                name="products_name"
                placeholder="Nombre*"
                value={this.state.products_name}
              />

              <select 
                name="products_category"
                value={this.state.products_category}
                onChange={this.handleChange}
                className='select-element'
              >
                <option value='Juguetes'>Juguetes</option>
                <option value='Patucos'>Patucos</option>
                <option value='Moviles'>Moviles</option>
                <option value='Mordedores'>Mordedores</option>
              </select>

              <input 
                type="text"
                onChange={this.handleChange} 
                name="products_material"
                placeholder="Material*"
                value={this.state.products_material}
              />
          
              <input 
                type="text"
                onChange={this.handleChange} 
                name="products_quantity"
                placeholder="Cantidad*"
                value={this.state.products_quantity}
              />

              <input 
                type="text"
                onChange={this.handleChange} 
                name="products_price"
                placeholder="Precio* (ej. 15.00)"
                value={this.state.products_price}
              />

              <textarea 
                type="text"
                onChange={this.handleChange} 
                name="products_description"
                placeholder="Descripción*"
                value={this.state.products_description}
              />
            </div>
            
            <div className='right-column'>
              <div className='create-product-uploaders'>
                <div>
                  <DropzoneComponent
                    ref={this.mainRef}
                    config={this.componentConfig()}
                    djsConfig={this.djsConfig()}
                    eventHandlers={{
                      addedfile: (file) => this.handleImageDrop(file, 'main'),
                    }}
                  >
                    <div className='dz-message'>Imagen Principal*</div>
                  </DropzoneComponent>
                </div>
                
                <div>
                  <DropzoneComponent
                    ref={this.firstAdditionalRef}
                    config={this.componentConfig()}
                    djsConfig={this.djsConfig()}
                    eventHandlers={{
                      addedfile: (file) => this.handleImageDrop(file, 'firstAdditional'),
                    }}
                  >
                    <div className='dz-message'>Imagen Adicional 1</div>
                  </DropzoneComponent>
                </div>
                
                <div>
                  <DropzoneComponent
                    ref={this.secondAdditionalRef}
                    config={this.componentConfig()}
                    djsConfig={this.djsConfig()}
                    eventHandlers={{
                      addedfile: (file) => this.handleImageDrop(file, 'secondAdditional'),
                    }}
                  >
                    <div className='dz-message'>Imagen Adicional 2</div>
                  </DropzoneComponent>
                </div>
              </div>

              <div className='create-product-button'>
                <button className='btn'>Save</button>
              </div>
              
              {this.state.successMessage && (
                <div className="success-message">
                  {this.state.successMessage}
                </div>
              )}
              
            </div> 
          </div>  
        </form>
      </div>
    );
  }
}