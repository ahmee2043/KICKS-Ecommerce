import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './Components/AuthScreen/registrationPage/Registration';
import Layout from './Components/reuseable/layout/layout';
import Login from './Components/AuthScreen/LoginPage/Login'; 
import Forget from './Components/AuthScreen/ForgetPage/Forget'; 
import HomePage from './Pages/HomePage/HomePage';
import Product from './Pages/ProductPage/Product';
import ProductList from './Pages/Product-listing/productList';
import ScrollToTop from './Components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/shop" element={<ProductList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
