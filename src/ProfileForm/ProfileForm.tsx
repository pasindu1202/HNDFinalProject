import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./ProfileForm.css";
import { TbEyeClosed } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineLock, MdEditSquare } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlinePhoneAndroid } from "react-icons/md";
// import { GrMapLocation } from "react-icons/gr";
import { FaMapLocationDot } from "react-icons/fa6";

const ProfileForm: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="profile-wrapper">
      {/* Navigation */}
      <div className="profile-navigation">
        <p>CVScreen</p>
        <div className="profile-nav-buttons">
          <Link to="/hpage" className={`nav-btn ${location.pathname === "/hpage" ? "active" : ""}`}>Dashboard</Link>
          <Link to="/profile" className={`nav-btn ${location.pathname === "/profile" ? "active" : ""}`}>Account</Link>
          <Link to="/" className="nav-btn">Log out</Link>
        </div>
      </div>

      {/* Profile Container */}
      <div className="profile-card">
        <div className="profile-header">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="Profile"
            className="profile-image"
          />
          <div className="profile-info">
          <h2>John Doe</h2>
          <p className="job-title">HR Assistant</p>
          <p className="email"><MdOutlineMailOutline /> johnwick@gmail.com</p>
          <p className="phone"><MdOutlinePhoneAndroid /> 0777678912</p>
          <p className="location"><FaMapLocationDot /> Hackclock, Colombo</p>
          </div>

          <button className="edit-btn" aria-label="Edit Profile">
            <MdEditSquare size={24} />
          </button>
        </div>

        {/* Change Password Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="change-password-form">
          <h3>Change Password</h3>

          <div className='input-box'>
            <label>Current Password</label>
            <div className="input-wrapper">
              <span className="input-icon"><MdOutlineLock /></span>
              <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder='Enter your current password'
                {...register("currentPassword", { required: "Current password is required" })}
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <IoEyeOutline className='eye' /> : <TbEyeClosed className='eye' />}
              </button>
            </div>
          </div>

          <div className='input-box'>
            <label>New Password</label>
            <div className="input-wrapper">
              <span className="input-icon"><MdOutlineLock /></span>
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder='Enter your new password'
                {...register("newPassword", { required: "New password is required" })}
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <IoEyeOutline className='eye' /> : <TbEyeClosed className='eye' />}
              </button>
            </div>
          </div>

          <div className='input-box'>
            <label>Confirm Password</label>
            <div className="input-wrapper">
              <span className="input-icon"><MdOutlineLock /></span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder='Confirm your new password'
                {...register("confirmPassword", { required: "Please confirm your new password" })}
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <IoEyeOutline className='eye' /> : <TbEyeClosed className='eye' />}
              </button>
            </div>
          </div>

          <button type="submit" className="update-btn">Update</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
