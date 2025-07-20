import React from "react";
import { useLocation, Link } from "react-router-dom";
import './ProfileForm.css';

interface Candidate {
  id: number;
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  match: number;
  avatar: string;
  skills: string[];
}

const candidates: Candidate[] = [
  {
    id: 1,
    name: "John Doe",
    title: "Senior Software Engineer",
    email: "johndoe@gmail.com",
    phone: "0767464411",
    location: "Jaffna, Srilanka",
    match: 85,
    avatar: "/Icons/Profileimage.jpg",
    skills: ["Strong technical skills alignment", "Relevant experience level"],
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "Frontend Developer",
    email: "janesmith@example.com",
    phone: "0789123456",
    location: "Colombo, Sri Lanka",
    match: 90,
    avatar: "/Icons/Profile 4.jpg",
    skills: ["Great UI/UX knowledge", "Modern JS framework experience"],
  },
  {
    id: 3,
    name: "Michael Lee",
    title: "DevOps Engineer",
    email: "michael.lee@company.com",
    phone: "0771234567",
    location: "Kandy, Sri Lanka",
    match: 88,
    avatar: "/Icons/Profile 3.png",
    skills: ["Cloud infrastructure expertise", "CI/CD pipeline optimization"],
  },
  {
    id: 4,
    name: "Sara Thomas",
    title: "Data Scientist",
    email: "sara.thomas@data.ai",
    phone: "0708765432",
    location: "Galle, Sri Lanka",
    match: 92,
    avatar: "/Icons/Profile 2.jpeg",
    skills: ["ML model deployment", "Strong Python skills"],
  },
];

const ProfileForm: React.FC = () => {
  const location = useLocation();

  return (
    <div className="profile-wrapper">
      <div className="profile-navigation">
        <p>CVScreen</p>
        <div className="profile-nav-buttons">
          <Link to="/dashboard" className={`nav-btn ${location.pathname === "/dashboard" ? "active" : ""}`}>Dashboard</Link>
          <Link to="/account" className={`nav-btn ${location.pathname === "/account" ? "active" : ""}`}>Account</Link>
          <Link to="/logout" className={`nav-btn ${location.pathname === "/logout" ? "active" : ""}`}>Log out</Link>
        </div>
      </div>

      <div className="profile-tabs">
        <button className="tab-button">Analytics</button>
        <button className="tab-button active-tab">CV Analyzer</button>
      </div>

      <div className="card-container">
        {candidates.map((candidate) => (
          <div className="candidate-card" key={candidate.id}>
            <div className="left-section">
              <img src={candidate.avatar} alt="avatar" className="avatar" />
              <div className="candidate-info">
                <h3>{candidate.name}</h3>
                <p>{candidate.title}</p>
                <div className="contact-info">
  <p className="email">
    <img src="/Icons/Letter.png" alt="email" className="contact-icon" />
    {candidate.email}
  </p>
  <p className="phone">
    <img src="/Icons/Smartphone.png" alt="phone" className="contact-icon" />
    {candidate.phone}
  </p>
  <p className="location">
    <img src="/Icons/Point On Map.png" alt="location" className="contact-icon" />
    {candidate.location}
  </p>
</div>

              </div>
            </div>
            <div className="right-section">
              <div className="match-circle">
                <p>{candidate.match}%</p>
                <span>Overall Match</span>
              </div>
              <div className="recommendation">
                <button className="hire-button">✅ Recommend for Hire</button>
                {candidate.skills.map((skill, index) => (
                  <div className="tag" key={index}>{skill}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileForm;
