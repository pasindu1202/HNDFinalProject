import React from 'react';

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginFrom/LoginFrom';
import SignUp from './SignUpForm/SignUp';
import Payment from './PaymentFrom/Payment';
import Dashboard from './Dashboard/Dashboard';
import HomePage from './HomePage/HomePage';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CVAnalyzer from './CVAnalyzer/CVAnalyzer';
import ProfileForm from './ProfileForm/ProfileForm';
import ResultPage from './ResultPage/ResultPage';


const stripePromise = loadStripe("APIKey"); 



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* <Route path='/payment' element={<Elements stripe={stripePromise}><Payment/></Elements>}/> */}
        {/* <Elements stripe={stripePromise}>
          
           <Route path="/payment" element={<Payment />} />

        </Elements> */}

        <Route path="/payment" element={<Elements stripe={stripePromise}><Payment /></Elements>} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hpage" element={<HomePage/>}/>
        <Route path="/cv-analyzer" element={<CVAnalyzer/>}/>
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/result" element={<ResultPage/>} />
        
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
