import React from "react";
import { Link } from "react-router-dom";
import btnBck from "../assets/button-back.png";
import rect1 from "../assets/Rect-full-1.png";
import rect2 from "../assets/Rect-full-2.png";
import rect3 from "../assets/Rect-full-3.png";

const TakeTest = () => {
  return (
    <div className="relative h-screen">
      <h1 className="ml-4 uppercase w-[227px] h-[24px] top-20 left-8 font-roobert font-semibold text-sm tracking-[-2%] leading-[24px] text-[#1A1B1C] ">
        to start analysis
      </h1>
      {/* nested rects */}
      <div className="h-screen w-screen flex items-center justify-center">
        <img src={rect1} className="w-[800px] h-auto" alt="" />
        <img src={rect2} className="absolute inset-0 m-auto w-[600px] h-auto" alt="" />
        <img src={rect3} className="absolute inset-0 m-auto h-auto w-[400px]" alt="" />
        <p className="absolute m-auto h-auto"> Introduce Yourself</p>
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
