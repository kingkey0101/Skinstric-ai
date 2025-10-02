import React, { useState } from "react";
import rect1 from "../assets/Rect-full-1.png";
import rect2 from "../assets/Rect-full-2.png";
import rect3 from "../assets/Rect-full-3.png";

const RotatingStack = ({ children, className = '' }) => {
  return (
    <div className={`relative w-[800px] h-[800px] mx-auto mb-32 ${className}`}>
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
    </div>
  );
};

export default RotatingStack;
