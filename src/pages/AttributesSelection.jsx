import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import btnBck from "../assets/button-back.png";
import RotatingStack from "../components/RotatingStack";
import btnSum from "../assets/button-summary.png";

const AttributesSelection = () => {
  const { state } = useLocation();
  const demographics = state?.demographics;
  const navigate = useNavigate();

  if (!demographics) {
    return (
      <div className="p-6">
        <p className="text-gray-600">
          No analysis data-please upload an image first
        </p>
        <button onClick={() => navigate(-1)}>
          <img src={btnBck} alt="Back button" />
        </button>
      </div>
    );
  }
  const goBack = () => navigate(-1);
  const goToDemographics = () =>
    navigate("/demographics", { state: { demographics } });

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center p-6">
      <div className="absolute inset-0 z-0">
        <h1 className="ml-4 uppercase w-[227px] h-[24px] top-20 left-8 font-roobert font-bold text-[16px] tracking-[-2%] leading-[24px] text-[#1A1B1C] ">
          A.I. ANALYSIS
        </h1>
        <h1 className="ml-4 uppercase pt-4 w-[336px] h-[48px] top-20 left-8 font-roobert font-semibold text-sm tracking-[-2%] leading-[24px] text-[#1A1B1C] ">
          A. I. has estimated the following.
        </h1>
        <h1 className="ml-4 uppercase w-[336px] h-[48px] top-20 left-8 font-roobert font-semibold text-sm tracking-[-2%] leading-[24px] text-[#1A1B1C] ">
          Fix estimated information if needed.
        </h1>
      </div>
      <RotatingStack>
        {/* diamond */}

        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* demographics */}
          <button
            onClick={goToDemographics}
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 bg-gray-100 border border-gray-300
            flex items-center justify-center transform rotate-45 hover:bg-gray-400 font-semibold"
          >
            <span className="transform -rotate-45"> DEMOGRAPHICS</span>
          </button>

          {/* cosmetic concerns */}
          <button
            onClick={() => {}}
            className="absolute top-1/2 -right-16 -translate-y-1/2 w-32 h-32 bg-gray-100 border border-gray-300
          flex items-center justify-center transform rotate-45 hover:bg-gray-400 font-semibold"
          >
            <span className="transform -rotate-45">COSMETIC CONCERNS</span>
          </button>

          {/* weather */}
          <button
            onClick={() => {}}
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-32 h-32 bg-gray-100 border border-gray-300
          flex items-center justify-center transform rotate-45 hover:bg-gray-400 font-semibold"
          >
            <span className="transform -rotate-45">WEATHER</span>
          </button>

          {/* skin type */}
          <button
            onClick={() => {}}
            className="absolute -left-16 top-1/2 -translate-y-1/2 w-32 h-32 bg-gray-100 border border-gray-300
          flex items-center justify-center transform rotate-45 hover:bg-gray-400 font-semibold"
          >
            <span className="transform -rotate-45">SKIN TYPE DETAILS</span>
          </button>
        </div>
      </RotatingStack>

      {/* back */}
      <div className="flex justify-between">
        <button
          onClick={goBack}
          className="fixed bottom-4 left-4 flex items-center justify-center "
        >
          <img src={btnBck} alt="Back button" />
        </button>
        {/* summary */}
        <button
          onClick={goToDemographics}
          className="fixed bottom-4 right-4 flex items-center justify-center"
        >
          <img src={btnSum} alt="Get summary" />
        </button>
      </div>
    </div>
  );
};

export default AttributesSelection;
