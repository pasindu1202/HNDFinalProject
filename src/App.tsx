import React from 'react';

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginFrom/LoginFrom';
import SignUp from './SignUpForm/SignUp';
import Payment from './PaymentFrom/Payment';
import Dashboard from './Dashboard/Dashboard';
import HomePage from './HomePage/HomePage';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hpage" element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
