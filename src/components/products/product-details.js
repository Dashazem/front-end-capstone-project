import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import axios from 'axios';
import { worksans, playfair_display } from '../../app/fonts/fonts';
import { addToCart } from '../../store/actions/cartActions';


import Slider from 'react-slick';
import ShoppingCartModal from '../modals/cart-modal';

import "../../../node_modules/slick-carousel/slick/slick.css"; 
import "../../../node_modules/slick-carousel/slick/slick-theme.css"; 

const ProductDetails = () => {
  const { product_id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [cartModalIsOpen, setCartModalIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getProduct(product_id);
  }, [product_id]);


  const getProduct = (product_id) => {
    axios.get(`http://127.0.0.1:5000/product/${product_id}`)
      .then(response => {
        console.log('response', response.data);
        setProduct(response.data.product);

      }).catch(error => {
        console.log('getProduct error', error);
      });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  let image_product = [];
  let products_name, products_id, products_description, products_material, products_price, products_quantity, products_price_discounted_10,
  products_price_discounted_20;

  if (product) {
    ({
      image_product,
      products_name,
      products_id,
      products_description,
      products_material,
      products_quantity,
      products_price,
      products_price_discounted_10,
      products_price_discounted_20
    } = product);
  }

  const handleCloseCartModal = () => {
    setCartModalIsOpen(false);
  };


  const handleAddProductToCart = () => {
    const productData = {
      id: products_id,
      name: products_name,
      price: products_price,
      image: image_product,
      max_quantity: products_quantity,
      price_10: products_price_discounted_10,
      price_20: products_price_discounted_20,
      action: "increment"
    };

    dispatch(addToCart(productData));
    setCartModalIsOpen(true); 
    console.log(`Product ID: ${products_id} added to cart`);
  };

  return (
    

    <div>
      <ShoppingCartModal 
        handleCloseCartModal={handleCloseCartModal} 
        modalIsOpen={cartModalIsOpen}
        products_name={products_name} 
        products_price={products_price}
        image_product={image_product}/>

      {product ? (
        <div className='product-details'>

        
          <div className='left-column'>

          {image_product.length > 1 ? (
              <Slider {...settings} >
                {image_product.map((url, index) => (
                  <div key={index} className='slick-slide'>
                    <img src={url} alt={products_name} />
                  </div>
                ))}
              </Slider>
            ) : (
              <img src={image_product[0]} alt={products_name} />
            )}
          </div>

          <div className='right-column'>
            <h3>{products_name}</h3>

            <div className='products-id'>
              <p className={`${worksans.className}`}>REF. {products_id}</p>
            </div>
            
            <p className={`${worksans.className}`}>{products_price} EUR</p>
            <p>{products_description}</p>
            <p>Composición: {products_material}</p>

            <div className='btn-wrapper'>
              <button onClick={handleAddProductToCart} className='btn'>Añadir</button>
            </div>

            
          </div>  
        </div>
      ) : (
        <p>Loading...</p>
      )} 
    </div>
  );
};

export default ProductDetails;

/*import React, { Component } from 'react';

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: this.props.match.params.slug,
      blogItem: {},
      editMode: false
    }

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleFeaturedImageDelete = this.handleFeaturedImageDelete.bind(this);
    this.handleUpdateFormSubmission = this.handleUpdateFormSubmission.bind(this);
  }

  handleUpdateFormSubmission(blog) {
    this.setState({
      blogItem: blog,
      editMode: false
    })
  }

  handleFeaturedImageDelete() {
    this.setState({
      blogItem: {
        featured_image_url: ""
      }
    });
  }

  handleEditClick() {
    if (this.props.loggedInStatus === "LOGGED_IN") {
      this.setState({ editMode: true });
    }
  }
    
  getBlogItem() {
    axios
      .get(`http://127.0.0.1:5000/products/${this.state.currentId}`)
      .then(response => {
        console.log('response', response.data);
        this.setState({
          blogItem: response.data.portfolio_blog
        })
      })
      .catch(error => {
        console.log('getBlogItem error', error);
      })
  }

  componentDidMount() {
    this.getBlogItem();
  }

  render() {
    const {
      title,
      content,
      featured_image_url,
      blog_status
    } = this.state.blogItem

    const contentManager = () => {
      if (this.state.editMode) {
        return <BlogForm 
                handleUpdateFormSubmission={this.handleUpdateFormSubmission} 
                handleFeaturedImageDelete = {this.handleFeaturedImageDelete} 
                editMode={this.state.editMode} 
                blog={this.state.blogItem} />;
      } else {
        return (
          <div className='content-container'>
            <h1 onClick={this.handleEditClick}>{title}</h1>

            <BlogFeaturedImage img={featured_image_url} />

            <div className='content'>{ReactHtmlParser(content)}</div>
        </div>
        );
      }
    }

    return (
      <div className='blog-container'>
        {contentManager()}
      </div>
    );
  }
}*/