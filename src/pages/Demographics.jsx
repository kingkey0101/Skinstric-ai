import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

function sortAndFormat(obj = {}) {
  return Object.entries(obj)
    .map(([label, score]) => ({ label, score: Number(score) }))
    .sort((a, b) => b.score - a.score)
    .map((s) => ({ ...s, display: (s.score * 100).toFixed(2) + '%' }));
}

const Demographics = () => {
  const { state } = useLocation();
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

  const renderList = (title, list = [], key) => (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-3"> {title} </h2>
      <ul className="space-y-2">
        {list.map((it) => {
          const selected = actual[key] === it.label;
          return (
            <li
              key={it.label}
              onClick={() => setActual((s) => ({ ...s, [key]: it.label }))}
              className={`flex justify-between items-center p-3 rounded-md cursor-pointer transition *:${selected} ? 'bg-blue-50 border border-blue-200 : hover:bg-gray-50'}`}
              role="button"
            >
              <span className="capitalize"> {it.label} </span>
              <span className="text-sm font-medium"> {it.display} </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-4 gap-6">
        {/* left: actual values */}
        <aside className="col-span-1 bg-gray-50 p-4 rounded-md">
          <h3 className="text-sm font-semibold mb-3">Actual attributes</h3>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-gray-500">Race</div>
              <div className="mt-1 text-sm font-medium">
                {" "}
                {actual.race ?? "-"}{" "}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Gender</div>
              <div className="mt-1 text-sm font-medium">
                {" "}
                {actual.gender ?? "-"}{" "}
              </div>
            </div>
          </div>
        </aside>

        {/* main content */}
        <main className="col-span-3 grid grid-cols-3 gap-6">
          <section>{renderList("Race", raceList, "race")}</section>

          <section>{renderList("Age", ageList, "age")}</section>

          <section>{renderList("Gender", genderList, "gender")}</section>
        </main>
      </div>
    </div>
  );
};

export default Demographics;
