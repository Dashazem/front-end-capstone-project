'use client';
import axios from 'axios';
import React, { Component } from 'react';
import { DropzoneComponent } from 'react-dropzone-component';

/*import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";*/

export default class CreateNewProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products_name: "",
      products_category: "",
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
    this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this);
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

  handleFeaturedImageDrop = (file) => {
    this.setState(prevState => ({
        image_product: [...prevState.image_product, file]
    }));
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
    if (this.state.image_product) {
      this.state.image_product.forEach((image, index) => {
          formData.append(`image_product_${index}`, image);
      });
    } 
    return formData;
  }

  handleSubmit(event) {
    event.preventDefault(); 

    const formData = this.buildForm(); 
    axios.post('http://127.0.0.1:5000/products', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    .then(response => {
        const productId = response.data.products_id; 

        const imageFormData = this.buildImage();
        // Додаємо productId до кожного зображення
        imageFormData.append('products_id', productId); 

        return axios.post('http://127.0.0.1:5000/upload_image', imageFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    })
    .then(response => {
        console.log('Image response', response);
        this.setState({
            products_name: "",
            products_category: "",
            products_description: "",
            products_material: "",
            products_quantity: "",
            products_price: "",
            image_product: []
        });
    })
    .catch(error => {
        console.log('Error', error);
    });
  }

       
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div >
          <form onSubmit={this.handleSubmit}>
          <input 
            type="text"
            onChange={this.handleChange} 
            name="products_name"
            placeholder="Nombre"
            value={this.state.products_name}
          />

          <input 
            type="text"
            onChange={this.handleChange} 
            name="products_category"
            placeholder="Categoría"
            value={this.state.products_category}
          />

          <textarea 
            type="text"
            onChange={this.handleChange} 
            name="products_description"
            placeholder="Descripción"
            value={this.state.products_description}
          />

          <input 
            type="text"
            onChange={this.handleChange} 
            name="products_material"
            placeholder="Material"
            value={this.state.products_material}
          />
     
          <input 
            type="text"
            onChange={this.handleChange} 
            name="products_quantity"
            placeholder="Cantidad"
            value={this.state.products_quantity}
          />

          <input 
            type="text"
            onChange={this.handleChange} 
            name="products_price"
            placeholder="Precio"
            value={this.state.products_price}
          />

          <div>
            <DropzoneComponent
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={{
                addedfile: this.handleFeaturedImageDrop,
              }}
            >
              <div className='dz-message'>Product Image</div>
            </DropzoneComponent>

            <DropzoneComponent
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={{
                addedfile: this.handleFeaturedImageDrop,
              }}
            >
              <div className='dz-message'>Product Image</div>
            </DropzoneComponent>

            <DropzoneComponent
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={{
                addedfile: this.handleFeaturedImageDrop,
              }}
            >
              <div className='dz-message'>Product Image</div>
            </DropzoneComponent>
          </div> 

          <button className='btn'>Save</button>
        </form>
      </div>
    );
  }
}