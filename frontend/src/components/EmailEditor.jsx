// import React, { useState } from "react";
// import { axiosInstance } from "../lib/axios";
// import ImageUploader from "./ImageUploader";

// const EmailEditor = () => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [previewHtml, setPreviewHtml] = useState("");

//   //   const handleSaveTemplate = async () => {
//   //     try {
//   //       const response = await axiosInstance.post("/uploadEmailConfig", {
//   //         title,
//   //         content,
//   //         imageUrl,
//   //       });
//   //       alert("Template saved successfully!");
//   //       console.log(response.data);
//   //     } catch (error) {
//   //       console.error("Error saving template:", error);
//   //       alert("Failed to save template.");
//   //     }
//   //   };

//   //   const handlePreviewTemplate = async () => {
//   //     try {
//   //       const response = await axiosInstance.get("/getEmailLayout");
//   //       const template = response.data
//   //         .replace("{{Title}}", title)
//   //         .replace("{{Content}}", content)
//   //         .replace("{{ImageURL}}", imageUrl);

//   //       setPreviewHtml(template);
//   //     } catch (error) {
//   //       console.error("Error fetching template:", error);
//   //       alert("Failed to preview template.");
//   //     }
//   //   };
//   const handleSaveTemplate = async () => {
//     if (!title || !content || !imageUrl) {
//       alert("Please fill out all fields and upload an image.");
//       return;
//     }

//     try {
//       const response = await axiosInstance.post("/uploadEmailConfig", {
//         title,
//         content,
//         imageUrl,
//       });
//       alert("Template saved successfully!");
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error saving template:", error);
//       alert("Failed to save template.");
//     }
//   };

//   const handlePreviewTemplate = async () => {
//     if (!title || !content || !imageUrl) {
//       alert(
//         "Please fill out all fields and upload an image before previewing."
//       );
//       return;
//     }

//     try {
//       const response = await axiosInstance.get("/getEmailLayout");
//       const template = response.data
//         .replace("{{Title}}", title)
//         .replace("{{Content}}", content)
//         .replace("{{ImageURL}}", imageUrl);

//       setPreviewHtml(template);
//     } catch (error) {
//       console.error("Error fetching template:", error);
//       alert("Failed to preview template.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
//         Email Editor
//       </h1>
//       <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
//         <div className="space-y-4">
//           <input
//             type="text"
//             placeholder="Enter Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//           <textarea
//             placeholder="Enter Content"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             className="w-full h-32 px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           ></textarea>
//           <ImageUploader setImageUrl={setImageUrl} />
//         </div>
//         <div className="flex space-x-4">
//           <button
//             onClick={handleSaveTemplate}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           >
//             Save Template
//           </button>
//           <button
//             onClick={handlePreviewTemplate}
//             className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
//           >
//             Preview Template
//           </button>
//         </div>
//       </div>
//       <div className="max-w-3xl mx-auto mt-8 p-6 bg-gray-50 shadow-md rounded-lg">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Preview</h2>
//         <div
//           dangerouslySetInnerHTML={{ __html: previewHtml }}
//           className="border border-gray-300 rounded-lg p-4 bg-white"
//         ></div>
//       </div>
//     </div>
//   );
// };

// export default EmailEditor;

import React, { useState } from "react";
import { axiosInstance } from "../lib/axios";
import ImageUploader from "./ImageUploader";

const EmailEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [previewHtml, setPreviewHtml] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSaveTemplate = async () => {
    if (!title || !content || !imageUrl) {
      alert("Please fill out all fields and upload an image.");
      return;
    }

    setLoading(true); // Set loading to true when the process starts
    try {
      const response = await axiosInstance.post("/uploadEmailConfig", {
        title,
        content,
        imageUrl,
      });
      alert("Template saved successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error saving template:", error);
      alert("Failed to save template.");
    } finally {
      setLoading(false); // Set loading to false when the process ends
    }
  };

  const handlePreviewTemplate = async () => {
    if (!title || !content || !imageUrl) {
      alert(
        "Please fill out all fields and upload an image before previewing."
      );
      return;
    }

    setLoading(true); // Set loading to true when the process starts
    try {
      const response = await axiosInstance.get("/getEmailLayout");
      const template = response.data
        .replace("{{Title}}", title)
        .replace("{{Content}}", content)
        .replace("{{ImageURL}}", imageUrl);

      setPreviewHtml(template);
    } catch (error) {
      console.error("Error fetching template:", error);
      alert("Failed to preview template.");
    } finally {
      setLoading(false); // Set loading to false when the process ends
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Email Editor
      </h1>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <textarea
            placeholder="Enter Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-32 px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
          <ImageUploader setImageUrl={setImageUrl} />
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleSaveTemplate}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Saving..." : "Save Template"}
          </button>
          <button
            onClick={handlePreviewTemplate}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Previewing..." : "Preview Template"}
          </button>
        </div>
      </div>
      <div className="max-w-3xl mx-auto mt-8 p-6 bg-gray-50 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Preview</h2>
        <div
          dangerouslySetInnerHTML={{ __html: previewHtml }}
          className="border border-gray-300 rounded-lg p-4 bg-white"
        ></div>
      </div>
    </div>
  );
};

export default EmailEditor;
