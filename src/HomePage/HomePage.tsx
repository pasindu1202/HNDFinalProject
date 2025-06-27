import React, { useState, useRef, useEffect } from 'react';
import './HomePage.css';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";

type HomePageInputs = {}

const HomePage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<HomePageInputs>();
  const navigate = useNavigate();
  const location = useLocation();

  // CV Upload States
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // JD Upload States
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [jdUploadProgress, setJdUploadProgress] = useState<number>(0);
  const jdFileInputRef = useRef<HTMLInputElement | null>(null);

  // CV Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || file.name.endsWith('.docx'))) {
      setCvFile(file);
      setUploadProgress(0);
    } else {
      alert("Please upload a valid PDF or DOC file.");
    }
  };

  const simulateUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 100);
  };

  useEffect(() => {
    if (cvFile) {
      simulateUpload();
    }
  }, [cvFile]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || file.name.endsWith('.docx'))) {
      setCvFile(file);
      setUploadProgress(0);
    } else {
      alert("Please upload a valid PDF or DOC file.");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setCvFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // JD Handlers
  const handleJDFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || file.name.endsWith('.docx') || file.name.endsWith('.txt'))) {
      setJdFile(file);
      setJdUploadProgress(0);
    } else {
      alert("Please upload a valid PDF, DOC, or TXT file.");
    }
  };

  const simulateJDUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setJdUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 100);
  };

  useEffect(() => {
    if (jdFile) {
      simulateJDUpload();
    }
  }, [jdFile]);

  const handleJDRemove = () => {
    setJdFile(null);
    setJdUploadProgress(0);
    if (jdFileInputRef.current) jdFileInputRef.current.value = "";
  };

  const handleJDClick = () => {
    jdFileInputRef.current?.click();
  };

  const handleJDDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || file.name.endsWith('.docx') || file.name.endsWith('.txt'))) {
      setJdFile(file);
      setJdUploadProgress(0);
    } else {
      alert("Please upload a valid PDF, DOC, or TXT file.");
    }
  };

  const handleJDDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const formatSize = (size: number) => {
    return (size / (1024 * 1024)).toFixed(1) + "MB";
  };

  return (
    <div className="homepage">
      <div className="navigation">
        <p>CVScreen</p>
        <div className="nav-buttons">
          <Link to="/hpage" className={`nav-btn-home ${location.pathname === "/hpage" ? "active" : ""}`}>Home</Link>
          <Link to="/" className={`nav-btn-signin ${location.pathname === "/" ? "active" : ""}`}>Sign In</Link>
        </div>
      </div>

      <div className="container">
        {/* CV Upload */}
        <div className="card">
          <h3>Upload CV</h3>
          <div
            className={`drop-area ${cvFile ? 'uploaded' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleClick}
          >
            {cvFile ? (
              <div className="upload-card uploaded-cv-container">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                  alt="pdf"
                  className="pdf-icon"
                />
                <div className="file-info">
                  <p className="file-name">{cvFile.name}</p>
                  <p className="file-meta">{formatSize(cvFile.size)} - {uploadProgress}% uploaded</p>
                  {uploadProgress < 100 && (
                    <div className="progress-bar-container">
                      <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                  )}
                </div>
                <div className="upload-actions">
                  {uploadProgress === 100 && <FaCheckCircle className="check-icon" />}
                  <RiDeleteBinLine className="trash-icon" onClick={handleRemove} />
                </div>
              </div>
            ) : (
              <>
                Drag & drop your CV here or click to browse<br />
                <p>Supports PDF and DOC files</p>
              </>
            )}
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Job Description: Textarea + Upload */}
        <div className="card">
          <h3>Job Description</h3>

          <div className="text-area">
            <textarea placeholder="Paste the job description here..."></textarea>
          </div>

          <div
            className={`drop-area ${jdFile ? 'uploaded' : ''}`}
            onDrop={handleJDDrop}
            onDragOver={handleJDDragOver}
            onClick={handleJDClick}
          >
            {jdFile ? (
              <div className="upload-card uploaded-cv-container">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                  alt="file"
                  className="pdf-icon"
                />
                <div className="file-info">
                  <p className="file-name">{jdFile.name}</p>
                  <p className="file-meta">{formatSize(jdFile.size)} - {jdUploadProgress}% uploaded</p>
                  {jdUploadProgress < 100 && (
                    <div className="progress-bar-container">
                      <div className="progress-bar" style={{ width: `${jdUploadProgress}%` }}></div>
                    </div>
                  )}
                </div>
                <div className="upload-actions">
                  {jdUploadProgress === 100 && <FaCheckCircle className="check-icon" />}
                  <RiDeleteBinLine className="trash-icon" onClick={handleJDRemove} />
                </div>
              </div>
            ) : (
              <>
                Drag & drop a Job Description file here or click to browse<br />
                <p>Supports PDF, DOC, and TXT files</p>
              </>
            )}
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              style={{ display: 'none' }}
              ref={jdFileInputRef}
              onChange={handleJDFileChange}
            />
          </div>
        </div>

        <button className="analyze-button">Analyze</button>
      </div>
    </div>
  );
};

export default HomePage;
