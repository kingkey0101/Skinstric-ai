import React, { useCallback, useRef, useState } from "react";
import scan from "../assets/AIscan.png";
import camera from "../assets/camera.png";
import RotatingStack from "./RotatingStack";
import Webcam from "react-webcam";
import Modal from "./Modal";
import CameraLoading from "./CameraLoading";
import takePic from '../assets/take-pic.png'

const CameraScan = () => {
  const webcamRef = useRef(null);
  const [step, setStep] = useState("idle");
  const constraints = {
    width: 640,
    height: 400,
    facingMode: "user",
  };
  const startCamera = () => {
    setStep("loadingCam");
    setTimeout(() => {
      setStep("showCam");
    }, 800);
  };

  const takePicture = useCallback(()=>{
    if(webcamRef.current){
      const imageSrc = webcamRef.current.getScreenshot()
      console.log('Captured:', imageSrc)
    }
  }, [])

  if (step === "loadingCam") {
    return <CameraLoading />;
  }
  if (step == "showCam") {
    return (
      <div className="relative h-screen w-screen bg-black">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={constraints}
          className="absolute inset-0 w-screen h-screen object-cover filter blur-sm"
        />
        {/* unblur face */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-72 h-96 overflow-hidden rounded-lg">
            <Webcam 
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={constraints}
            className="w-screen h-screen object-cover"
            />
          </div>
        </div>
        <div className="absolute bottom-32 w-full text-center px-4">
          <p className="text-white text-lg mb-3">TO GET BETTER RESULTS BE SURE TO HAVE:</p>
          <ul className="inline-block text-left space-y-2">
            {['NUETRAL EXPRESSION', 'FRONTAL POSE', 'ADEQUATE LIGHTING'].map((tip)=>(
              <li key={tip} className="flex items-center space-x-2 text-white">
                <span className="inline-block w-2 h-2 bg-white"></span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
        <button onClick={takePicture} className="absolute bottom-8 right-8 px-6 py-3 shadow-lg">
          <img src={takePic} alt="take pic" />
        </button>
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
                      onAllow={startCamera}
                      onDeny={() => setStep("idle")}
                    />
                  </div>
                )}
                <button
                  disabled={step !== "idle"}
                  onClick={() => setStep("askPermission")}
                  className={
                    step !== "idle" ? "cursor-not-allowed opacity-50" : ""
                  }
                >
                  <img src={camera} alt="camera" />
                  <img
                    src={scan}
                    alt="scan"
                    className="absolute left-full top-0.5 -translate-y-1/3 w-[200px] h-auto pointer-events-none scale-150"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CameraScan;
