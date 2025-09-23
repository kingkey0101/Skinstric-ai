import React, { useState } from "react";
import RotatingStack from "./RotatingStack";
import gallery from "../assets/gallery.png";
import allow from "../assets/allow.png";
import ImageUpload from "./ImageUpload";

const GalleryAccess = () => {
  const [loading, setLoading] = useState(false);
  const [apiResult, setApiResult] = useState(null);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

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

    setPreview(dataUrl || null);
    setError(null);

    // debug logs to see what is sent
   console.log("Sending to API:",{
    image: trimmed.slice(0,100) + '...',
    length: trimmed.length
   })



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
    } catch (error) {
      setError(error.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };
  // console.log("Sending base64 length:", base64.length);
  // console.log("First 50 chars:", base64.slice(0, 50));

  return (
    <>
      {/* upload / status */}
      <div className="mb-6">
        {loading && <p className="mt-2 text-gray-600">Analyzing image...</p>}
        {error && <p className="mt-2 text-red-500"> {error} </p>}
      </div>

      {/* image preivew */}
      {/* {preview && (
        <div className="mb-6">
          <p className="text-sm mb-2">Preview</p>
          <img src={preview} alt="preview" className="max-w-xs rounded-md" />
        </div>
      )} */}

      {/* raw api results(format UI later) */}
      {apiResult && (
        <div className="mb-6">
          <p className="text-sm mb-2">AI predictions (raw)</p>
          <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded">
            {JSON.stringify(apiResult, null, 2)}
          </pre>
        </div>
      )}

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
