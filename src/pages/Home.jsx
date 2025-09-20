import React from "react";
import Rect2779 from "../assets/Rectangle 2779.svg";
import btnD from "../assets/button-discover-ai.png";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex">
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

      
    </>
  );
};

export default Home;
