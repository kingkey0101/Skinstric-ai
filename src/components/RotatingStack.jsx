import React, { useState } from "react";
import rect1 from "../assets/Rect-full-1.png";
import rect2 from "../assets/Rect-full-2.png";
import rect3 from "../assets/Rect-full-3.png";
import { useNavigate } from "react-router-dom";

const RotatingStack = ({children}) => {
  return (
    <div className="relative w-[800px] h-[800px] mx-auto mb-32">
      {/* largest */}
      <img
        src={rect1}
        className="absolute inset-0 m-auto w-full h-auto animate-slow-spin "
        alt="rect1"
      />
      {/* middle */}
      <img
        src={rect2}
        className="absolute inset-0 m-auto w-[600px] h-auto animate-slow-spin "
        style={{ animationDuration: "40s" }}
        alt="rect2"
      />
      {/* smallest */}
      <img
        src={rect3}
        className="absolute inset-0 m-auto w-[400px] h-auto animate-slow-spin "
        style={{ animationDuration: "60s" }}
        alt="rect3"
      />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {children}
      </div>
      {/* <div className="absolute inset-0 flex flex-col items-center justify-center ">
        <h1 className="  text-xl font-roobert font-extralight text-[#1A1B1C] z-20 tracking-tighter">
          Click To Type
        </h1>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onEnter={onEnter}
          className="w-[350px] h-[150px] p-4 resize-none border-none font-roobert font-normal text-4xl z-10 tracking-tighter whitespace-nowrap text-center placeholder:underline placeholder:text-black"
          placeholder="Introduce Yourself"
        ></input>
      </div> */}
    </div>
  );
};

export default RotatingStack;
