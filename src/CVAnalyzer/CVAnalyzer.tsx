import React, { useState, useRef, useEffect } from 'react';
import './CVAnalyzer.modele.css'; 
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { useForm } from 'react-hook-form';

type CVAnalyzerInputs = {}

type FileWithProgress = {
  file: File;
  progress: number;
};

const CVAnalyzer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const goToAnalytics = () => {
    navigate('/dashboard');
  }

  const goToCVAnalyzer = () => {
    navigate('/cv-analyzer');
  }

  const { register, handleSubmit, formState: { errors } } = useForm<CVAnalyzerInputs>();

  // CV Upload States
  const [cvFiles, setCvFiles] = useState<FileWithProgress[]>([]);
  const [cvUploadingIndex, setCvUploadingIndex] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // JD Upload States
  const [jdFiles, setJdFiles] = useState<FileWithProgress[]>([]);
  const [jdUploadingIndex, setJdUploadingIndex] = useState<number>(0);
  const jdFileInputRef = useRef<HTMLInputElement | null>(null);

  // Validation helpers
  const isValidCVFile = (file: File) => {
    return file.type === 'application/pdf' || file.type === 'application/msword' || file.name.endsWith('.docx');
  };

  const isValidJDFile = (file: File) => {
    return file.type === 'application/pdf' || file.type === 'application/msword' || file.name.endsWith('.docx') || file.name.endsWith('.txt');
  };

  // CV: Sequential Upload simulation
  useEffect(() => {
    if (cvFiles.length === 0) return;
    if (cvUploadingIndex >= cvFiles.length) return;

    let progress = cvFiles[cvUploadingIndex].progress || 0;
    const interval = setInterval(() => {
      progress += 10;
      setCvFiles(prev => {
        const newFiles = [...prev];
        newFiles[cvUploadingIndex] = { file: newFiles[cvUploadingIndex].file, progress: Math.min(progress, 100) };
        return newFiles;
      });
      if (progress >= 100) {
        clearInterval(interval);
        setCvUploadingIndex(i => i + 1);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [cvFiles, cvUploadingIndex]);

  // JD: Sequential Upload simulation
  useEffect(() => {
    if (jdFiles.length === 0) return;
    if (jdUploadingIndex >= jdFiles.length) return;

    let progress = jdFiles[jdUploadingIndex].progress || 0;
    const interval = setInterval(() => {
      progress += 10;
      setJdFiles(prev => {
        const newFiles = [...prev];
        newFiles[jdUploadingIndex] = { file: newFiles[jdUploadingIndex].file, progress: Math.min(progress, 100) };
        return newFiles;
      });
      if (progress >= 100) {
        clearInterval(interval);
        setJdUploadingIndex(i => i + 1);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [jdFiles, jdUploadingIndex]);

  // Handle CV files input change
  const handleCvFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const validFiles: FileWithProgress[] = [];
    for (let i = 0; i < files.length; i++) {
      if (isValidCVFile(files[i])) {
        validFiles.push({ file: files[i], progress: 0 });
      } else {
        alert(`Invalid CV file: ${files[i].name}. Please upload PDF or DOC files.`);
      }
    }
    if (validFiles.length) {
      setCvFiles(validFiles);
      setCvUploadingIndex(0);
    }
  };

  // Handle CV drag & drop
  const handleCvDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (!files) return;

    const validFiles: FileWithProgress[] = [];
    for (let i = 0; i < files.length; i++) {
      if (isValidCVFile(files[i])) {
        validFiles.push({ file: files[i], progress: 0 });
      } else {
        alert(`Invalid CV file: ${files[i].name}. Please upload PDF or DOC files.`);
      }
    }
    if (validFiles.length) {
      setCvFiles(validFiles);
      setCvUploadingIndex(0);
    }
  };

  // Remove one CV file
  const handleCvRemove = (index: number) => {
    setCvFiles(prev => prev.filter((_, i) => i !== index));
    // If removing a file before the current uploadingIndex, adjust uploadingIndex accordingly
    if (index < cvUploadingIndex) {
      setCvUploadingIndex(prev => Math.max(prev - 1, 0));
    } else if (index === cvUploadingIndex) {
      // Restart uploading at current index (or next available)
      setCvUploadingIndex(prev => prev >= cvFiles.length - 1 ? 0 : prev);
    }
  };

  const handleCvClick = () => {
    fileInputRef.current?.click();
  };

  // Handle JD files input change
  const handleJdFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const validFiles: FileWithProgress[] = [];
    for (let i = 0; i < files.length; i++) {
      if (isValidJDFile(files[i])) {
        validFiles.push({ file: files[i], progress: 0 });
      } else {
        alert(`Invalid JD file: ${files[i].name}. Please upload PDF, DOC, or TXT files.`);
      }
    }
    if (validFiles.length) {
      setJdFiles(validFiles);
      setJdUploadingIndex(0);
    }
  };

  // Handle JD drag & drop
  const handleJdDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (!files) return;

    const validFiles: FileWithProgress[] = [];
    for (let i = 0; i < files.length; i++) {
      if (isValidJDFile(files[i])) {
        validFiles.push({ file: files[i], progress: 0 });
      } else {
        alert(`Invalid JD file: ${files[i].name}. Please upload PDF, DOC, or TXT files.`);
      }
    }
    if (validFiles.length) {
      setJdFiles(validFiles);
      setJdUploadingIndex(0);
    }
  };

  // Remove one JD file
  const handleJdRemove = (index: number) => {
    setJdFiles(prev => prev.filter((_, i) => i !== index));
    if (index < jdUploadingIndex) {
      setJdUploadingIndex(prev => Math.max(prev - 1, 0));
    } else if (index === jdUploadingIndex) {
      setJdUploadingIndex(prev => prev >= jdFiles.length - 1 ? 0 : prev);
    }
  };

  const handleJdClick = () => {
    jdFileInputRef.current?.click();
  };

  const formatSize = (size: number) => {
    return (size / (1024 * 1024)).toFixed(1) + "MB";
  };

  return (
    <div className="cv-analyzer-body">
      <div className="cv-analyzer-navigation">
        <p>CVScreen</p>
        <div className="cv-analyzer-nav-buttons">
          <Link to="/cv-analyzer" className={`cv-nav-buttons-text ${location.pathname === "/cv-analyzer" ? "active" : ""}`}>Dashboard</Link>
          <Link to="/account" className={`cv-nav-buttons-text ${location.pathname === "/account" ? "active" : ""}`}>Account</Link>
          <Link to="/" className={`cv-nav-buttons-text ${location.pathname === "/" ? "active" : ""}`}>Log out</Link>
        </div>
      </div>
      <div className='cv-analyzer-main-mover'>
        <button className={`cv-analytics-button ${location.pathname === "" ? "active" : ""}`} onClick={goToAnalytics}>Analytics</button>
        <button className={`cv-analyzer-button ${location.pathname === "/cv-analyzer" ? "active" : ""}`} onClick={goToCVAnalyzer}>CV Analyzer</button>
      </div>

      <div className="container">
        {/* CV Upload */}
        <div className="card">
          <h3>Upload CV</h3>
          <div
            className={`drop-area ${cvFiles.length > 0 ? 'uploaded' : ''}`}
            onDrop={handleCvDrop}
            onDragOver={e => e.preventDefault()}
            onClick={handleCvClick}
          >
            {cvFiles.length > 0 ? (
              cvFiles.map((cvFileWithProgress, idx) => (
                <div key={idx} className="upload-card uploaded-cv-container">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                    alt="pdf"
                    className="pdf-icon"
                  />
                  <div className="file-info">
                    <p className="file-name">{cvFileWithProgress.file.name}</p>
                    <p className="file-meta">{formatSize(cvFileWithProgress.file.size)} - {cvFileWithProgress.progress}% uploaded</p>
                    {cvFileWithProgress.progress < 100 && (
                      <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${cvFileWithProgress.progress}%` }}></div>
                      </div>
                    )}
                  </div>
                  <div className="upload-actions">
                    {cvFileWithProgress.progress === 100 && <FaCheckCircle className="check-icon" />}
                    <RiDeleteBinLine className="trash-icon" onClick={(e) => {
                      e.stopPropagation();
                      handleCvRemove(idx);
                    }} />
                  </div>
                </div>
              ))
            ) : (
              <>
                Drag & drop your CV files here or click to browse<br />
                <p>Supports PDF and DOC files</p>
              </>
            )}
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
              ref={fileInputRef}
              multiple
              onChange={handleCvFilesChange}
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
            className={`drop-area ${jdFiles.length > 0 ? 'uploaded' : ''}`}
            onDrop={handleJdDrop}
            onDragOver={e => e.preventDefault()}
            onClick={handleJdClick}
          >
            {jdFiles.length > 0 ? (
              jdFiles.map((jdFileWithProgress, idx) => (
                <div key={idx} className="upload-card uploaded-cv-container">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                    alt="file"
                    className="pdf-icon"
                  />
                  <div className="file-info">
                    <p className="file-name">{jdFileWithProgress.file.name}</p>
                    <p className="file-meta">{formatSize(jdFileWithProgress.file.size)} - {jdFileWithProgress.progress}% uploaded</p>
                    {jdFileWithProgress.progress < 100 && (
                      <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${jdFileWithProgress.progress}%` }}></div>
                      </div>
                    )}
                  </div>
                  <div className="upload-actions">
                    {jdFileWithProgress.progress === 100 && <FaCheckCircle className="check-icon" />}
                    <RiDeleteBinLine className="trash-icon" onClick={(e) => {
                      e.stopPropagation();
                      handleJdRemove(idx);
                    }} />
                  </div>
                </div>
              ))
            ) : (
              <>
                Drag & drop Job Description files here or click to browse<br />
                <p>Supports PDF, DOC, and TXT files</p>
              </>
            )}
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              style={{ display: 'none' }}
              ref={jdFileInputRef}
              multiple
              onChange={handleJdFilesChange}
            />
          </div>
        </div>

        <button className="analyze-button">Analyze</button>
      </div>
    </div>
  );
}

export default CVAnalyzer;
