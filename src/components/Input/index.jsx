import React, { Fragment, useState } from "react";

const Input = ({ onInputChange, onFileChange }) => {
  const [data, setData] = useState("");
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => setData(e.target.value);
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = () => {};

  return (
    <article className="flex flex-col gap-2 text-left p-4 border-2 rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">Drone Simulator</h1>
      <label className="text-lg font-bold">
        Enter data: &nbsp;&nbsp;
        <span
          className="text-sm text-blue-400 underline hover:cursor-pointer"
          onClick={() => {}}
        >
          {/* Make a path file template so the user should know what data could be uploaded */}
          <i>Path File Template</i>
        </span>
      </label>
      <textarea
        type="text"
        placeholder={`Enter data in JSON format, e.g.\n ${JSON.stringify(
          { timestamp: 0, lat: 0, lng: 0 },
          null,
          2
        )}`}
        className="h-32 p-2 rounded"
        value={data}
        onChange={handleInputChange}
      />
      <label className="text-lg font-bold text-center">OR</label>
      <input type="file" onChange={handleFileChange} />
      <button
        className="bg-blue-500 w-24 h-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </article>
  );
};

export default Input;
