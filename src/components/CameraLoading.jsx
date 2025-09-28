import React from "react";
import RotatingStack from "./RotatingStack";
import camera from "../assets/camera.png";

const CameraLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <RotatingStack className='mb-6' />
      <img src={camera} alt="camera" className="w-16 h-16 mb-4" />
      <p className="font-semibold text-lg">SETTING UP CAMERA...</p>
    </div>
  );
};

export default CameraLoading;
