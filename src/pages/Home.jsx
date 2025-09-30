import React from "react";
import Rect2779 from "../assets/Rectangle 2779.svg";
import Rect2778 from "../assets/Rectangle 2778.png";
import btnT from "../assets/button-take-test.png";
import btnD from "../assets/button-discover-ai.png";
import { Link } from "react-router-dom";

// after adding all logic for take test

const Home = () => {

  return (
    <div className="mt-10 pt-6 flex flex-col lg:flex-row h-full w-full items-center lg:items-start justify-between gap-6 px-4">
      {/* left column */}
      <div className="flex flex-col gap-8 flex-shrink max-w-[320px] w-full ">
        {/* discover ai */}
        <div className="relative w-full">
          <img
            src={Rect2779}
            alt="Rectangle-2779"
            className="h-auto w-full object-contain"
          />
          <Link className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/*makes cursor pointer only over img */}
            <img
              src={btnD}
              alt="Discover AI"
              className="pointer-events-auto cursor-pointer w-2/3 sm:w-auto"
            />
          </Link>
        </div>

        {/* para */}

        <p className="text-sm sm:text-base md:text-base text-center lg:text-left font-semibold uppercase max-w-[316px] w-full">
          Skinstric developed an A.I. that creates a highly-personalised routine
          tailored to what your skin needs.
        </p>
      </div>

      {/* sophisticated skincare */}
      <div className="relative w-full max-w-[602px] aspect-square flex-shrink">
        <h1 className="absolute inset-0 flex items-center justify-center text-center font-roobert text-2xl sm:text-5xl lg:text-[120px] leading-tight text-[#1A1B1C] tracking-tighter px-2">
          Sophisticated skincare
        </h1>
      </div>

      {/* right column */}

      <div className="flex flex-col items-center lg:items-end flex-shrink max-w-[320px] w-full">
        {/* take test */}
        <div className="relative w-full">
          <img
            src={Rect2778}
            alt="Rectangle-2779"
            className="h-auto w-full object-contain"
          />
          <Link to='/test' className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img
              src={btnT}
              alt="Take Test"
              className="pointer-events-auto cursor-pointer w-2/3 sm:w-auto"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
