import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AttributesSelection = () => {
  const { state } = useLocation();
  const demographics = state?.demographics;
  const navigate = useNavigate();

  if (!demographics) {
    return <p className="p-6">No data-go back and upload an image first</p>;
  }
  const handleContinue = (selections) => {
    navigate("demographics", {
      state: { demographics, selections },
    });
  };
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Select your Attributes</h1>
      {/* slection UI here then call handleContinue({race, age, gender}) */}
    </div>
  );
};

export default AttributesSelection;
