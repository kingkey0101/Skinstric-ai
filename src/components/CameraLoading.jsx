import React from "react";
import RotatingStack from "./RotatingStack";
import camera from "../assets/camera.png";

const CameraLoading = () => {
  const tips = ["NEUTRAL EXPRESSION", "FRONTAL POSE", "ADEQUATE LIGHTING"];
  return (
    <div className="fixed z-50 inset-0 bg-white flex flex-col items-center justify-center px-4">
      <div className="relative w-full h-full mb-8">
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <RotatingStack />
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <img src={camera} alt="camera" className="w-32 h-32" />
        </div>
      </div>
      <p className="text-xl font-semibold text-gray-800 text-center mb-4">
        SETTING UP CAMERA...
      </p>
      <p className="text-sm text-gray-600 text-center mb-6">
        TO GET BETTER RESULTS, MAKE SURE TO HAVE
      </p>
      <ul className="flex scroll-p-6">
        {tips.map((tip) => (
          <li
            key={tip}
            className="flex items-center space-x-2 text-sm text-gray-600"
          >
            <span className="inline-block w-2 h-2 bg-white border border-black transform rotate-45 origin-center"></span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CameraLoading;
