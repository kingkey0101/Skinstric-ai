import React from "react";
import halfRect from "../assets/half-rect.png";
import btn from "../assets/button-simple.png";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  return (
    <header className="w-full flex items-center justify-between py-3 px-4 sm:px-6 sm:py-4 lg:px-8 z-20">

    
      <div className="flex items-center space-x-2">
        <Link
          to={"/home"}
          className="font-roboto font-semibold text-sm text-[#1A1B1C]"
        >
          SKINSTRIC
        </Link>
        <div className="flex items-center space-x-1">
          <img src={halfRect} className="h-3 sm:h-4" />
          <p className="text-xs font-medium text-[#1a1b1c] opacity-70">
            INTRO
          </p>
          <img src={halfRect} className="h-3 sm:h-4 transform scale-x-[-1]" />
        </div>
      </div>

      
        {(pathname === '/' || pathname === "/home") && (
          <Link to={"/enter-code"} className="flex-shrink-0">
            <img src={btn} alt="ENTER CODE" className="h-8 sm:h-10 object-contain" />
          </Link>
        )}
     
    
    </header>

  );
};

export default Header;
