import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { GlobalWorkerOptions } from 'pdfjs-dist';

const pdfjsVersion = '2.6.347'; // pdfjs-dist versiyonu

// PDF.js worker'ı belirleyin
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;

const FilePreview = ({ file }) => {
    const [isOpen, setIsOpen] = useState(false);

    const isImage = file.name.match(/\.(jpeg|jpg|gif|png)$/) != null;
    const isPDF = file.name.match(/\.(pdf)$/) != null;

    return (
        <div className="file-preview">
            <button onClick={() => setIsOpen(true)}>Preview</button>
            {isOpen && isImage && (
                <Lightbox
                    mainSrc={file.url}
                    onCloseRequest={() => setIsOpen(false)}
                />
            )}
            {isOpen && isPDF && (
                <div className="pdf-preview">
                    <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`}>
                        <Viewer fileUrl={file.url} plugins={[defaultLayoutPlugin()]} />
                    </Worker>
                    <button onClick={() => setIsOpen(false)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default FilePreview;
