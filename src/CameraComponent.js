import React, { useState, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import './CameraComponent.css'; // Import CSS file for styling
import axios from 'axios'; // Import Axios

function CameraComponent() {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  }, [webcamRef]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append('image', uploadedImage);

      const response = await axios.post('YOUR_UPLOAD_URL', formData);

      console.log('Image uploaded successfully!', response.data);
      // Reset uploadedImage state
      setUploadedImage(null);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

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
      <input type="file" accept="image/*" onChange={handleFileUpload} />
      {capturedImage && !uploadedImage && (
        <div className="captured-image-container">
          <h2 className="captured-image-title">YOUR PHOTO!</h2>
          <img src={capturedImage} alt="Captured" className="captured-image" />
        </div>
      )}
      {uploadedImage && (
        <div className="captured-image-container">
          <h2 className="captured-image-title">YOUR UPLOADED PHOTO!</h2>
          <img src={uploadedImage} alt="Uploaded" className="captured-image" />
          <button className="upload-button" onClick={uploadImage}>Upload Image</button>
        </div>
      )}
      {!capturedImage && !uploadedImage && (
        <div className="placeholder-div"></div>
      )}
    </div>
  );
}

export default CameraComponent;
