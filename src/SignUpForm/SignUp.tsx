import React, { useState } from 'react';
import './SignUp.css'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { TbEyeClosed } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";
import { useForm } from 'react-hook-form';
import { HiOutlineUser } from "react-icons/hi2";
import { CiMobile1 } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { TfiLock } from "react-icons/tfi";
import { useNavigate } from 'react-router-dom';


type SignInFormInputs = {
  email: string;
  password: string;
  con_password: string;
  designation: string;
  mobile: number;
  location: string;
};

const SignUp = () => {
    const location = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormInputs>();
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const navigate = useNavigate();

    
const onSubmit = (data: SignInFormInputs) => {
        
        console.log(data);
        
        navigate("/payment");
    };




  return (
    <div className='signup-wapper-body'>
        <div className='signup-navigation'>
            <p>CVScreen</p>
            <div className='signup-nav-buttons'>
                <Link to="/homepage" className={`signup-nav-btn-home ${location.pathname === "/homepage" ? "active" : ""}`}>Home</Link>
                <Link to="/" className={`signup-nav-btn-signin ${location.pathname === "/" ? "active" : ""}`}>Sign In</Link>

            </div>
        </div>

        <div className='signup-wapper'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>
                    Sign Up
                </h1>    

                 <div className='signup-subtitle'>
                    <p>Sign up for a CVScreen Pro Account</p>
                 </div>
                 <div className='signup-input-box'>
                    <label>Email</label>
                    <div className='signup-input-wapper'>
                        <span className='signup-input-icon'><CiMail /></span>
                        <input type='email' placeholder='Enter your email'{...register("email", { required: "Email is required" })}/>
                    </div>
                    {errors.email && <p className="signup-error">{errors.email.message || '\u00A0'}</p>}  
                 </div>

                 <div className='signup-input-box'>
                    <label>Password</label>
                    <div className='signup-input-wapper'>
                        <span className='signup-input-icon'><TfiLock /></span>
                        <input type={showPassword1 ? 'text': 'password'} placeholder='Enter your password'{...register("password",{required:"Password is required"})}></input>
                        <button type='button' className='signup-password-btn' onClick={()=>setShowPassword1(!showPassword1)}>
                            {showPassword1 ?  <IoEyeOutline className='signup-eye'/>: <TbEyeClosed className='signup-eye'/>}
                        </button>
                    </div>
                     {errors.password && <p className="signup-error">{errors.password.message|| '\u00A0'}</p>}
                 </div>

                 <div className='signup-input-box'>
                    <label>Confirm Password</label>
                    <div className='signup-input-wapper'>
                       <span className='signup-input-icon'><TfiLock /></span>
                        <input type={showPassword2 ? 'text': 'password'} placeholder='Re enter your password'{...register("con_password",{required:"Re enter your password"})}></input>
                        <button type='button' className='signup-password-btn' onClick={()=>setShowPassword2(!showPassword2)}>
                            {showPassword2 ?  <IoEyeOutline className='signup-eye'/>: <TbEyeClosed className='signup-eye'/>}
                        </button>
                    </div>
                     {errors.con_password && <p className="signup-error">{errors.con_password.message|| '\u00A0'}</p>}
                 </div>

                 <div className='signup-input-box'>
                    <label>Designation</label>
                    <div className='signup-input-wapper'>
                        <span className='signup-input-icon'><HiOutlineUser /></span>
                        <input type='text' placeholder='Enter your designation'{...register("designation",{required:"Designation is required"})}/>
                    </div>
                    {errors.designation && <p className="signup-error">{errors.designation.message || '\u00A0'}</p>}  
                 </div>

                 <div className='signup-input-box'>
                    <label>Mobile</label>
                    <div className='signup-input-wapper'>
                        <span className='signup-input-icon'><CiMobile1 /></span>
                        <input type='tel' placeholder='Enter your mobile'{...register("mobile",{required:"Mobile is required"})}/>
                    </div>
                    {errors.mobile && <p className="signup-error">{errors.mobile.message || '\u00A0'}</p>}  
                 </div>

                 <div className='signup-input-box'>
                    <label>Location</label>
                    <div className='signup-input-wapper'>
                        <span className='signup-input-icon'><CiLocationOn /></span>
                        <input type='text' placeholder='Enter your location'{...register("location",{required:"Enter your Location"})}/>
                    </div>
                    {errors.location && <p className="signup-error">{errors.location.message || '\u00A0'}</p>}  
                 </div>

                 <button type="submit" className='signup-button'>Sign up</button>

                 <hr style={{ margin: '20px 0' }} />

                 <div className='signin-link'>
                    <p>Already have an account? <Link to='/' className='signin-link-text'>Sign In</Link></p>

                 </div>


            </form>

        </div>

            


        
      
    </div>
  );
};

export default SignUp;
