import React, { useCallback, useEffect, useRef, useState } from "react";
import scan from "../assets/AIscan.png";
import camera from "../assets/camera.png";
import RotatingStack from "./RotatingStack";
import Webcam from "react-webcam";
import Modal from "./Modal";
import CameraLoading from "./CameraLoading";
import takePic from "../assets/take-pic.png";
import "@tensorflow/tfjs-backend-webgl";
import proceed from "../assets/button-pro-white.png";
import { Link, useNavigate } from "react-router-dom";

const CameraScan = ({ onStepChange }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedSrc, setCapturedSrc] = useState(null);
  const [step, setStep] = useState("idle");
  const navigate = useNavigate();
  useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

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

  const takePicture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedSrc(imageSrc);
      setStep("captured");
    }
  }, []);

  const handleProceed = useCallback(async () => {
    if (!capturedSrc) {
      alert("No photo to upload-please retake your shot.");
      return;
    }
    setStep("analyzing");

    const base64 = capturedSrc.split(",")[1].trim();
    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        }
      );
      const json = await response.json();
      if (!response.ok)
        throw new Error(json.message || `HTTP ${response.status}`);

      setStep("thankyou");
      setTimeout(() => {
        navigate("/select-attributes", {
          state: { demographics: json.data },
        });
      }, 2000);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed:" + error.message);
      setStep("captured");
    }
  }, [capturedSrc, navigate]);

  if (step === "loadingCam") {
    return <CameraLoading step={"loadingCam"} message="Setting up camera..." />;
  }
  if (step === "analyzing") {
    return <CameraLoading step={"analyzing"} message="Analyzing image..." />;
  }
  if (step === "uploading") {
    return <CameraLoading step={"uploading"} message="Uploading photo..." />;
  }
  if (step === "thankyou") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-40 text-center">
        <RotatingStack>
          <div className="px-4 text-center">
            <p className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
              <span className="block">Thank you!</span>
              <span className="block mt-8 font-light">
                Proceed to the next step.
              </span>
            </p>
          </div>
        </RotatingStack>
      </div>
    );
  }

  if (step === "showCam") {
    const tips = ["NEUTRAL EXPRESSION", "FRONTAL POSE", "ADEQUATE LIGHTING"];
    return (
      <div className="fixed inset-0 bg-black">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={constraints}
          className="w-full h-full object-cover"
        />
        <button
          onClick={takePicture}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 px-4 py-2 shadow-lg"
        >
          <img src={takePic} alt="take pic" />
        </button>

        <div className="absolute bottom-24 inset-x-0 text-center px-4">
          <p className="text-sm tracking-wide mb-8 text-[#FCFCFC]">
            TO GET BETTER RESULTS BE SURE TO HAVE
          </p>
          <div className="flex justify-center space-x-4">
            {tips.map((tip) => (
              <div
                key={tip}
                className="flex items-center tracking-wide text-[#FCFCFC] text-xs"
              >
                <span className="inline-block w-3 h-3 border border-white transform rotate-45 origin-center"></span>
                <span className="ml-2">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === "captured") {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden z-20">
        {/* show picture */}
        <img
          src={capturedSrc}
          alt="captured"
          className="w-full h-full object-cover mb-4"
        />
        <p className="absolute flex items-center justify-center mt-28 top-10 inset-x-0 text-center text-white text-xl font-semibold">
          GREAT SHOT!
        </p>

        {/* retake button */}
        <button className="absolute bottom-4 left-4 px-4 py-2 bg-white/20 text-white rounded">
          RETAKE
        </button>
        {/* proceed button */}
        <button className="px-4 py-2" onClick={handleProceed}>
          <img
            src={proceed}
            alt="proceed"
            className="absolute bottom-4 right-4"
          />
        </button>
      </div>
    );
  }

  if (step === "idle" || step === "askPermission") {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="transform scale-50 origin-center">
          <RotatingStack />
        </div>

        <div className="absolute inset-0 flex items-center justify-center w-full h-full">
          <div className="relative w-[200px] h-[200px] flex items-center justify-center">
            {/*  camera + scan overlay */}
            <button
              disabled={step !== "idle"}
              onClick={() => setStep("askPermission")}
              className="relative"
            >
              <img src={camera} alt="camera icon" className="mb-16" />
              <img
                src={scan}
                alt="scan overlay"
                className="
               absolute
               top-0.5 left-full -translate-y-1/2
               w-[120px] md:w-[200px] h-auto pointer-events-none
               scale-100 md:scale-150
              "
              />
            </button>
            {/*  Permission Modal*/}
            {step === "askPermission" && (
              <div className="fixed inset-0 flex items-center justify-center z-50  ml-8 md:transform-none">
                <Modal onAllow={startCamera} onDeny={() => setStep("idle")} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default CameraScan;
