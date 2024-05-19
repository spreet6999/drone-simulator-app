import React, { useState, useEffect } from "react";

//* Import components
import Map from "./components/Map";
import Input from "./components/Input";
import Controls from "./components/Controls";

//* Import styles
import "./App.css";

const DEFAULT_DRONE_PATH = [
  {
    timestamp: 1709352565,
    lat: 28.6315,
    lng: 77.2167,
  },
  {
    timestamp: 1715719113,
    lat: 28.621912,
    lng: 77.207538,
  },
  {
    timestamp: 1715719120,
    lat: 28.612323,
    lng: 77.198376,
  },
  {
    timestamp: 1715719143,
    lat: 28.602735,
    lng: 77.189214,
  },
  {
    timestamp: 1715719147,
    lat: 28.593147,
    lng: 77.180051,
  },
  {
    timestamp: 1715719169,
    lat: 28.583558,
    lng: 77.170889,
  },
  {
    timestamp: 1715719167,
    lat: 28.57397,
    lng: 77.161727,
  },
  {
    timestamp: 1715719189,
    lat: 28.564382,
    lng: 77.152565,
  },
  {
    timestamp: 1715719192,
    lat: 28.554793,
    lng: 77.143403,
  },
  {
    timestamp: 1715719213,
    lat: 28.545205,
    lng: 77.134241,
  },
  {
    timestamp: 1715719313,
    lat: 28.535617,
    lng: 77.125078,
  },
  {
    timestamp: 1715719413,
    lat: 28.526028,
    lng: 77.115916,
  },
  {
    timestamp: 1715719513,
    lat: 28.51644,
    lng: 77.106754,
  },
  {
    timestamp: 1715719613,
    lat: 28.506852,
    lng: 77.097592,
  },
  {
    timestamp: 1715719713,
    lat: 28.497263,
    lng: 77.08843,
  },
];

export default function App() {
  const [dronePath, setDronePath] = useState(
    DEFAULT_DRONE_PATH?.sort((a, b) => a.timestamp - b.timestamp) || []
  );
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1); // Speed simulation we can add this later on

  //TODO: Additional state for bonus features
  const [paths, setPaths] = useState([]); // Array of drone paths
  const [currentPathIndex, setCurrentPathIndex] = useState(0);

  const parseTimeSeriesData = (data = []) => {
    if (!data || !data.length) return [];
    const parsedData = data.map((coords) => {
      return {
        timestamp: coords["timestamp"],
        lat: coords["latitude"],
        lng: coords["longitude"],
      };
    });
    return parsedData;
  };

  const handleInputChange = (data) => {
    const parsedData = parseTimeSeriesData(data);
    setDronePath(parsedData);
  };

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => handleInputChange(e.target.result);
    reader.readAsText(file);
  };

  const onStartSimulation = () => {
    setIsSimulating(true);
  };

  const onPauseSimulation = () => {
    setIsSimulating(false);
  };

  useEffect(() => {
    if (isSimulating && dronePath.length > 1) {
      const simulateMovement = setInterval(() => {
        if (!isSimulating) return clearInterval(simulateMovement);
        setDronePath(dronePath.filter((_, index) => index !== 0));
      }, 1000 / simulationSpeed);

      return () => clearInterval(simulateMovement);
    }
  }, [isSimulating, dronePath, simulationSpeed]);

  return (
    <div className="flex items-center gap-2">
      <section className="flex-col justify-center w-[30%] mx-auto">
        <Input
          onInputChange={handleInputChange}
          onFileChange={handleFileChange}
        />
        {dronePath?.length > 0 && (
          <Controls
            isSimulating={isSimulating}
            onStart={onStartSimulation}
            onPause={onPauseSimulation}
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
