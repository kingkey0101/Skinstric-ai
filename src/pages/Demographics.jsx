import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import btnBck from "../assets/button-back.png";
import CircleProgress from "../components/CircleRing";
import SidebarOptions from "../components/RightSidebar";

function sortAndFormat(obj = {}) {
  return Object.entries(obj)
    .map(([label, score]) => ({ label, score: Number(score) }))
    .sort((a, b) => b.score - a.score)
    .map((s) => ({ ...s, display: (s.score * 100).toFixed(0) + "%" }));
}

const Demographics = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const apiData = state?.demographics ?? null;

  const [actual, setActual] = useState({
    race: null,
    age: null,
    gender: null,
  });
  const [activeCategory, setActiveCategory] = useState("race");

  const raceList = useMemo(() => sortAndFormat(apiData?.race || {}), [apiData]);
  const ageList = useMemo(() => {
    const formatted = sortAndFormat(apiData?.age || {});
    const parseAgeRange = (label) => {
      if (label.includes("-")) {
        return parseInt(label.split("-")[0], 10);
      } else if (label.includes("+")) {
        return parseInt(label.replace("+", ""), 10);
      }
      return parseInt(label, 10) || 0;
    };

    return formatted.sort(
      (a, b) => parseAgeRange(a.label) - parseAgeRange(b.label)
    );
  }, [apiData]);
  const genderList = useMemo(
    () => sortAndFormat(apiData?.gender || {}),
    [apiData]
  );

  if (!apiData) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Demographics</h1>
        <p className="text-gray-600">No prediction data available.</p>
      </div>
    );
  }

  // grab top predictions
  const topRace = raceList[0] || {};
  const topAge = ageList[0] || {};
  const topGender = genderList[0] || {};

  // selected
  const currentRace =
    raceList.find((it) => it.label === actual.race) || topRace;
  const currentAge = ageList.find((it) => it.label === actual.age) || topAge;
  const currentGender =
    genderList.find((it) => it.label === actual.gender) || topGender;

  const currentCategory =
    {
      race: currentRace,
      age: currentAge,
      gender: currentGender,
    }[activeCategory] || {};

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* header */}
      <header className="sticky top-0 z-40 bg-white px-4 lg:px-0 py-4">
        <h2 className="text-sm font-semibold tracking-wide">A.I. ANALYSIS</h2>
        <h1 className=" text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal mt-2">
          DEMOGRAPHICS
        </h1>
        <p className="text-sm mt-3">Predicted Race & Age</p>
      </header>

      {/* layout - main */}
      <div className="flex flex-col lg:flex-row flex-1 border-t overflow-y-auto pb-24 lg:w-screen lg:max-w-none lg:justify-between lg:gap-0 lg:px-0">
        {/* sidebar - left */}
        <aside className="order-1 lg:order-1 w-full lg:w-[208px] flex-shrink-0 flex flex-col lg:ml-0 lg:px-0">
          {/* race */}
          <div
            className={`border-b px-4 py-3 cursor-pointer ${
              activeCategory === "race"
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-100"
            }`}
            onClick={() => setActiveCategory("race")}
          >
            <p className="text-base font-medium capitalize mb-11">
              {topRace.label}
            </p>
            <h4 className="uppercase text-base font-semibold mb-2">Race</h4>
          </div>
          {/* age */}

          <div
            className={`border-t-2 border-gray-800 px-4 py-3 cursor-pointer mt-4 ${
              activeCategory === "age"
                ? "bg-black text-white"
                : " bg-gray-100 hover:bg-gray-100"
            }`}
            onClick={() => setActiveCategory("age")}
          >
            <p className="text-base font-medium capitalize mb-11">
              {topAge.label}
            </p>
            <h4 className="uppercase text-base font-semibold mb-2">Age</h4>
          </div>
          {/* sex */}
          <div
            className={`px-4 py-3 border-t-2 border-gray-800 cursor-pointer mt-4 ${
              activeCategory === "gender"
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-100"
            }`}
            onClick={() => setActiveCategory("gender")}
          >
            <p className="text-base font-medium capitalize mb-11">
              {topGender.label}
            </p>
            <h4 className="uppercase text-base font-semibold mb-2">Sex</h4>
          </div>
        </aside>

        {/* center */}
        <div className="order-2 lg:order-2 flex flex-col items-center justify-center bg-gray-50 
         w-full h-[300px] sm:h-[400px]
         lg:w-[1168px] lg:h-[544px] lg:mx-4 mt-5 lg:mt-0">
          <div className="text-3xl sm:text-4xl font-medium capitalize mb-4">
            {activeCategory === "age"
              ? `${currentAge.label} y.o.`
              : currentCategory.label}
          </div>
          <div className="my-8 w-[200px] h-[200px] sm:w-64 sm:h-64 lg:w-[384px] lg:h-[384px] mt-5 lg:mt-0">
            <CircleProgress value={parseFloat(currentCategory.display)} />
            <h3 className="text-xs text-gray-500 text-center">
              If A.I. estimate is wrong, please select the correct one.
            </h3>
          </div>
        </div>

        {/* sidebar - right */}
        <aside className="order-3 lg:order-3 w-full lg:w-[448px] border-t-2 border-gray-800 p-4 bg-gray-50 mt-5 lg:mt-0">
          {activeCategory === "race" && (
            <SidebarOptions
              category="Race"
              list={raceList}
              selected={actual.race}
              onSelect={(val) => setActual((s) => ({ ...s, race: val }))}
            />
          )}
          {activeCategory === "age" && (
            <SidebarOptions
              category="Age"
              list={ageList}
              selected={actual.age}
              onSelect={(val) => setActual((s) => ({ ...s, age: val }))}
            />
          )}
          {activeCategory === "gender" && (
            <SidebarOptions
              category="Sex"
              list={genderList}
              selected={actual.gender}
              onSelect={(val) => setActual((s) => ({ ...s, gender: val }))}
            />
          )}
        </aside>
      </div>

      {/* footer */}
      <footer className="sticky bottom-0 flex items-center justify-between gap-4 px-8 py-4 bg-white sm:bg-transparent">
        {/* bck btn */}
        <button
          onClick={() => navigate(-1)}
          className="fixed bottom-4 left-4 flex items-center justify-center "
        >
          <img src={btnBck} alt="Back button" />
        </button>

        <button
          className="fixed bottom-4 right-4 px-6 py-2 bg-black text-white text-sm uppercase"
          onClick={() => navigate("/home", { state: { actual } })}
        >
          Confirm
        </button>
      </footer>
    </div>
  );
};

export default Demographics;
