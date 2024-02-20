import React, { useState, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import './CameraComponent.css'; // Import CSS file for styling

function CameraComponent() {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  }, [webcamRef]);

  return (
    <div className="camera-container">
      <h1 className="title">CLOTOURE DEMO</h1>
      <div className="webcam-container">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="webcam"
        />
      </div>
      <button className="capture-button" onClick={capture}>Capture</button>
      {capturedImage && (
        <div className="captured-image-container">
          <h2 className="captured-image-title">YOUR PHOTO!</h2>
          <img src={capturedImage} alt="Captured" className="captured-image" />
        </div>
      )}
      {!capturedImage && (
        <div className="placeholder-div"></div>
      )}
    </div>
  );
}

export default CameraComponent;
