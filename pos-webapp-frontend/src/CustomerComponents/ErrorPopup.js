import React from 'react';

const ErrorPopup = ({ isOpen, message, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="BLACKBG bg-white p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-2">Error</h2>
                <p className="mb-4">{message}</p>
                <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">
                    Close
                </button>
            </div>
        </div>
    );
};

export default ErrorPopup;
