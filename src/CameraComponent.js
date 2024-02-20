import React, { useState, useCallback, useRef } from 'react';
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

  return (
    <div style={{ textAlign: 'center', backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1 style={{ color: '#fff', marginBottom: '20px', fontFamily: 'Arial, sans-serif' }}>Clotoure Demo</h1>
      <div style={{ margin: '0 auto', position: 'relative', width: '400px', height: '300px' }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="webcam"
          mirrored={true}
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
        <div style={{ marginTop: 'calc(300px + 1in)', position: 'relative' }}>
          <button style={{ padding: '10px 20px', fontSize: '1rem', backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} onClick={capture}>Capture</button>
          <input type="file" accept="image/*" onChange={handleFileUpload} style={{ marginLeft: '10px', padding: '10px 20px', fontSize: '1rem', backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} />
        </div>
      </div>
      {capturedImage && (
        <div style={{ marginTop: '20px' }}>
          <h2 style={{ color: '#fff', marginBottom: '10px' }}>YOUR PHOTO!</h2>
          <img src={capturedImage} alt="Captured" style={{ width: '300px', height: 'auto', border: '2px solid #ccc', borderRadius: '10px', margin: '0 auto' }} />
        </div>
      )}
    </div>
  );
}

export default CameraComponent;
