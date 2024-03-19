import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from '@mui/material';
import Webcam from 'react-webcam';

import Axios from 'axios';



function CameraComponent() {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    let blobFile = base64toImage(imageSrc);
    //webcamRef
    //let blobFileName = ;
    let file = new File([blobFile], 'screenCapture.jpeg');
    setImageFile(file);
    setFileName('screenCapture.jpeg')
  }, [webcamRef]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    
    setImageFile(file);
    setFileName(file.name);
    console.log(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setCapturedImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };


  const base64toImage = function (image){
    const byteString = atob(image.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }
    const newBlob = new Blob([ab], {
      type: 'image/jpeg',
    });
    return newBlob;
  };


  const submitImage = () =>{

    const formData = new FormData();
    var im = imageFile;
    formData.append('file', im, fileName);
    console.log(fileName);
    
    const url = "http://localhost:5000/segment";

    Axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  };


  useEffect(() => {
    // Scroll to the photo when captured or uploaded
    const photoSection = document.getElementById('photo-section');
    if (photoSection) {
      photoSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, [capturedImage]);

  return (
    <div style={{ textAlign: 'center', backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', height: '200vh', overflow: 'auto' }}>
      <h1 style={{ color: '#fff', marginBottom: '20px', fontFamily: 'Arial, sans-serif', fontSize: '2rem', display: 'block', margin: '0 auto', zIndex: '2', marginTop: '10px' }}>Clotoure Demo</h1>
      <div style={{ margin: '0 auto', position: 'relative', width: '400px', height: '300px', zIndex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="webcam"
          mirrored={true}
          style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
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
  <div id="photo-section" style={{ marginTop: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: '1' }}>
    <h2 style={{ color: '#fff', marginBottom: '10px' }}>YOUR PHOTO!</h2>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img
        src={capturedImage}
        alt="Captured"
        style={{
          width: '300px',
          height: 'auto',
          border: '2px solid #ccc',
          borderRadius: '10px',
          margin: '0 auto',
        }}
      />
      <button
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          fontSize: '1rem',
          backgroundColor: '#000',
          color: '#fff',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
          zIndex: '1',
        }}
        onClick={submitImage}
      >
        Segment
      </button>
    </div>
  </div>
)}

 </div>
  );
}


export default CameraComponent;
