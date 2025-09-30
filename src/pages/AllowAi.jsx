import React, { useState } from "react";
import { Link } from "react-router-dom";
import btnBck from "../assets/button-back.png";
import CameraScan from "../components/CameraScan";
import GalleryAccess from "../components/GalleryAccess";

const AllowAi = () => {
  const [cameraStep, setCameraStep] = useState("idle");
  return (
    <>
      <div className=" relative flex justify-between h-full w-full">
        {/* camera - left side */}
        <div className="flex flex-1 items-center justify-start">
          <CameraScan onStepChange={setCameraStep} />
        </div>

        {/* gallery - right side */}
        <div className=" relative flex justify-between h-full w-full">
          <div
            className={`flex flex-1 justify-end transition-all ${
              cameraStep === "askPermission"
                ? "opacity-50 pointer-events-none"
                : ""
            }
        `}
          >
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
