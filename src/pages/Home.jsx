import React from "react";
import Rect2779 from "../assets/Rectangle 2779.svg";
import Rect2778 from "../assets/Rectangle 2778.png";
import btnT from "../assets/button-take-test.png";
import btnD from "../assets/button-discover-ai.png";
import { Link } from "react-router-dom";
import btnIcon from "../assets/buttin-icon.png";
// after adding all logic for take test

//

const Home = () => {
  return (
    <>
      {/* mobile only view */}

      <div className="relative sm:hidden w-full h-screen flex items-center justify-center overflow-visible">
        <div className="relative w-[350px] h-[350px] overflow-visible grid place-items-center">
          {/* diamonds */}
          <div
            className="
        absolute inset-0
        border-2 border-[#a0a4ab]
        transform rotate-45"
          />
          <div
            className="
        absolute inset-0
        border-2 border-[#a0a4ab]
        transform rotate-45 scale-110"
          />

          {/* center */}

          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center h-full space-y-2 px-4">
            <h1 className="font-roobert text-5xl text-[#1a1b1c] font-normal tracking-tighter leading-none ">
              Sophisticated
              <br />
              Skincare
            </h1>
            <p className="text-[16px] font-semibold text-center text-[#1a1b1c83] tracking-tighter leading-snug">
              <span className="block">
                Skinstric developed an A.I. that creates a
              </span>
              <span className="block">
                highly-personalized routine tailored to
              </span>
              <span className="block">what your skin needs.</span>
            </p>
            <Link to={"/test"}>
              <div className="inline-flex items-center text-black uppercase py-2 px-4">
                <h1 className="text-xs font-semibold">ENTER EXPERIENCE</h1>
                <img src={btnIcon} alt="button" className="ml-2 scale-75" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* reg view */}

      <div
        className="hidden sm:flex relative
     items-center justify-between
    w-full min-h-screen 
    px-4 sm:px-6 md:px-12 lg:px-16"
      >
        {/* left column */}
        <div className="flex-shrink-0">
          {/* discover ai */}
          <div
            className="relative
        w-20 sm:w-24 md:w-32
        lg:absolute lg:top-[179px] lg:left-[-100px] lg:w-[275px]"
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
                className="w-2/3 min-w-[140px] 
             lg:w-auto
              h-auto
              pointer-events-auto cursor-pointer"
              />
            </Link>
          </div>
        </div>

        {/* sophisticated skincare - center*/}
        <div className="flex-1 min-h-0 flex items-center justify-center px-2">
          <h1
            className="text-center font-roobert text-[clamp(2rem,8vw,120px)] leading-tight
         text-[#1a1b1c] tracking-tighter
         transform -translate-y-4"
          >
            <span className="block">Sophisticated</span>
            <span className="block">skincare</span>
          </h1>
        </div>

        {/* right column */}

        <div className="flex-shrink-0">
          {/* take test */}
          <div
            className="relative
        w-20 sm:w-24 md:w-32
        lg:absolute lg:top-[179px] lg:right-[-100px] lg:w-[275px]"
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
        {/* para */}

        <p
          className="absolute top-24 sm:top-28 md:top-32
        left-4 sm:left-6 md:left-8
        text-sm md:text-base lg:text-lg
        uppercase font-semibold leading-snug text-[#1a1b1c]
        lg:absolute lg:bottom-28 lg:left-8 lg:top-auto"
        >
          <span className="block">
            Skinstric developed an A.I. that creates
          </span>
          <span className="block">
            a highly-personalized routine tailored to
          </span>
          <span className="block">what your skin needs.</span>
        </p>
      </div>
    </>
  );
};

export default Home;
