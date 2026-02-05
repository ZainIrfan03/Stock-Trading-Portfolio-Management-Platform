import React from 'react';
import ReactDOM from 'react-dom/client';
import Homepage from './landing_page/home/Homepage';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';  
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Signup from './landing_page/signup/Signup';
import Login from './landing_page/login/Login'; // Add this import
import AboutPage from './landing_page/about/AboutPage';
import PricingPage from './landing_page/pricing/PricingPage';
import ProductPage from './landing_page/products/ProductsPage';
import SupportPage from './landing_page/support/SupportPage';
import NotFound from './landing_page/NotFound';
import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';

import Dashboard from './landing_page/dashboard/Dashboard'; // Add this import




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
<CookiesProvider>
  <BrowserRouter>
   <Navbar />
  <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/> {/* Add login route */}
      <Route path='/dashboard' element={<Dashboard/>}/> {/* Protected dashboard */}
      <Route path='/about' element={<AboutPage/>}/>
      <Route path='/product' element={<ProductPage/>}/>
      <Route path='/pricing' element={<PricingPage/>}/>
      <Route path='/support' element={<SupportPage/>}/>
      <Route path='*' element={<NotFound/>}/>
  </Routes>
  <Footer />
  </BrowserRouter>
    </CookiesProvider>
   
);


