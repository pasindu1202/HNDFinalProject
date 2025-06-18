import React from 'react';

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginFrom/LoginFrom';
import SignUp from './SignUpForm/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
