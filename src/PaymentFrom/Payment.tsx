import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Payment.css';
import { CiMail } from 'react-icons/ci';
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa6";
import { SiAmericanexpress } from "react-icons/si";
import { FaCcDiscover } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi2";
import { IoEarthOutline } from "react-icons/io5";
import { FaRegCreditCard } from "react-icons/fa6";

type PaymentFormInputs = {
    email: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardHolderName: string;
    country: string;
    zipCode: string;
}

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormInputs>();

    const onSubmit = (data: PaymentFormInputs) => {
        
        console.log(data);
        
        navigate("/payment");
    };

    const countries = [
        { value: 'AF', label: 'Afghanistan' },
        { value: 'AM', label: 'Armenia' },
        { value: 'AZ', label: 'Azerbaijan' },
        { value: 'BH', label: 'Bahrain' },
        { value: 'BD', label: 'Bangladesh' },
        { value: 'BT', label: 'Bhutan' },
        { value: 'BN', label: 'Brunei' },
        { value: 'KH', label: 'Cambodia' },
        { value: 'CN', label: 'China' },
        { value: 'CY', label: 'Cyprus' },
        { value: 'GE', label: 'Georgia' },
        { value: 'IN', label: 'India' },
        { value: 'ID', label: 'Indonesia' },
        { value: 'IR', label: 'Iran' },
        { value: 'IQ', label: 'Iraq' },
        { value: 'IL', label: 'Israel' },
        { value: 'JP', label: 'Japan' },
        { value: 'JO', label: 'Jordan' },
        { value: 'KZ', label: 'Kazakhstan' },
        { value: 'KW', label: 'Kuwait' },
        { value: 'KG', label: 'Kyrgyzstan' },
        { value: 'LA', label: 'Laos' },
        { value: 'LB', label: 'Lebanon' },
        { value: 'MY', label: 'Malaysia' },
        { value: 'MV', label: 'Maldives' },
        { value: 'MN', label: 'Mongolia' },
        { value: 'MM', label: 'Myanmar (Burma)' },
        { value: 'NP', label: 'Nepal' },
        { value: 'KP', label: 'North Korea' },
        { value: 'OM', label: 'Oman' },
        { value: 'PK', label: 'Pakistan' },
        { value: 'PS', label: 'Palestine' },
        { value: 'PH', label: 'Philippines' },
        { value: 'QA', label: 'Qatar' },
        { value: 'SA', label: 'Saudi Arabia' },
        { value: 'SG', label: 'Singapore' },
        { value: 'KR', label: 'South Korea' },
        { value: 'LK', label: 'Sri Lanka' },
        { value: 'SY', label: 'Syria' },
        { value: 'TW', label: 'Taiwan' },
        { value: 'TJ', label: 'Tajikistan' },
        { value: 'TH', label: 'Thailand' },
        { value: 'TL', label: 'Timor-Leste' },
        { value: 'TR', label: 'Turkey' },
        { value: 'TM', label: 'Turkmenistan' },
        { value: 'AE', label: 'United Arab Emirates' },
        { value: 'UZ', label: 'Uzbekistan' },
        { value: 'VN', label: 'Vietnam' },
        { value: 'YE', label: 'Yemen' }
]


    return (
        <div className='payment-wapper-body'>
        <div className='payment-navigation'>
            <p>CVScreen</p>
            <div className='nav-buttons'>
                <Link to="/home" className={`nav-btn-home ${location.pathname === "/home" ? "active" : ""}`}>Home</Link>
                <Link to="/" className={`nav-btn-signin ${location.pathname === "/" ? "active" : ""}`}>Sign In</Link>
            </div>
        </div>

        <div className='payment-wapper'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='payment-title'>
                    <h1>
                        Complete Your Payment
                    </h1>
                </div>

                <div className='payment-subtitle'>
                    <p>Your payment information is secured with industry-standard encryption.</p>
                 </div>

                 <div className='payment-amount'>
                    <p>$79.00</p>

                 </div>

                 <div className='payment-input-box'>
                    <label>Email</label>
                    <div className='payment-input-wapper'>
                        <span className='payment-input-icon'><CiMail /></span>
                        <input type='email' placeholder='Enter your email'{...register("email", { required: "Email is required" })}/>
                    </div>
                    {errors.email && <p className="payment-error">{errors.email.message || '\u00A0'}</p>}  
                 </div>


                 <div className='payment-card-input-box'>
                    <label>Card Information</label>
                    <div className='payment-input-wapper'>
                        <span className='payment-input-payicon'><FaCcVisa /><FaCcMastercard /><SiAmericanexpress /><FaCcDiscover /></span>
                        <input type='text' placeholder='1234 1234 1234 1234'{...register("cardNumber", { required: "Card number is required" })}/>

                    </div>
                    {errors.cardNumber && <p className="payment-error">{errors.cardNumber.message || '\u00A0'}</p>}  
                 </div>
                 <div className='payment-cvv-date-wapper'>
                    <div className='payment-cvv-date-box '>
                    <div className='payment-input-wapper'>
                        <input type='text' placeholder='MM/YY'{...register("expiryDate", { required: "Expiry date is required" })}/>
                    </div>
                    {errors.expiryDate && <p className="payment-error">{errors.expiryDate.message || '\u00A0'}</p>}
                 </div>

                 <div className='payment-cvv-box '>
                    <div className='payment-input-wapper'>
                        <span className='payment-input-payiconcvv'><FaRegCreditCard /></span>
                        <input type='text' placeholder='CVV' {...register("cvv", { required: "CVV is required" })}/>
                    </div>
                    {errors.cvv && <p className="payment-error">{errors.cvv.message || '\u00A0'}</p>}
                 </div>

                 </div>
                 <div className='payment-input-box'>
                    <label>Cardholder Name</label>
                    <div className='payment-input-wapper'>
                        <span className='payment-input-icon'><HiOutlineUser /></span>
                        <input type='text' placeholder='Enter cardholder name'{...register("cardHolderName", { required: "Cardholder name is required" })}/>
                    </div>
                    {errors.cardHolderName && <p className="payment-error">{errors.cardHolderName.message || '\u00A0'}</p>}  
                 </div>
                 <div className='payment-country-box'>
                    <label>Country or Region</label>
                     <div className='payment-input-wapper'>
                        <span className='payment-input-icon'><IoEarthOutline /></span>
                        <select {...register("country", { required: "Country is required" })}>
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                            <option key={country.value} value={country.value}>
                                {country.label}
                            </option>
                        ))}
                    </select>
                     </div>
                    
                    {errors.country && <p className="payment-error">{errors.country.message || '\u00A0'}</p>}
                 </div>

                 <button type="submit" className='payment-button'>Pay Now</button>

            </form>
        </div>


        
        </div>
    );
};

export default Payment;
