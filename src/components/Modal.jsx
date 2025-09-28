import React from "react";

const Modal = ({ onAllow, onDeny }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-black text-white p-6 rounded shadow-lg w-[300px] text-center">
        <p className="mb-6 text-lg font-medium">
          ALLOW A.I. TO ACCES YOUR CAMERA
        </p>
        <div className="flex justify-between">
          <button
            onClick={onDeny}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            DENY
          </button>
          <button
            onClick={onAllow}
            className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
          >
            ALLOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
