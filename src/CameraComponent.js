import React, { useState, useCallback, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

function CameraComponent() {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  }, [webcamRef]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCapturedImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // Scroll to the photo when captured or uploaded
    const photoSection = document.getElementById('photo-section');
    if (photoSection) {
      photoSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, [capturedImage]);

  return (
    <div style={{ textAlign: 'center', backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1 style={{ color: '#000', marginBottom: '20px', fontFamily: 'Arial, sans-serif', fontSize: '2rem', position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: '2' }}>Clotoure Demo</h1>
      <div style={{ margin: '0 auto', position: 'relative', width: '400px', height: '300px', zIndex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="webcam"
          mirrored={true}
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '1' }}
        />
        <div style={{ marginTop: 'calc(300px + 1in)', position: 'relative', zIndex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button style={{ marginRight: '10px', padding: '10px 20px', fontSize: '1rem', backgroundColor: '#000', color: '#fff', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease', zIndex: '1' }} onClick={capture}>Capture</button>
          <label htmlFor="file-upload" className="custom-file-upload" style={{ padding: '10px 20px', fontSize: '1rem', color: '#fff', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease', zIndex: '1', border: 'none', backgroundColor: 'transparent', position: 'relative' }}>
            Choose file
            <input id="file-upload" type="file" accept="image/*" onChange={handleFileUpload} style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', opacity: '0', cursor: 'pointer' }} />
          </label>
        </div>
      </div>
      {capturedImage && (
        <div id="photo-section" style={{ marginTop: '200px', zIndex: '1' }}>
          <h2 style={{ color: '#000', marginBottom: '10px' }}>YOUR PHOTO!</h2>
          <img src={capturedImage} alt="Captured" style={{ width: '300px', height: 'auto', border: '2px solid #ccc', borderRadius: '10px', margin: '0 auto' }} />
        </div>
      )}
    </div>
  );
}

export default CameraComponent;
