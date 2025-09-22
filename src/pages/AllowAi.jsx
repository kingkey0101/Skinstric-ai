import React from "react";
import { Link } from "react-router-dom";
import gallery from "../assets/gallery.png";
import btnBck from "../assets/button-back.png";
import RotatingStack from "../components/RotatingStack";
import CameraScan from "../components/CameraScan";

const AllowAi = () => {
  return (
    <>
      <div className=" relative flex justify-between h-full w-full">
        <CameraScan />
     

        {/* gallery - right side */}

        <RotatingStack>
          <div className="flex items-center justify-center h-screen w-1/2">
            <Link className="content-center">
              <img src={gallery} alt="" />
            </Link>
          </div>
        </RotatingStack>

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
