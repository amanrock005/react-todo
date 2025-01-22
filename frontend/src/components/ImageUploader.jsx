// import React from "react";
// import { axiosInstance } from "../lib/axios";
// const ImageUploader = ({ setImageUrl }) => {
//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const response = await axiosInstance.post("/uploadImage", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setImageUrl(response.data.imageUrl);
//       alert("Image uploaded successfully!");
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       alert("Failed to upload image.");
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//     </div>
//   );
// };

// export default ImageUploader;

import React, { useState } from "react";
import { axiosInstance } from "../lib/axios";

const ImageUploader = ({ setImageUrl }) => {
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreviewImage(URL.createObjectURL(selectedFile)); // for image preview
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axiosInstance.post("/uploadImage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImageUrl(response.data.imageUrl);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {previewImage && (
        <div className="mt-4">
          <img
            src={previewImage}
            alt="preview"
            className="w-32 h-auto rounded-md"
          />
        </div>
      )}
      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Upload Image
      </button>
    </div>
  );
};

export default ImageUploader;
