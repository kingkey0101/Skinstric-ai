import React, { useState } from "react";
import { Link } from "react-router-dom";
import btnBck from "../assets/button-back.png";
import CameraScan from "../components/CameraScan";
import GalleryAccess from "../components/GalleryAccess";

const AllowAi = () => {
  const [cameraStep, setCameraStep] = useState("idle");
  return (
    <>
      <div className="relative flex flex-col md:flex-row w-full h-screen overflow-hidden">
        {/* camera - left side */}
        <div className="flex-1 w-full md:w-1/2 flex items-center justify-center md:justify-start p-4 h-1/2 md:h-screen">
          <div className="w-full h-full flex items-center justify-center">
            <CameraScan onStepChange={setCameraStep} />
          </div>
        </div>

        {/* gallery - right side */}
        <div
          className={`flex-1 w-full md:w-1/2
            flex items-center justify-center md:justify-end p-4
            h-1/2 md:h-screen
            transition-all ${
              cameraStep === "askPermission"
                ? "opacity-50 pointer-events-none"
                : ""
            }`}
        >
          <div className="w-full h-full flex items-center justify-center">
            {cameraStep === "idle" || cameraStep === "askPermission" ? (
              <GalleryAccess />
            ) : null}
          </div>
        </div>

        {/* back button */}

        <Link
          to={"/home"}
          className="fixed bottom-4 left-4 flex items-center justify-center "
        >
          <img src={btnBck} alt="Back button" />
        </Link>
      </div>
    </>
  );
};

export default AllowAi;
