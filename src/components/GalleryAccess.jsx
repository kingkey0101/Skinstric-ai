import React, { useState } from "react";
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

    // debug logs to see what is sent
    console.log("Sending to API:", {
      image: trimmed.slice(0, 100) + "...",
      length: trimmed.length,
    });

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
        console.error("API responded (error)", json);
        throw new Error(json?.message || `HTTP ${result.status}`);
      }
      console.log("API success response:", json);
      setApiResult(json.data);
      navigate("/select-attributes", { state: { demographics: json.data } });
    } catch (error) {
      setError(error.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* upload / status */}
      {loading && (
        <div className="relative mb-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <RotatingStack>
              <p className="relative z-10 text-gray-700 text-sm flex items-center gap-2">
                PREPARING YOUR ANALYSIS...
              </p>
            </RotatingStack>
          </div>
        </div>
      )}
      {error && <p className="mt-2 text-red-500"> {error} </p>}
      <div>
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
      </div>
    </>
  );
};

export default GalleryAccess;
