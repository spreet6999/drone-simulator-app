import React from "react";

const Controls = ({ isSimulating, onStart, onPause, isDisabled = false }) => {
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
          className="bg-red-500 h-10 mt-2 w-full font-bold rounded disabled:opacity-70 disabled:cursor-not-allowed"
          onClick={handlePause}
          disabled={isDisabled}
        >
          Pause
        </button>
      ) : (
        <button
          className="bg-green-600 h-10 mt-2 w-full font-bold rounded disabled:opacity-70 disabled:cursor-not-allowed"
          onClick={handleStart}
          disabled={isDisabled}
        >
          Start
        </button>
      )}
    </div>
  );
};

export default Controls;
