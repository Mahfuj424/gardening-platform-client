/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const PremiumModal = ({ onClose, onYes }:any) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>This content is premium!</h3>
        <p>You need to verify your account to access this content.</p>
        <div className="modal-buttons">
          <button onClick={onYes} className="bg-custom-gradient text-white">Yes</button>
          <button onClick={onClose} className="bg-gray-300">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;
