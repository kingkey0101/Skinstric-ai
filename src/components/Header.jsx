import React from "react";
import halfRect from "../assets/half-rect.png";
import btn from "../assets/button-simple.png";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  return (
    <header className="w-full flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6 lg:px-8">

    <div className="w-full h-[64px] flex items-center px-4">
      <div className="flex items-center space-x-2 sm:space-x-4 ">
        <Link
          to={"/home"}
          className="font-roboto font-semibold text-sm text-[#1A1B1C]"
        >
          SKINSTRIC
        </Link>
        <div className="hidden sm:flex items-center space-x-1">
          <img src={halfRect} className="h-3 sm:h-4" />
          <p className="m-1.5 text-[#1A1B1C] text-semibold flex items-center justify-center font-roboto opacity-70 text-xs sm:text-sm">
            INTRO
          </p>
          <img src={halfRect} className="h-3 sm:h-4 transform scale-x-[-1]" />
        </div>
      </div>

      <div className="ml-auto ">
        {pathname === "/home" && (
          <Link to={"/enter-code"}>
            <img src={btn} alt="ENTER CODE" className="h-8 sm:h-10" />
          </Link>
        )}
      </div>
    </div>
    </header>

  );
};

export default Header;
