import React from "react";
import Rect2779 from "../assets/Rectangle 2779.svg";
import Rect2778 from "../assets/Rectangle 2778.png";
import btnT from "../assets/button-take-test.png";
import btnD from "../assets/button-discover-ai.png";
import { Link } from "react-router-dom";

// after adding all logic for take test

const Home = () => {
  return (
    <div
      className="relative w-full h-screen
      mt-10 pt-6
      flex flex-col lg:flex-row
      items-start
      justify-start lg:justify-between gap-6
      px-8
      max-lg:px-4
      max-md:px-2
"
    >
      {/* left column */}
      <div
        className="w-full
      lg:w-1/4
      flex flex-col
      items-center lg:items-start   
      gap-8"
      >
        {/* discover ai */}
        <div className="relative w-full">
          <img
            src={Rect2779}
            alt="Rectangle-2779"
            className="h-auto w-full max-w-full object-contain"
          />
          <Link className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/*makes cursor pointer only over img */}
            <img
              src={btnD}
              alt="Discover AI"
              className="w-auto
              md:w-2/3
              lg:w-auto
              h-auto
              pointer-events-auto cursor-pointer"
            />
          </Link>
        </div>

      </div>

      {/* sophisticated skincare */}
      <div
        className="w-full lg:w-1/3
        relative aspect-square
        flex items-center justify-center
        max-md:my-8"
      >
        <h1 className="absolute inset-0 flex items-center justify-center text-center font-roobert text-2xl sm:text-5xl lg:text-[120px] leading-tight text-[#1A1B1C] tracking-tighter px-2">
          Sophisticated skincare
        </h1>
      </div>

      {/* right column */}

      <div
        className="w-full lg:w-1/4
        flex flex-col
        items-center lg:items-end
        gap-8"
      >
        {/* take test */}
        <div className="relative w-full">
          <img
            src={Rect2778}
            alt="Rectangle-2779"
            className="h-auto w-full max-w-full object-contain"
          />
          <Link
            to="/test"
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <img
              src={btnT}
              alt="Take Test"
              className="w-auto
              md:w-2/3
              lg:w-auto
              h-auto
              pointer-events-auto cursor-pointer"
            />
          </Link>
        </div>
        
        {/* para */}

        <p
          className="absolute
          bottom-24
          left-8
          max-w-[316px]
          text-sm
          sm:text-base
          md:text-lg
          lg:text-xl
          text-[#1a1b1c]
          uppercase
          font-semibold
          leading-snug"
        >
          Skinstric developed an A.I. that creates a highly-personalized routine
          tailored to what your skin needs.
        </p>
      </div>
    </div>
  );
};

export default Home;
