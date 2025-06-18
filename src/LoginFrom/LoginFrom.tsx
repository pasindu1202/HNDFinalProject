import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './LoginFrom.style.css';
import { useNavigate,useLocation, Link} from 'react-router-dom';
import { HiOutlineMail  } from "react-icons/hi";
import { MdOutlineLock } from "react-icons/md";
import { TbEyeClosed } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";




type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      if (data.email === 'admin@gmail.com' && data.password === '1234') {
       
        navigate("./dashboard")
        
      }
      
      else{
        alert("Invalid Credentials")
      }
      
    } catch (error: any) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className='wrapper-body'>
      {/* <div className='navigation'>
        <p>CVScreen</p>
        <div className="nav-buttons">
        <Link to="/home">
          <button className={location.pathname === "/home" ? "nav-btn active" : "nav-btn"}>Home</button>
        </Link>

        <Link to="/signin">
          <button className={location.pathname === "/signin" ? "nav-btn active" : "nav-btn"}>Sign In </button>
        </Link>
         
        </div>
      </div> */}

      <div className="navigation">
      <p>CVScreen</p>

      <div className="nav-buttons">
        <Link to="/home" className={`nav-btn-home ${location.pathname === "/home" ? "active" : ""}`}>Home</Link>
        <Link to="/" className={`nav-btn-signin ${location.pathname === "/" ? "active" : ""}`}>Sign In</Link>
        {/* <Link to="/">
          <button
            className={`nav-btn-signin ${
              location.pathname === "/" ? "active" : ""
            }`}
          >
            Sign In
          </button>
        </Link> */}
      </div>
    </div>



      <div className='wrapper'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Welcome Back</h1>

          <div className='subtitle'>
            <p>Sign in your CVScreen Pro Account</p>
          </div>
          <div className='input-box'>
            <label> Email </label>
            <div className="input-wrapper">
              <span className="input-icon"><HiOutlineMail /></span>
              <input type="email" placeholder='Enter your email'{...register("email", { required: "Email is required" })}/>
            </div>
            {errors.email && <p className="error">{errors.email.message || '\u00A0'}</p>}  
          </div>

          <div className='input-box'>
            <label> Password </label>
            <div className="input-wrapper">
              <span className="input-icon"><MdOutlineLock /></span>
              <input type={showPassword ? "text" : "password"} placeholder='Enter your password'{...register("password", { required: "Password is required" })}/>
              <button type="button" className="show-password-btn" onClick={() => setShowPassword(!showPassword)}>
                {/* {showPassword ? "🙈" : "👁️"} */}
                {showPassword ? <IoEyeOutline className='eye'/>: <TbEyeClosed className='eye'/>}
              </button>
            </div>
              {errors.password && <p className="error">{errors.password.message|| '\u00A0'}</p>}
          </div>
          <button type="submit" className='login-button'>Sign in</button>

          <hr style={{ margin: '20px 0' }} />


          <div className="register-link">
            <p>Don't have an account? <Link to="/signup" className='register-link-text'>Sign Up</Link></p>
            <Link to="/forgot-password" className='register-link-text'>Forgot your password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
