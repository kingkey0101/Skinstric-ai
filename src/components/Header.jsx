import React from "react";
import halfRect from "../assets/half-rect.png";
import btn from "../assets/button-simple.png";

const Header = () => {
  return (
    <div className="w-full h-[64px] flex items-center px-4">
      <div className="flex items-center space-x-4">
        <button className="font-roboto font-semibold text-sm text-[#1A1B1C]">
          SKINSTRIC
        </button>
        <div className="flex items-center">
          <img src={halfRect} className="h-4" />
          <p className="m-1.5 text-[#1A1B1C] text-semibold flex items-center justify-center font-roboto opacity-70 text-xs">
            INTRO
          </p>
          <img src={halfRect} className="h-4 transform scale-x-[-1]" />
        </div>
      </div>
      <div className="ml-auto ">
        <button>
          <img src={btn} alt="ENTER CODE" />
        </button>
      </div>
    </div>
  );
};

export default Header;
