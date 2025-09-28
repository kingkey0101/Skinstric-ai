import React, { useRef, useState } from "react";
import vec1 from "../assets/Vector 1.png";
import scan from "../assets/AIscan.png";
import camera from "../assets/camera.png";
import RotatingStack from "./RotatingStack";
import { Link } from "react-router-dom";
import Webcam from "react-webcam";
import Modal from "./Modal";
import CameraLoading from "./CameraLoading";

const CameraScan = () => {
  const webcamRef = useRef(null);
  const [step, setStep] = useState("idle");
  const [camReady, setCamReady] = useState(false);
  const constraints = {
    width: 640,
    height: 400,
    facingMode: "user",
  };

  if (step === "loadingCam" && !camReady) {
    return <CameraLoading />;
  }
  if (step == "showCam" && camReady) {
    return (
      <div className="relative h-screen w-screen bg-black">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={constraints}
          onUserMedia={() => {}}
          className="w-full h-full object-cover filter blur-sm"
        />
        <div className="absolute bottom-8 w-full text-center">
          <p className="text-lg">TO GET BETTER RESULTS MAKE SURE TO HAVE</p>

          {/* diamond */}
          <span className="flex items-center gap-2">
            <span
              className='relative w-3 h-3 rotate-45 border 
           "border-white border-black '
            ></span>
          </span>
        </div>
      </div>
    );
  }

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
              <div className="relative w-[200px] h-[200px] flex items-center justify-center">
                {/* permissions modal */}
                {step === "askPermission" && (
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 z-20">
                    <Modal
                      onAllow={() => setStep("loadingCam")}
                      onDeny={() => setStep("idle")}
                    />
                  </div>
                )}
                <button
                  disabled={step !== "idle"}
                  onClick={() => setStep("askPermission")}
                  className={`${
                    step !== "idle" ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  <img src={camera} alt="camera" />
                  <img
                    src={scan}
                    alt="scan"
                    className="absolute left-full top-0.5 -translate-y-1/3 w-[200px] h-auto pointer-events-none scale-150"
                  />
                </button>
                {step === "loadingCam" && (
                  <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={constraints}
                    onUserMedia={() => {
                      setCamReady(true);
                      setStep("showCam");
                    }}
                    className="hidden"
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
