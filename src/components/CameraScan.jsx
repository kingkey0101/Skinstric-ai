import React, { useRef, useState } from "react";
import vec1 from "../assets/Vector 1.png";
import scan from "../assets/AIscan.png";
import camera from "../assets/camera.png";
import RotatingStack from "./RotatingStack";
import { Link } from "react-router-dom";
import Webcam from "react-webcam";
import Modal from "./Modal";

const CameraScan = () => {
  const webcamRef = useRef(null);
  const [step, setStep] = useState("idle");
  const constraints = {
    width: 640,
    height: 400,
    facingMode: "user",
  };

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
              <div className="relative w-[200px] h-[200px]">
                {step === "askPermission" && (
                  <Modal
                    onAllow={() => setStep("loading")}
                    onDeny={() => setStep("idle")}
                  />
                )}
                {step === "ShowCam" && (
                  <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={constraints}
                    className="absolute inset-0 w-full h-full object-cover rounded-full"
                  />
                )}

                {step === "idle" && (
                  <button onClick={() => setStep("askPermission")}>
                    <img src={camera} alt="camera" />
                    <img
                      src={scan}
                      alt="scan"
                      className="absolute left-full ml-4 top-0 -translate-y-1/3 w-[200px] h-auto pointer-events-none scale-150"
                    />
                  </button>
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
