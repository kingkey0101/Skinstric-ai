import React from "react";
import Rect2779 from "../assets/Rectangle 2779.svg";
import Rect2778 from '../assets/Rectangle 2778.png';
import btnT from '../assets/button-take-test.png'
import btnD from "../assets/button-discover-ai.png";

const Home = () => {
  return (
    <>
      <div className="relative flex h-screen w-full flex items-center gap-16">
        <div>
          {/* discover ai */}
          <div className="flex mt-10">
            <div className="relative w-[602px] h-[602px]">
              <img src={Rect2779} alt="Rectangle-2779" />
              {/*makes cursor pointer only over img */}
              <button className="absolute inset-0 flex items-center pointer-events-none">
                <img
                  src={btnD}
                  alt="Discover AI"
                  className="pointer-events-auto cursor-pointer"
                />
              </button>
            </div>
          </div>

          {/* take test */}
           <div className="flex w-full justify-end mt-10">
            <div className="relative w-[602px] h-[602px]">
              <img src={Rect2778} alt="Rectangle-2779" />
            
              <button className="absolute inset-0 flex items-center pointer-events-none">
                <img
                  src={btnT}
                  alt="Take Test"
                  className="pointer-events-auto cursor-pointer"
                />
              </button>
            </div>
          </div>


          {/* para */}

          <div className="mt-40 ml-10">
            <p className="text-sm font-semibold uppercase w-[316px] h-[72px]">
              Skinstric developed an A.I. that creates a highly-personalised
              routine tailored to what your skin needs.
            </p>
          </div>
        </div>
        {/* sophisticated skincare */}
        <div className="relative w-[602px] h-[602px] mb-60">
          <h1 className="absolute inset-0 flex items-center justify-center text-center font-roobert text-[120px] leading-[120px] text-[#1A1B1C] tracking-tight ">
            Sophisticated skincare
          </h1>
        </div>
      </div>
    </>
  );
};

export default Home;
