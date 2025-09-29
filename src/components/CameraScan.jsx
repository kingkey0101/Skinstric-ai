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

const CameraScan = ({ onStepChange }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  // const [bodyPixModel, setBodyPixModel] = useState(null);
  const [capturedSrc, setCapturedSrc] = useState(null);
  const [step, setStep] = useState("idle");
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
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setCapturedSrc(imageSrc);
      setStep("captured");
    }
  }, []);

  if (step === "loadingCam") {
    return <CameraLoading />;
  }

  // useEffect(() => {
  //   const setUpTf = async () => {
  //     await tf.setBackend("webgl");
  //     await tf.ready();
  //     const model = await bodyPix.load();
  //     setBodyPixModel(model);
  //   };
  //   setUpTf();
  // }, []);

  // useEffect(() => {
  //   if (!bodyPixModel || !webcamRef.current?.video) return;
  //   const video = webcamRef.current.video;
  //   const canvas = canvasRef.current;
  //   let animationFrameId;

  //   const draw = async () => {
  //     if (video.readyState === 4) {
  //       const segmentation = await bodyPixModel.segmentPerson(video, {
  //         internalResolution: "medium",
  //         segmentationThreshold: 0.7,
  //       });
  //       bodyPix.drawBokehEffect(canvas, video, segmentation, 15, 0, true);
  //     }
  //     animationFrameId = requestAnimationFrame(draw);
  //   };
  //   draw();

  //   return () => cancelAnimationFrame(animationFrameId);
  // }, [bodyPixModel]);

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
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
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

  if (step === "captured" && capturedSrc) {
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
        <button className="px-4 py-2" onClick={() => setStep("idle")}>
          <img src={proceed} alt="proceed" className="absolute bottom-4 right-4" />
        </button>
      </div>
    );
  }

  return (
    <>
      {/* camera - left side */}

      <div className="flex items-center justify-center h-screen w-full md:w-1/2 lg:w-1/4">
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
