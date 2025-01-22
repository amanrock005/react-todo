import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";

const EmailEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewHtml, setPreviewHtml] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch all templates when the component mounts
    const fetchTemplates = async () => {
      try {
        const response = await axiosInstance.get("/getEmailLayout");
        setTemplates(response.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
        alert("Failed to fetch templates.");
      }
    };

    fetchTemplates();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSaveTemplate = async () => {
    if (!title || !content || !file) {
      alert("Please fill out all fields and upload an image.");
      return;
    }

    setLoading(true);

    try {
      // Upload image
      const formData = new FormData();
      formData.append("image", file);
      const imageResponse = await axiosInstance.post("/uploadImage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const uploadedImageUrl = imageResponse.data.imageUrl;

      // Save template
      await axiosInstance.post("/uploadEmailConfig", {
        title,
        content,
        imageUrl: uploadedImageUrl,
      });

      alert("Template saved successfully!");
      setTemplates((prev) => [
        ...prev,
        { title, content, imageUrl: uploadedImageUrl },
      ]); // Update the local list of templates
      setTitle("");
      setContent("");
      setFile(null);
    } catch (error) {
      console.error("Error saving template:", error);
      alert("Failed to save template.");
    } finally {
      setLoading(false);
    }
  };

  const handlePreviewTemplate = (template) => {
    const { title, content, imageUrl } = template;

    const htmlTemplate = `
      <html>
      <head></head>
      <body>
      <h1>${title}</h1>
      <p>${content}</p>
      <img src="${imageUrl}" alt="Template Image"/>
      </body>
      </html>
    `;

    setPreviewHtml(htmlTemplate);
    setSelectedTemplate(template);
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
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={handleSaveTemplate}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Template"}
          </button>
        </div>
      </div>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Templates</h2>
        {templates.length > 0 ? (
          <ul className="space-y-4">
            {templates.map((template) => (
              <li
                key={template._id || template.title} // Use unique key
                className={`p-4 border rounded-md cursor-pointer ${
                  selectedTemplate?._id === template._id
                    ? "bg-blue-100"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handlePreviewTemplate(template)}
              >
                <h3 className="text-lg font-bold">{template.title}</h3>
                <p className="text-sm text-gray-600">{template.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No templates found.</p>
        )}
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
