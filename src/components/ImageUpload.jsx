import React, { useState } from "react";

const ImageUpload = () => {
  const onImageReady = () => {};
  const onLoading = () => {};
  onError = () => {};
  maxSizeMb = 5;
};
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
    const msg = `File too lareg. Max ${maxSizeMb}MB`;
    setLocalError(msg);
    onError(msg);
    return;
  }

  const reader = new FileReader();
  onLoading(true);
  reader.onload = () => {
    const dataUrl = reader.result;
    const base64 = dataUrl.split(",")[1] ?? dataUrl;
    onImageReady(base64);
    onLoading(false);
  };
  reader.onerror = () => {
    const msg = "Failed to read file";
    setLocalError(msg);
    onError(msg);
    onLoading(false);
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
      <div className="px-6 py-3 bg-gray-100 rounded-md hover:bg-gray-200">
        Upload image
      </div>
    </label>

    {localError && <p className="text-red-500 text-sm mt-2"> {localError} </p>}
  </div>
);

export default ImageUpload;
