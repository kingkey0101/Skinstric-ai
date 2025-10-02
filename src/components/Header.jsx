import React from "react";
import halfRect from "../assets/half-rect.png";
import btn from "../assets/button-simple.png";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  return (
    <header
      className="w-full flex items-center justify-between bg-white
     py-3 sm:py-4 px-0 sm:px-2   
      z-[9999]"
    >
      <div className="flex items-center space-x-2">
        <Link
          to={"/home"}
          className="font-roboto font-semibold text-xs sm:text-xs text-[#1A1B1C] z-[9999]"
        >
          SKINSTRIC
        </Link>
        <div className="flex items-center space-x-1">
          <img src={halfRect} className="h-3 sm:h-4" />
          <span className="text-xs sm:text-sm font-medium text-[#1a1b1c] opacity-70">
            INTRO
          </span>
          <img src={halfRect} className="h-3 sm:h-4 transform scale-x-[-1]" />
        </div>
      </div>

      {(pathname === "/" || pathname === "/home") && (
        <Link to="/enter-code" className="flex-shrink-0">
          <img
            src={btn}
            alt="ENTER CODE"
            className="h-8 sm:h-10 object-contain"
          />
        </Link>
      )}
    </header>
  );
};

export default Header;
