import React from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './ResultPage.css';
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { PieChart, Pie, Cell } from "recharts";

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const percentage = 50;

  const data = [
  { name: "Completed", value:percentage},
  { name: "Remaining", value: 100-percentage }
];

const colors = ['#08A171', '#C4C4C4'];

let statusButton;
if (data[0].value >= 75) {
    statusButton = <button className="hire">Recommended for hire</button>;
  } else if (data[0].value >= 60) {
    statusButton = <button className="success">Strong technical skills alignment</button>;
  } else if (data[0].value >= 45) {
    statusButton = <button className="pass">Relevant experience level</button>;
  } else {
    statusButton = <button className="warning">Low experience level</button>;
  }

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
          <div className="profileimg-bio">
            <div className="profile-img">
              <img src="/Icons/Profileimage.jpg" alt="Profile" />
            </div>
            <div className="profile-info">
              <h3>John Doe</h3>
              <p className="designation">Senior Software Engineer</p>
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

          </div>
          <div className="profile-card">
            <h4>Skills</h4>
            <div className="tags">
                <span>Node JS</span><span>MongoDB</span><span>Angular</span><span>React</span><span>UI / UX</span>
            </div>
            <h4>Education</h4>
            <div className="education">
              <li>Bsc. in Software Engineering<br />Harvard University, USA</li>
              <li>Msc. in Information Security<br />Harvard University, USA</li>
            </div>
            <h4>Work Experience</h4>
            <div className="experience">
              <li>Team Lead (2020 - Present)<br />
              ACME Industries, USA</li>
              <li>Senior Engineer (2018 - 2020)<br />
              ACME Industries, USA</li>
            </div>
            <div className="profile-links">
              <a href="#" className="github"> <SiGithub className="social-link"/>Github Profile</a>
              <a href="#" className="linkedin"> <FaLinkedin className="social-link" />LinkedIn Profile</a>

            </div>
          </div>
        </div>

        <div className="resultscore">
          <div className="score-card">
            {/* <div className="circle">85%</div> */}
            <div style={{ textAlign: "center", background: "#23243C", padding: "0px", borderRadius: "10px", width: "350px" ,height:"350px",color:"" }}>
              <PieChart width={350} height={350}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  cornerRadius={8}
                  paddingAngle={8}
                  outerRadius={130}
                  startAngle={90} 
                  endAngle={-270}
                  dataKey="value">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#ffffff"
                  fontSize="30px"
                >
                  {data[0].value}%
                </text>
              </PieChart>
              <p style={{ color: "#ccc",display:"flex",justifyContent:"center",justifyItems:"center", fontSize:"20px"}}>Overall Match</p>
            </div>
            <div className="match-status">
              {statusButton}
            </div>
            <div className="status-tags">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
