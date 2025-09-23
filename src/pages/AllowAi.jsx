import React from "react";
import { Link } from "react-router-dom";

import btnBck from "../assets/button-back.png";
import RotatingStack from "../components/RotatingStack";
import CameraScan from "../components/CameraScan";
import GalleryAccess from "../components/GalleryAccess";

const AllowAi = () => {
  return (
    <>
      <div className=" relative flex justify-between h-full w-full">
        {/* camera - left side */}
        <CameraScan />

        {/* gallery - right side */}

        <GalleryAccess />

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
