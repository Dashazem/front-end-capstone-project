'use client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from '../components/navigation/navbar';
import Home from '../components/pages/home';
import Login from '../components/pages/login';
import ShoppingCart from '../components/pages/cart';
import Products from '../components/pages/products';
import Icons from '../components/helpers/icons';



import Footer from '../components/navigation/footer';

export default function App() {
  Icons();
  return (
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
          </Routes>

          <Footer />
        </div>
      </Router>
    </div>
  );
}
