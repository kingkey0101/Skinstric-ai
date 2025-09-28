import React from "react";
import RotatingStack from "./RotatingStack";
import camera from "../assets/camera.png";

const CameraLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="relative">
        <RotatingStack className="mb-6" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <img src={camera} alt="camera" className="w-24 h-24 mb-4" />
          <p className="font-semibold text-xl text-center text-gray-800">SETTING UP CAMERA...</p>
          <p className="text-sm text-gray-600 text-center">TO GET BETTER RESULTS PLEASE BE SURE TO HAVE:</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center space-x-2">
                <span className="inline-block w-2 h-2 bg-gray-600"></span>
                <span>NUETRAL EXPRESSION</span>
                <span className="inline-block w-2 h-2 bg-gray-600"></span>
                <span>FRONTAL POSE</span>
                <span className="inline-block w-2 h-2 bg-gray-600"></span>
                <span>ADEQUATE LIGHTING</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CameraLoading;
