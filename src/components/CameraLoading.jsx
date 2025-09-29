import React from "react";
import RotatingStack from "./RotatingStack";
import camera from "../assets/camera.png";

const CameraLoading = () => {
  const tips = ["NEUTRAL EXPRESSION", "FRONTAL POSE", "ADEQUATE LIGHTING"];
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white px-4">
      <div className="relative mb-6">
        <RotatingStack className="scale-50" />

        <div className="absolute inset-0 flex items-center justify-center">
          <img src={camera} alt="camera" className="w-48 h-w-48" />
        </div>
      </div>
      <p className="font-semibold text-xl text-center text-gray-800">
        SETTING UP CAMERA...
      </p>

      <p className="text-sm text-gray-600 text-center mb-6">
        TO GET BETTER RESULTS PLEASE BE SURE TO HAVE
      </p>

      <ul className="flex items-center justify-center space-x-6">
        {tips.map((tip) => (
          <li
            key={tip}
            className="flex items-center space-x-2 text-sm text-gray-600"
          >
            <span className="inline-block w-2 h-2 bg-white border border-black transform -rotate-45 origin-center"></span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CameraLoading;
