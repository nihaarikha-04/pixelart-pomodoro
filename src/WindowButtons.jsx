import React from 'react';
import minimizeImage from './minimize-image.png';
import closeImage from './close-image.png';

function WindowButtons({ onMinimize, onClose }) {
  const handleMinimize = () => {
    console.log('Minimize button clicked');
    if(window?.electronAPI?.minimize) { 
      window.electronAPI.minimize();
    } else {
      console.warn('Minimize function not available');
    }
  };

  const handleClose = () => {
    console.log('Close button clicked');
    if(window?.electronAPI?.close) { 
      window.electronAPI.close();
    } else {
      console.warn('Close function not available');
    }
  };

  return (
    <div className="window-buttons">
      <button className='minimize-button' onClick={handleMinimize}>
        <img src={minimizeImage} className="minimize-image" alt="Minimize" />
      </button>
      <button className='close-button' onClick={handleClose}>
        <img src={closeImage} className="close-image" alt="Close" />
      </button>
    </div>
  );
}

export default WindowButtons;