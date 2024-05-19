import React from "react";

const Controls = ({ isSimulating, onStart, onPause }) => {
  const handleStart = () => {
    onStart();
  };

  const handlePause = () => {
    onPause();
  };

  return (
    <div className="mt-6">
      {isSimulating ? (
        <button
          className="bg-red-500 h-10 mt-2 w-full font-bold rounded"
          onClick={handlePause}
        >
          Pause
        </button>
      ) : (
        <button
          className="bg-green-600 h-10 mt-2 w-full font-bold rounded"
          onClick={handleStart}
        >
          Start
        </button>
      )}
    </div>
  );
};

export default Controls;
