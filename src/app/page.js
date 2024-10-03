'use client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from '../components/navigation/navbar';
import Home from '../components/pages/home';
import Login from '../components/pages/login';
import ShoppingCart from '../components/pages/cart';
import Products from '../components/products/products';
import Icons from '../components/helpers/icons';

import { Provider } from 'react-redux';
import store from '../store/store';


import Footer from '../components/navigation/footer';
import ProductDetails from '../components/products/product-details';

export default function App() {
  Icons();
  return (
    <Provider store={store}>
      <div>
        <Router>
          <div>
            <NavBar />

            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<ShoppingCart />} />
              <Route exact path="/categories/:slug" element={<Products />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:product_id" element={<ProductDetails />} />
            </Routes>

            <Footer />
          </div>
        </Router>
      </div>
    </Provider>
  );
}
