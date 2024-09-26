'use client';
import axios from 'axios';

import React, { Component } from 'react';

export default class Test extends Component {
  constructor() {
    super();

    this.state = {
      data: []
    };
    
    //this.portfolioItems = this.portfolioItems.bind(this);
  }

  /*це з прошлого componentDidMount() {
    this.getPortfolioItems();
  }

  getPortfolioItems(filter = null) {
    axios
    .get('https://dashazem.devcamp.space/portfolio/portfolio_items')
    .then(response => {
      console.log('resonse', response);
      if (filter) {
        this.setState({
          data: response.data.portfolio_items.filter(item => {
            return item.category === filter;
          })
        })
      } else {
        this.setState({
          data: response.data.portfolio_items
        })
      }
      
    })
    .catch(error => {
      console.log('getPortfolioItems filter', error);
    });
  }

  portfolioItems() {
    return this.state.data.map(item => {
      return <PortfolioItem key={item.id} item={item} />;
    })
  }*/

  getProducts() {
    axios.get('http://127.0.0.1:5000/products'
    ).then(response => {
      console.log(response);
      this.setState({
        data: response.data.products
      })
    }).catch(error => {
      console.log('getProducts error', error);
    })
  }

  componentDidMount() {
    this.getProducts()
  }
  
  portfolioItems() {
    return this.state.data.map(product => {
      
      return (
        <div key={product.products_id}>
        <h1>{product.products_name}</h1>
        {product.image_product.map((image) => (
          <div key={image.id} style={{ margin: '10px' }}>
            <img src={image} alt='product image' style={{ width: '200px' }} />
          </div>
        ))}
        {/* якшо одна картинка треба */}
        <img className='image-product' src={product.image_product[0]} />    
        </div>
      );
    })
  } 

  /*getProduct() {
    axios.get('http://127.0.0.1:5000/products/1'
    ).then(response => {
      console.log(response);
      this.setState({
        data: response.data.product
      })
    }).catch(error => {
      console.log('getProducts error', error);
    })
  }
  componentDidMount() {
    this.getProduct()
  }*/

  render() {
    return (
      <div>
        My test
        {this.portfolioItems()}
        {/* <img src={this.state.data.images}/> */}
      </div>
    );
  }
}