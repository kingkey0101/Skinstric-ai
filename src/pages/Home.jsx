import React from "react";
import Rect2779 from "../assets/Rectangle 2779.svg";
import btnD from "../assets/button-discover-ai.png";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <div className="flex">
        <div className="relative w-[602px] h-[602px] mt-10">
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

      <div className="mt-40 ml-10">
        <p className="text-sm font-semibold uppercase w-[316px] h-[72px] top-[862px] left-[32px]">
          Skinstric developed an A.I. that creates a highly-personalised routine
          tailored to what your skin needs.
        </p>
      </div>
    </>
  );
};

export default Home;
