import { useState } from "react";

//* import utils
import { parseTimeSeriesDataJSON, validateDronePathFile } from "../../utils";
import dronePathTemplateJSON from "../../assets/drone-path-template.json";

const Input = ({ onInputChange, onFileChange }) => {
  const [data, setData] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const handleInputChange = (e) => setData(e.target.value);
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setIsValidating(true);
    //* We will setData if file is valid else raise alert
    validateDronePathFile(uploadedFile, setData);
    setIsValidating(false);
  };

  const handleDownloadTemplateClick = () => {
    const blob = new Blob([JSON.stringify(dronePathTemplateJSON, null, 2)], {
      type: "application/json",
    });
    const blobUrl = URL.createObjectURL(blob);

    //* Create a link element to trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = blobUrl;
    downloadLink.download = "drone-path-template.json";
    document.body.appendChild(downloadLink);

    //* Trigger the download
    downloadLink.click();

    //* Remove the link element
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(blobUrl);
  };

  const handleSubmit = () => {
    if (data) {
      const parsedData = parseTimeSeriesDataJSON(data);
      if (parsedData) {
        onInputChange(parsedData);
        setData("");
      }
    }
  };

  return (
    <article className="flex flex-col gap-2 text-left p-4 border-2 rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">Drone Simulator</h1>
      <label className="text-lg font-bold">
        Enter data in{" "}
        <span
          className="text-sm text-blue-400 underline hover:cursor-pointer"
          onClick={handleDownloadTemplateClick}
          aria-label="Download Drone Path Template"
        >
          {/* Make a path file template so the user should know what data could be uploaded */}
          <i>Example Template</i>
        </span>
        {" format:"}
      </label>
      <textarea
        type="text"
        placeholder={`Enter data in JSON format, e.g.\n ${JSON.stringify(
          [{ timestamp: 0, lat: 0, lng: 0 }],
          null,
          2
        )}`}
        className="h-32 p-2 rounded"
        value={data}
        onChange={handleInputChange}
      />
      <label className="text-lg font-bold text-center">OR</label>
      {isValidating ? (
        <p className="m-0 text-sm">Validating...</p>
      ) : (
        <input
          title="Select a JSON file to upload"
          type="file"
          accept="application/json"
          onChange={handleFileChange}
          aria-label="Select a JSON file to upload"
        />
      )}
      <button
        className="bg-blue-500 w-full h-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto disabled:opacity-70 disabled:cursor-not-allowed"
        onClick={handleSubmit}
        disabled={!data}
        aria-label="Submit data"
      >
        Simulate
      </button>
    </article>
  );
};

export default Input;
