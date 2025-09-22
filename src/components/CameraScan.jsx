import React from "react";
import scan from "../assets/AIscan.png";
import camera from "../assets/camera.png";
import RotatingStack from "./RotatingStack";
import { Link } from "react-router-dom";

const CameraScan = () => {
  return (
    <>
      {/* camera - left side */}
      <div className="flex items-center justify-center h-screen w-1/2">
        <div className="relative ">
          <div className="relative transform scale-75 origin-center">
            <RotatingStack />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative inline-block mb-32">
              <Link>
                <img src={camera} alt="camera" />
              </Link>
                <img
                  src={scan}
                  alt="scan"
                  className="absolute -top-2 -right-2 w-10 h-10"
                />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CameraScan;
