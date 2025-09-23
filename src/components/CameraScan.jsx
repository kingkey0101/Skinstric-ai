import React from "react";
import vec1 from "../assets/Vector 1.png";
import scan from '../assets/AIscan.png'
import camera from "../assets/camera.png";
import RotatingStack from "./RotatingStack";
import { Link } from "react-router-dom";

const CameraScan = () => {
  return (
    <>
      {/* camera - left side */}
      <div className="flex items-center justify-center h-screen w-1/2">
        <div className="relative ">
          <div className="transform scale-50 origin-center">
            <RotatingStack />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative inline-block mb-32">
              <Link>
                <img src={camera} alt="camera" />
                <img
                  src={scan}
                  alt="scan"
                  className="absolute left-full ml-4 top-0 -translate-y-1/3 w-[200px] h-auto pointer-events-none scale-150"
                  />
                  </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CameraScan;
