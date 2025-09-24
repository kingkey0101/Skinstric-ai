import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import btnBck from "../assets/button-back.png";
import CircleProgress from "../components/CircleRing";

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

  const raceList = useMemo(() => sortAndFormat(apiData?.race || {}), [apiData]);
  const ageList = useMemo(() => sortAndFormat(apiData?.age || {}), [apiData]);
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

  // sidebar btns
  const renderSidebarItem = (title, list, key) => {
    return (
      <div className="border-b">
        <h4 className="uppercase text-xs px-4 py-2 text-gray-500"> {title} </h4>
        {list.map((it) => {
          const selected = actual[key] === it.label;
          return (
            <button
              key={it.label}
              onClick={() => setActual((s) => ({ ...s, [key]: it.label }))}
              className={`w-full text-left px-4 py-3 uppercase text-sm font-medium border-b${
                selected ? "bg-black text-white" : "bg-gray-100 text-black"
              }`}
            >
              {it.label}
            </button>
          );
        })}
      </div>
    );
  };

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
        <aside className="w-56 border-r flex flex-col">
          {renderSidebarItem("Race", raceList.slice(0, 1), "race")}
          {renderSidebarItem("Age", ageList.slice(0, 1), "age")}
          {renderSidebarItem("Sex", genderList.slice(0, 1), "gender")}
        </aside>

        {/* center */}
        <div className="relative flex-1 flex items-center justify-end">
          <div className="absolute top-4 left-4 text-2xl font-medium capitalize">
            {topRace.label}
          </div>
          <CircleProgress
            value={parseFloat(topRace.display)}
          />
        </div>

        {/* sidebar - right */}
        <aside className="w-64 border-l p-4">
          <h3 className="uppercase text-sm font-medium mb-4 flex justify-between">
            <span>Race</span>
            <span>A.I. Confidence</span>
          </h3>
          <ul className="space-y-2">
            {raceList.map((it) => (
              <li
                key={it.label}
                onClick={() => setActual((s) => ({ ...s, race: it.label }))}
                className={`flex justify-between items-center px-3 py-2 cursor-pointer ${
                  actual.race === it.label
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <span className="capitalize"> {it.label} </span>
                <span>{it.display}</span>
              </li>
            ))}
          </ul>
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
