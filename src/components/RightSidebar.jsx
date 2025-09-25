import React from "react";

const SidebarOptions = ({ category, list, selected, onSelect }) => (
  <>
    <h3 className="uppercase text-sm font-medium mb-4 flex justify-between">
      <span>{category}</span>
    </h3>
    <ul className="space-y-2">
      {list.map((it) => (
        <li
          key={it.label}
          onClick={() => onSelect(it.label)}
          className={`flex justify-between items-center px-3 py-2 cursor-pointer ${
            selected === it.label ? "bg-black text-white" : "hover:bg-gray-100"
          }`}
        >
          {/* diamond */}
          <span className="flex items-center gap-2">
            <span
              className={`relative w-3 h-3 rotate-45 border 
           ${selected === it.label ? "border-white" : "border-black"} `}
            >
              {/* inner diamond */}
              {selected === it.label && (
                <span className="absolute inset-[2px] bg-white"></span>
              )}
            </span>
            {/* label */}
            <span className="capitalize">{it.label}</span>
          </span>
          <span>{it.display}</span>
        </li>
      ))}
    </ul>
  </>
);

export default SidebarOptions;
