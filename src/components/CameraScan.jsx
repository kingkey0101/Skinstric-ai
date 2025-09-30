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
    setStep("uploading");

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

      navigate("select-attributes", {
        state: { demographics: json.data },
      });
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed:" + error.message);
      setStep("captured");
    }
  }, [capturedSrc, navigate]);

  if (step === "loadingCam") {
    return <CameraLoading message="Starting camera..." />;
  }
  if (step === "uploading") {
    return <CameraLoading message="Uploading photo..." />;
  }

  if (step === "showCam") {
    const tips = ["NEUTRAL EXPRESSION", "FRONTAL POSE", "ADEQUATE LIGHTING"];
    return (
      <div className="fixed inset-0 overflow-hidden z-10">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={constraints}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <button
          onClick={takePicture}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 px-4 py-2 shadow-lg"
        >
          <img src={takePic} alt="take pic" />
        </button>

        <div className="absolute bottom-16 inset-x-0 text-center px-4">
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
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center overflow-hidden z-20 p-4">
        {/* show picture */}
        <img
          src={capturedSrc}
          alt="captured"
          className="absolute inset-0 w-full h-full object-cover mb-4"
        />
        <p className="absolute top-10 inset-x-0 text-center text-white text-xl font-semibold">
          GREAT SHOT!
        </p>
        <Link
          to={"/select-attributes"}
          className="px-4 py-2"
          onClick={() => setStep("idle")}
        >
          <img
            src={proceed}
            alt="proceed"
            className="absolute bottom-4 right-4"
          />
        </Link>
      </div>
    );
  }

  if (step === "idle" || step === "askPermission") {
    return (
      <div className="relative flex items-center justify-center h-screen w-full">
        <div className="transform scale-50 origin-center">
          <RotatingStack />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative inline-block w-[200px] h-[200px]">
            {/*  Permission Modal*/}
            {step === "askPermission" && (
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 z-50">
                <Modal onAllow={startCamera} onDeny={() => setStep("idle")} />
              </div>
            )}

            {/*  camera + scan overlay */}
            <button
              disabled={step !== "idle"}
              onClick={() => setStep("askPermission")}
              className="w-full h-full flex items-center justify-center"
            >
              <img src={camera} alt="camera icon" className="mb-16" />
              <img
                src={scan}
                alt="scan overlay"
                className="
               absolute left-full top-0.5 -translate-y-1/3 w-[200px] h-auto pointer-events-none scale-150
              "
              />
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default CameraScan;
