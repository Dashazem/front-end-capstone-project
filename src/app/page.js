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
import CreateAccount from "../components/pages/create-account";
import User from "../components/pages/user";
import Admin from "../components/pages/admin";
import UserProfile from "../components/user/user-profile";
import UserOrders from "../components/user/user-orders";
import UserAddresses from "../components/user/user-addresses";
import UserPaymentDetails from "../components/user/user-payment-details";
import UserAddAddress from "../components/user/user-add-address";
import UserEditAddress from "../components/user/user-edit-address";
import AdminOrders from "../components/admin/admin-orders";
import AdminCustomers from "../components/admin/admin-customers";
import AdminProfile from "../components/admin/admin-profile";
import CreateAdmin from "../components/admin/create-admin";
import DeleteAccount from "../components/pages/delete-account";
import OrderAddress from '../components/order/order-address';
import OrderPayment from "../components/order/order-payment";



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
              <Route path="/register" element={<CreateAccount />} />
              {/* <Route path="/admin" element={
                <ProtectedRoute role="ADMIN">
                    <AdminComponent />
                </ProtectedRoute>
              } />
              <Route path="/user" element={
                <ProtectedRoute role="USER">
                    <UserComponent />
                </ProtectedRoute>
              } /> */}
              <Route path="/user" element={<User />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/user/profile" element={<UserProfile />} />
              <Route path="/user/orders" element={<UserOrders />} />
              <Route path="/user/addresses" element={<UserAddresses />} />
              <Route path="/add-address" element={<UserAddAddress />} />
              <Route path="/edit-address/:addressId" element={<UserEditAddress />} />
              <Route path="/user/payment-details" element={<UserPaymentDetails />} />

              <Route path="/admin/profile" element={<AdminProfile />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/customers" element={<AdminCustomers />} />
              <Route path="/admin/create-admin" element={<CreateAdmin />} />
              <Route path="/delete-account" element={<DeleteAccount />} />

              <Route path="/order-address" element={<OrderAddress />} />
              <Route path="/order-payment" element={<OrderPayment />} />


            </Routes>

            <Footer />
          </div>
        </Router>
      </div>
    </Provider>
  );
}
