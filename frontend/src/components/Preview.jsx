import React from "react";

const Preview = ({ html }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Preview</h2>
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className="bg-white border border-gray-200 rounded-md p-4"
      ></div>
    </div>
  );
};

export default Preview;
