import React, { useState } from 'react';
import './FileComparison.css';

const FileComparison = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleCompare = () => {
    // Compare logic
    console.log('Comparing files:', file1, file2);
  };

  return (
    <div className="file-comparison">
      <h2>File Comparison</h2>
      <div className="file-inputs">
        <div>
          <label>File 1:</label>
          <input type="file" onChange={(e) => handleFileChange(e, setFile1)} />
        </div>
        <div>
          <label>File 2:</label>
          <input type="file" onChange={(e) => handleFileChange(e, setFile2)} />
        </div>
      </div>
      <button onClick={handleCompare}>Compare</button>
    </div>
  );
}

export default FileComparison;
