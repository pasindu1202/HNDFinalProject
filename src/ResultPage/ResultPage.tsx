import React from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './ResultPage.css';

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="result-wapper">
      <div className="result-navigation">
        <p>CVScreen</p>
        <div className="result-nav-buttons">
          <Link to="/hpage" className={`nav-btn-home ${location.pathname === "/hpage" ? "active" : ""}`}>Home</Link>
          <Link to="/" className={`nav-btn-signin ${location.pathname === "/" ? "active" : ""}`}>Sign In</Link>
        </div>
      </div>

      <div className="resultbody">
        <div className="resultdetails">
          <div className="profile-card">
            <img src="/Icons/Profileimage.jpg" alt="Profile" className="profile-image" />
            <div className="profile-info">
              <h3>John Doe</h3>
              <p>Senior Software Engineer</p>
              <p className="contact-item">
              <img src="/Icons/Letter.png" alt="email" className="contact-icon" />
                 johndoe@gmail.com
              </p>
              <p className="contact-item">
              <img src="/Icons/Smartphone.png" alt="phone" className="contact-icon" />
                0123456789
              </p>
              <p className="contact-item">
              <img src="/Icons/Point On Map.png" alt="location" className="contact-icon" />
              Somewhere, Nowhere
              </p>


            </div>
            <div className="tags">
              <span>Node JS</span><span>MongoDB</span><span>Angular</span><span>React</span><span>UI / UX</span>
            </div>
            <div className="education">
              <p>Bsc. in Software Engineering<br />Harvard University, USA</p>
              <p>Msc. in Information Security<br />Harvard University, USA</p>
            </div>
            <div className="experience">
              <p>Team Lead (2020 - Present)<br />ACME Industries, USA</p>
              <p>Senior Engineer (2018 - 2020)<br />ACME Industries, USA</p>
            </div>
            <div className="profile-links">
              <a href="#" className="github">Github Profile</a>
              <a href="#" className="linkedin">LinkedIn Profile</a>

            </div>
          </div>
        </div>

        <div className="resultscore">
          <div className="score-card">
            <div className="circle">85%</div>
            <p className="match">Overall Match</p>
            <button className="hire">✓ Recommended for Hire</button>
            <div className="status-tags">
              <div className="success">Strong technical skills alignment</div>
              <div className="success">Relevant experience level</div>
              <div className="warning">Relevant experience level</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
