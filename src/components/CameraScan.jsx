import React, { useRef, useState } from "react";
import vec1 from "../assets/Vector 1.png";
import scan from "../assets/AIscan.png";
import camera from "../assets/camera.png";
import RotatingStack from "./RotatingStack";
import { Link } from "react-router-dom";
import Webcam from "react-webcam";

const CameraScan = () => {
  const [showCam, setShowCam] = useState(false);
  const webcamRef = useRef(null);
  const constraints = {
    width: 640,
    height: 400,
    facingMode: "user",
  };

  return (
    <>
      {/* <button
    onClick={()=> setShowCam(v=>!v) }
    >Toggle cam for test

    </button>
    {showCam && (
      <div>
        <Webcam 
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={constraints}

        />
      </div>
    )} */}

      {/* camera - left side */}

      <div className="flex items-center justify-center h-screen w-1/2">
        <div className="relative ">
          <div className="transform scale-50 origin-center">
            <RotatingStack />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative inline-block mb-32">
              <div className="relative w-[200px] h-[200px]">
                {!showCam && (
                  <button onClick={() => setShowCam((v) => !v)}>
                    <img src={camera} alt="camera" />
                    <img
                      src={scan}
                      alt="scan"
                      className="absolute left-full ml-4 top-0 -translate-y-1/3 w-[200px] h-auto pointer-events-none scale-150"
                    />
                  </button>
                )}
                {showCam && (
                  <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={constraints}
                    className="absolute inset-0 w-full h-full object-cover rounded-full"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CameraScan;
