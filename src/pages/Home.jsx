import React from "react";
import Rect2779 from "../assets/Rectangle 2779.svg";
import Rect2778 from "../assets/Rectangle 2778.png";
import btnT from "../assets/button-take-test.png";
import btnD from "../assets/button-discover-ai.png";

const Home = () => {
  return (
    <div className="mt-20 pt-10 flex h-full w-full items-start justify-between">
      {/* left column */}
      <div className="flex flex-col gap-16 ">
        {/* discover ai */}
        <div className="relative">
          <img
            src={Rect2779}
            alt="Rectangle-2779"
            className="h-full object-cover"
          />
          <button className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/*makes cursor pointer only over img */}
            <img
              src={btnD}
              alt="Discover AI"
              className="pointer-events-auto cursor-pointer"
            />
          </button>
        </div>

        {/* para */}

        <p className="text-sm font-semibold uppercase w-[316px] pl-4">
          Skinstric developed an A.I. that creates a highly-personalised routine
          tailored to what your skin needs.
        </p>
      </div>

      {/* sophisticated skincare */}
      <div className="relative w-[602px] h-[602px] ">
        <h1 className="absolute inset-0 flex items-center justify-center text-center font-roobert text-[120px] leading-[120px] text-[#1A1B1C] tracking-tighter ">
          Sophisticated skincare
        </h1>
      </div>

      {/* right column */}

      <div className="flex flex-col items-end">
        {/* take test */}
        <div className="relative ">
          <img
            src={Rect2778}
            alt="Rectangle-2779"
            className="h-full object-cover"
          />
          <button className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img
              src={btnT}
              alt="Take Test"
              className="pointer-events-auto cursor-pointer"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
