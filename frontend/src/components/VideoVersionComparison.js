import React, { useState } from 'react';

const VideoVersionComparison = ({ versions }) => {
  const [selectedVersion1, setSelectedVersion1] = useState(null);
  const [selectedVersion2, setSelectedVersion2] = useState(null);

  return (
    <div>
      <h2>Video Versiyonlarını Karşılaştır</h2>
      <div>
        <select onChange={(e) => setSelectedVersion1(e.target.value)}>
          <option value="">Versiyon Seç</option>
          {versions.map((version) => (
            <option key={version._id} value={version.url}>
              {version.name}
            </option>
          ))}
        </select>
        <select onChange={(e) => setSelectedVersion2(e.target.value)}>
          <option value="">Versiyon Seç</option>
          {versions.map((version) => (
            <option key={version._id} value={version.url}>
              {version.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        {selectedVersion1 && (
          <video src={selectedVersion1} controls width="300" />
        )}
        {selectedVersion2 && (
          <video src={selectedVersion2} controls width="300" />
        )}
      </div>
    </div>
  );
};

export default VideoVersionComparison;
