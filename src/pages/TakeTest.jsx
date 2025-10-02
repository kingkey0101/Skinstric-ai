import React from "react";
import { Link } from "react-router-dom";
import btnBck from "../assets/button-back.png";

import RotatingStack from "../components/RotatingStack";
import FormLogic from "../components/FormLogic";

const TakeTest = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <h1 className="absolute top-4 left-4 uppercase font-roobert font-semibold text-sm tracking-[-2%] leading-[24px] text-[#1A1B1C] ">
        to start analysis
      </h1>
      {/* nested rects */}
      <div className="fixed inset-0 flex items-center justify-center">
        <RotatingStack>
          <FormLogic />
        </RotatingStack>
      </div>

      <Link
        to={"/home"}
        className="fixed bottom-4 left-4 flex items-center justify-center "
      >
        <img src={btnBck} alt="Back button" />
      </Link>
    </div>
  );
};

export default TakeTest;
