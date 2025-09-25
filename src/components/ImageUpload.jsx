import React, { useState } from "react";

const ImageUpload = ({
  onImageReady = () => {},
  onLoading = () => {},
  onError = () => {},
  maxSizeMb = 5,
  hideBtn = false,
  children = null,
}) => {
  const [localError, setLocalError] = useState("");

  const handleFile = (file) => {
    setLocalError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      const msg = "Please choose an image file";
      setLocalError(msg);
      onError(msg);
      return;
    }
    if (file.size > maxSizeMb * 1024 * 1024) {
      const msg = `File too large. Max ${maxSizeMb}MB`;
      setLocalError(msg);
      onError(msg);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      // remove prefix for APPI base64 expectation
      const base64 = (typeof dataUrl === 'string' && dataUrl.includes(','))
      ? dataUrl.split(',')[1]
      : dataUrl;
      onImageReady(base64, dataUrl);
    };
    reader.onerror = () => {
      const msg = "Failed to read file";
      setLocalError(msg);
      onError(msg);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
    // clear so same file can be used again
    e.target.value = "";
  };

  return (
    <div className="flex flex-col items-center">
      <label className="cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        {hideBtn ? (
          children ?? null
        ) : (
          <div className="px-6 py-3 bg-gray-100 rounded-md hover:bg-gray-200">
            {children ?? "Upload image"}
          </div>
        )}
      </label>

      {localError && (
        <p className="text-red-500 text-sm mt-2"> {localError} </p>
      )}
    </div>
  );
};

export default ImageUpload;
