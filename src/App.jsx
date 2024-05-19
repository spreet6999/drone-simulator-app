import React, { useState, useEffect } from "react";

//* Import components
import Map from "./components/Map";
import Input from "./components/Input";
import Controls from "./components/Controls";

//* Import styles
import "./App.css";

const DEFAULT_DRONE_PATH = [];

export default function App() {
  const [dronePath, setDronePath] = useState(
    DEFAULT_DRONE_PATH?.sort((a, b) => a.timestamp - b.timestamp) || []
  );
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1); // Speed simulation we can add this later on

  //TODO: Additional state for bonus features
  const [paths, setPaths] = useState([]); // Array of drone paths
  const [currentPathIndex, setCurrentPathIndex] = useState(0);

  const handleInputChange = (data) => {
    console.log(data);
    if (!data) return;

    // Sorting data based on timestamp because we are then using 0 index as our first point to start with
    data?.sort((a, b) => a.timestamp - b.timestamp);
    setDronePath(data);
    if (isSimulating) setIsSimulating(false);
  };

  const onStartSimulation = () => {
    setIsSimulating(true);
  };

  const onPauseSimulation = () => {
    setIsSimulating(false);
  };

  useEffect(() => {
    if (isSimulating && dronePath.length > 1) {
      var simulateMovement = setInterval(() => {
        if (!isSimulating) return clearInterval(simulateMovement);
        setDronePath(dronePath.filter((_, index) => index !== 0));
      }, 1000 / simulationSpeed);

      return () => clearInterval(simulateMovement);
    }
    if (isSimulating && dronePath.length === 1) {
      setIsSimulating(false);
    }
    return () => clearInterval(simulateMovement);
  }, [isSimulating, dronePath, simulationSpeed]);

  return (
    <div className="flex items-center gap-2">
      <section className="flex-col justify-center w-[30%] mx-auto">
        <p className="text-right w-full m-0 ml-auto font-bold">
          <span
            className="cursor-pointer"
            onClick={() => window.location.reload()}
          >
            Reset
          </span>
        </p>
        <Input onInputChange={handleInputChange} />
        {dronePath?.length > 0 && (
          <Controls
            isSimulating={isSimulating}
            onStart={onStartSimulation}
            onPause={onPauseSimulation}
            isDisabled={dronePath.length <= 1}
          />
        )}
      </section>
      <section className="flex-col justify-center w-[70%] mx-auto">
        <Map
          // dronePath={paths[currentPathIndex] || dronePath}
          dronePath={dronePath}
          isSimulating={isSimulating}
          // isMultiplePaths={paths.length > 1}
          isMultiplePaths={false}
          style={{ marginTop: "20px", height: "90vh" }}
        />
        {/* {paths.length > 1 && (
          <div>
            <h3>Paths</h3>
            {paths.map((path, index) => (
              <button
                key={index}
                className="mr-2 mb-2"
                onClick={() => handleSwitchPath(index)}
              >
                Path {index + 1}
              </button>
            ))}
          </div>
        )} */}
        {/* <button onClick={() => addPath([])}>Add New Path</button> */}
      </section>
    </div>
  );
}
