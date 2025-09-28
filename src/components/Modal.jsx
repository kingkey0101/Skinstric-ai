import React from "react";

const Modal = ({ onAllow, onDeny }) => {
  return (
    <div
      className="bg-black text-white  shadow-lg h-[163px] w-[352px]"
    >
      {/* header */}
      <div className="px-4 py-3  text-sm font-medium uppercase flex flex-1 justify-center tracking-wide text-center mb-14">
        ALLOW A.I. TO ACCESS YOUR CAMERA
      </div>
      {/* buttons */}
      <div className="flex justify-end px-4 py-2 text-xs border-t border-white text-center">
        <button
          onClick={onDeny}
          className="px-4 py-2 text-gray-400 hover:text-white"
        >
          DENY
        </button>
        <button onClick={onAllow} className="px-4 py-2 text-white">
          ALLOW
        </button>
      </div>
    </div>
  );
};

export default Modal;
