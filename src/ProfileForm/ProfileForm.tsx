import React from "react";
import { useForm } from 'react-hook-form';
import './ProfileForm.css';
import { useNavigate,useLocation, Link} from 'react-router-dom';

const ProfileForm: React.FC = () => {
    const navigate = useNavigate();
      const location = useLocation();
  return (
    <div className="profile-wapper">
      <div className="profile-navigation">
      <p>CVScreen</p>
     <div className="profile-nav-buttons">
        <Link to="/hpage" className={`nav-btn-home ${location.pathname === "/hpage" ? "active" : ""}`}>Home</Link>
        <Link to="/" className={`nav-btn-signin ${location.pathname === "/" ? "active" : ""}`}>Sign In</Link>
      </div>
    </div>
    </div>
  );
}
export default ProfileForm;