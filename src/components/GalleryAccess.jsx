import React, { useEffect, useState } from "react";
import RotatingStack from "./RotatingStack";
import gallery from "../assets/gallery.png";
import allow from "../assets/allow.png";
import ImageUpload from "./ImageUpload";
import { useNavigate } from "react-router-dom";

const GalleryAccess = () => {
  const [loading, setLoading] = useState(false);
  const [apiResult, setApiResult] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleImageReady = async (base64, dataUrl) => {
    console.log("image reay fired", base64?.length);
    setLoading(true);
    if (!base64 || typeof base64 !== "string") {
      setError("Invalid image data");
      return;
    }

    const trimmed = base64.trim();
    if (trimmed.length < 100) {
      setError("Image data seems too small");
      return;
    }
    setLoading(true);
    setApiResult(null);
    setError(null);

    try {
      const result = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: trimmed }),
        }
      );

      const json = await result.json();
      if (!result.ok) {
        throw new Error(json?.message || `HTTP ${result.status}`);
      }
      setApiResult(json.data);

      setTimeout(() => {
        navigate("/select-attributes", { state: { demographics: json.data } });
      }, 1300);
    } catch (error) {
      setError(error.message || "Upload failed");
    }
  };

  return (
    <>
      {/* upload / status */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-white">
          <RotatingStack>
            <p className="relative z-10 text-gray-700 text-lg font-medium">
              PREPARING YOUR ANALYSIS...
            </p>
          </RotatingStack>
        </div>
      )}
      {/* error */}
      {error && <p className="mt-2 text-red-500"> {error} </p>}

      {/* Gallery - right side */}
      <div className="flex items-center justify-center h-screen w-1/2">
        <div className="relative ">
          <div className="transform scale-50 origin-center">
            <RotatingStack />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative inline-block mb-32">
              <ImageUpload
                hideBtn
                onImageReady={handleImageReady}
                onLoading={(v) => setLoading(v)}
                onError={(msg) => setError(msg)}
              >
                <img src={gallery} alt="gallery" />
              </ImageUpload>

              <img
                src={allow}
                alt="scan"
                className="absolute right-full ml-4 bottom-0-0 -translate-y-1/3 w-[200px] h-auto pointer-events-none scale-150"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryAccess;
