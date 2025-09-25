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
    <div className="min-h-screen bg-white flex flex-col">
      {/* header */}
      <header className="px-8 py-4">
        <h2 className="text-sm font-semibold tracking-wide">A.I. ANALYSIS</h2>
        <h1 className="text-5xl font-normal mt-2">DEMOGRAPHICS</h1>
        <p className="text-sm mt-1">Predicted Race & Age</p>
      </header>
      {/* layout - main */}
      <div className="flex flex-1 border-t">
        {/* sidebar - left */}
        <aside className="w-56 bg-gray-50 border-r flex flex-col">
          <div
            className={`border-b px-4 py-3 cursor-pointer ${
              activeCategory === "race" ? "bg-gray-200" : ""
            }`}
            onClick={() => setActiveCategory("race")}
          >
            <p className="text-base font-medium capitalize mb-11">
              {topRace.label}
            </p>
            <h4 className="uppercase text-base font-semibold mb-2">Race</h4>
          </div>

          <div
            className={`border-b px-4 py-3 cursor-pointer ${
              activeCategory === "age" ? "bg-gray-200" : ""
            }`}
            onClick={() => setActiveCategory("age")}
          >
            <p className="text-base font-medium capitalize mb-11">
              {topAge.label}
            </p>
            <h4 className="uppercase text-base font-semibold mb-2">Age</h4>
          </div>
          <div
            className={`border-b px-4 py-3 cursor-pointer ${
              activeCategory === "gender" ? "bg-gray-200" : ""
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
        <div className="relative flex-1 flex items-center justify-end bg-gray-50 mx-8">
          <div className="absolute top-4 left-4 text-5xl font-medium capitalize">
            {activeCategory === "age"
              ? `${currentAge.label} y.o.`
              : currentCategory.label}
          </div>
          <CircleProgress value={parseFloat(currentCategory.display)} />
        </div>

        {/* sidebar - right */}
        <aside className="w-64 border-l p-4 bg-gray-50">
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

      {/* bck btn */}
      <button
        onClick={() => navigate(-1)}
        className="fixed bottom-4 left-4 flex items-center justify-center "
      >
        <img src={btnBck} alt="Back button" />
      </button>

      {/* footer */}
      <footer className="sticky bottom-0 flex justify-end gap-4 px-8 py-4 border-t">
        <button
          className="px-6 py-2 border text-sm uppercase"
          onClick={() => setActual({ race: null, age: null, gender: null })}
        >
          Reset
        </button>
        <button
          className="px-6 py-2 bg-black text-white text-sm uppercase"
          onClick={() => navigate("/nextStep", { state: { actual } })}
        >
          Confirm
        </button>
      </footer>
    </div>
  );
};

export default Demographics;
