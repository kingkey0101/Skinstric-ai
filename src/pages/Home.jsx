import React from "react";
import Rect2779 from "../assets/Rectangle 2779.svg";
import Rect2778 from "../assets/Rectangle 2778.png";
import btnT from "../assets/button-take-test.png";
import btnD from "../assets/button-discover-ai.png";
import { Link } from "react-router-dom";

// after adding all logic for take test

//

const Home = () => {
  return (
    <div
      className="relative
    flex items-center justify-between
    min-h-screen
    px-4 sm:px-6 md:px-12"
    >
      <div className="flex items-center justify-center">
        {/* left column */}
        <div className="flex flex-col items-center lg:items-start">
          {/* discover ai */}
          <div
            className="relative
          w-20 sm:w-28 md:w-48 lg:w-64 lg:left-[-150px]"
          >
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
                className="w-2/3 min-w-[140px] md:w-1/2
             lg:w-auto
              h-auto
              pointer-events-auto cursor-pointer"
              />
            </Link>
          </div>
        </div>
        {/* para */}

        <p
          className="mt-4 max-w-[260px]
          text-center lg:text-left
          text-xs sm:text-sm md:text-base lg:text-lg
          uppercase font-semibold leading-snug text-[#1a1b1c]"
        >
          Skinstric developed an A.I. that creates a highly-personalized routine
          tailored to what your skin needs.
        </p>
      </div>

      {/* sophisticated skincare - center*/}
      <div className="flex flex-1 items-center justify-center px-2">
        <h1
          className="text-center font-roobert
         text-[clamp(2rem,8vw,120px)]
          leading-tight text-[#1a1b1c]
           tracking-tighter"
        >
          Sophisticated skincare
        </h1>
      </div>

      {/* right column */}

      <div className="flex flex-col items-center lg:items-end">
        {/* take test */}
        <div
          className="relative
          w-20 sm:w-28 md:w-48 lg:w-64 lg:right-[-150px]"
        >
          <img
            src={Rect2778}
            alt="Rectangle-2779"
            className="h-auto w-full object-contain"
          />
          <Link
            to="/test"
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <img
              src={btnT}
              alt="Take Test"
              className="w-2/3 min-w-[140px] 
             lg:w-auto
              h-auto
              pointer-events-auto cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
