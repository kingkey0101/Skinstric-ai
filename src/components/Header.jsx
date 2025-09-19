import React from "react";
import halfRect from "../assets/half-rect.png";
import btn from "../assets/button-simple.png";

const Header = () => {
  return (
    <div className="w-1920px h-64px flex items-center m-5">
      <button className="font-roboto font-semibold inline-flex items-center justify-center gap-2 h-9 px-4 py-2 mr-2 text-sm text-[#1A1B1C] z-1000 ">
        SKINSTRIC
      </button>
      <div className="flex items-center ml-4">
        <img src={halfRect} className="h-4" />
        <p className="m-1.5 text-[#1A1B1C] text-semibold flex items-center justify-center font-roboto opacity-70 text-xs">
          INTRO
        </p>
        <img src={halfRect} className="h-4 transform scale-x-[-1]" />
      </div>
      <div className="ml-auto flex">
        <button>
          <img src={btn} alt="ENTER CODE" />
        </button>
      </div>
    </div>
  );
};

export default Header;
