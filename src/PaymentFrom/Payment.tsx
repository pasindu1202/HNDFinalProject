import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import './Payment.css';
import { CiMail } from 'react-icons/ci';
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa6";
import { SiAmericanexpress } from "react-icons/si";
import { FaCcDiscover } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi2";
import { IoEarthOutline } from "react-icons/io5";
import { FaRegCreditCard } from "react-icons/fa6";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";


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
    const { register, handleSubmit, formState: { errors }, control,clearErrors,setError } = useForm<PaymentFormInputs>();
    const strip = useStripe();
    const element = useElements();

    // const onSubmit = async(data: PaymentFormInputs) => {

    //     if(!strip || !element){
    //         console.error("Strip.js hasn't yet Load.")
    //         return;
    //     }
    //     const cardNumberElement = element.getElement(CardNumberElement);
    //     if (!cardNumberElement) return;


    //     const {error,paymentMethod} = await strip.createPaymentMethod({
    //         type:"card",
    //         card:cardNumberElement,
    //         billing_details: {
    //             email: data.email,
    //             name: data.cardHolderName,
    //             address: {
    //                 country: data.country,
    //                 postal_code: data.zipCode
    //             }
    //         }
    //     });

    //     if (error){
    //         console.error("[error]",error);
    //         alert(error.message);
    //     }
    //     else{
    //         console.log("[PaymentMethod]",paymentMethod);
    //         alert("Payment method created successfully!")
    //     }
    //     }
    // // console.log(data);

    // navigate("/");
    const [cardBrand, setCardBrand] = useState<string | null>(null);


    const onSubmit = async (data: PaymentFormInputs) => {
        if (!strip || !element) {
            console.error("Stripe.js hasn't yet loaded.");
            return;
        }

        const cardElement = element.getElement(CardElement);
        if (!cardElement) return;

        const paymentMethod = await strip.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                email: data.email,
                name: data.cardHolderName,
                address: {
                    country: data.country,
                    postal_code: data.zipCode
                }
            }
        });
        if (paymentMethod.error) {
            console.error("[error]", paymentMethod.error);
            alert(paymentMethod.error.message);
        } else {
            console.log("[PaymentMethod]", paymentMethod);
            alert("Payment method created successfully!");
            navigate("/");
        }

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


    // function setError(arg0: string, arg1: { message: string; }) {
    //     throw new Error(`Function not implemented: setError(${arg0}, ${arg1})`);
    // }

    const [focused, setFocused] = useState(false);
    const [focused1, setFocused1] = useState(false);
    const[focused2, setFocused2] = useState(false);

    return (
        <div className='payment-wapper-body'>
            <div className='payment-navigation'>
                <p>CVScreen</p>
                <div className='nav-buttons'>
                    <Link to="/hpage" className={`nav-btn-home ${location.pathname === "/hpage" ? "active" : ""}`}>Home</Link>
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
                            <input type='email' placeholder='Enter your email'{...register("email", { required: "Email is required",
                                pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,message:"Invalid email address"} })} />
                        </div>
                        {errors.email && <p className="payment-error">{errors.email.message || '\u00A0'}</p>}
                    </div>




                    <div className='payment-card-input-box'>
                        <label>Card Information</label>
                        <div className='controller-input-wapper'>
                            {/* <span className='payment-input-payicon'><FaCcVisa /><FaCcMastercard /><SiAmericanexpress /><FaCcDiscover /></span> */}
                            {/* <CardElement {...register("cardNumber", { required: "Card number is required" })}/> */}
                            {/* <input type='text' placeholder='1234 1234 1234 1234'{...register("cardNumber", { required: "Card number is required" })}/> */}
                            {/* <CardNumberElement className="stripe-input" /> */}
                            <Controller
                                control={control}
                                name="cardNumber"
                                defaultValue=""
                                rules={{ required: "Card number is required" }}
                                render={({ field }) => (
                                    <div className={`card-input-wrapper ${focused ? "focused" : ""}`}>
                                        <CardNumberElement
                                            options={{
                                                placeholder: "Enter your card number",
                                                style: {
                                                    base: {
                                                        color: "#fff",
                                                        fontSize: "16px",
                                                        "::placeholder": { color: "#999" }
                                                    }
                                                }
                                            }}
                                            onFocus={() => setFocused(true)}
                                            onBlur={() => setFocused(false)}
                                            onChange={(event) => {
                                                field.onChange(event);
                                                if (event.error) {
                                                    setError("cardNumber", { type: "manual", message: event.error.message });
                                                    console.log(event.error.message);
                                                }
                                                else{
                                                    clearErrors("cardNumber");
                                                    console.log("Card number is valid");
                                                }
                                                if (event.brand) {
                                                    setCardBrand(event.brand);
                                                    console.log("Detected brand:", event.brand);
                                                }
                                            }}
                                        />
                                        <span className="card-brand-icon">
                                            {cardBrand === "visa" && <FaCcVisa />}
                                            {cardBrand === "mastercard" && <FaCcMastercard />}
                                            {cardBrand === "amex" && <SiAmericanexpress />}
                                            {cardBrand === "discover" && <FaCcDiscover />}
                                        </span>
                                    </div>
                                )}
                            />
                            {errors.cardNumber && <p className="payment-error">{errors.cardNumber.message}</p>}
                        </div>
                        
                        </div>
                        <div className='payment-expiry-date-wapper'>
                            <div className='payment-expiry-box'>
                            <Controller
                                control={control}
                                name="expiryDate"
                                defaultValue=""
                                rules={{ required: "Expiry date is required" }}
                                render={({ field }) => (
                                    <div className={`payment-ExpiryDate-box ${focused1 ? "focused" : ""}`}>
                                        <CardExpiryElement
                                            options={{
                                                placeholder: "MM/YY",
                                                style: {
                                                    base: {
                                                        color: "#fff",
                                                        fontSize: "16px",
                                                        "::placeholder": { color: "#999" }
                                                    }
                                                }
                                            }}
                                            onFocus={() => setFocused1(true)}
                                            onBlur={() => setFocused1(false)}
                                            onChange={(event) => {
                                                field.onChange(event);
                                                if (event.error) {
                                                    setError("expiryDate", { type: "manual", message: event.error.message });
                                                    console.log(event.error.message);
                                                }
                                                else{
                                                    clearErrors("expiryDate");
                                                    console.log("Expiry date is valid");
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            />
                            {errors.expiryDate && <p className="payment-error">{errors.expiryDate.message}</p>}
                            </div>
                        

                        <div className='payment-cvv-box '>
                            <div className='payment-cvv-wapper'>
                                <span className='payment-input-payiconcvv'><FaRegCreditCard /></span>
                                <Controller
                                control={control}
                                name='cvv'
                                defaultValue=""
                                rules={{ required: "CVV is required" }}
                                render={({ field }) => (
                                    <div className={`payment-cvv-inputbox ${focused2 ? "focused" : ""}`}>
                                        <CardCvcElement
                                            options={{
                                                placeholder: "CVV",
                                                style: {
                                                    base: {
                                                        color: "#fff",
                                                        fontSize: "16px",
                                                        "::placeholder": { color: "#999" }
                                                    }
                                                }
                                            }}
                                            onFocus={() => setFocused2(true)}
                                            onBlur={() => setFocused2(false)}
                                            onChange={(event) => {
                                                field.onChange(event);
                                                if (event.error) {
                                                    setError("cvv", { type: "manual", message: event.error.message });
                                                    // setError("cvv", { message: event.error.message });
                                                    console.log(event.error.message);
                                                }
                                                else{
                                                    clearErrors("cvv");
                                                    console.log("CVV is valid");
                                                }
                                            }}
                                        />
                                    </div>
                                )}/>
                            </div>  
                             {errors.cvv && <p className="payment-error">{errors.cvv.message}</p>}
                        </div>

                    </div>
                    
                    <div className='payment-input-box'>
                        <label>Cardholder Name</label>
                        <div className='payment-input-wapper'>
                            <span className='payment-input-icon'><HiOutlineUser /></span>
                            <input type='text' placeholder='Enter cardholder name'{...register("cardHolderName", { required: "Cardholder name is required",
                                pattern:{value:/^[a-zA-Z\s.'-]{2,}$/i,message:"Name should only contain letters, spaces, and . ' -"} })} />
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

                    <div className='payment-message'>
                        <p>By clicking Pay,you agree to the Link Terms and Privacy</p>
                    </div>

                    <button type="submit" className='payment-button'>Pay Now</button>


                </form>
            </div>

        </div>

    );

};


export default Payment;
