import React from "react";
import { Link } from "react-router-dom";
import camera from "../assets/camera.png";
import gallery from "../assets/gallery.png";
import btnBck from "../assets/button-back.png";

const AllowAi = () => {
  return (
    <div className=" relative flex justify-between h-full w-full">
      {/* camera */}
      <div className="flex items-center justify-center h-screen w-1/2">
        <Link className="">
          <img src={camera} alt="camera" />
        </Link>
      </div>
      {/* gallery */}
      <div className="flex items-center justify-center h-screen w-1/2">
        <Link className="content-center">
          <img src={gallery} alt="" />
        </Link>
      </div>
      {/* back button */}

      <Link
        to={"/home"}
        className="fixed bottom-4 left-4 flex items-center justify-center "
      >
        <img src={btnBck} alt="Back button" />
      </Link>
    </div>
  );
};

export default AllowAi;
