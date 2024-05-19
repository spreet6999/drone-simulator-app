import React, { useState, useEffect, useCallback, memo } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";

const mapContainerStyle = {
  height: "100%",
  width: "100%",
  borderRadius: "6px",
};

const Map = ({
  dronePath = [],
  isSimulating = false,
  isMultiple = false,
  style = {},
}) => {
  const [map, setMap] = useState(null);
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-maps-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const center = { lat: 28.7040592, lng: 77.1024902 }; // Replace with your default center coordinates

  const handleMapLoad = useCallback((mapInstance) => setMap(mapInstance), []);

  useEffect(() => {
    if (isSimulating && map) {
      // Simulate drone movement based on dronePath data
    }
  }, [isSimulating, map, dronePath]);

  if (loadError)
    return <div className="color-red-500 h-full w-full">Map loading error</div>;
  if (!isLoaded)
    return <div className="h-full w-full font-bold">Loading map...</div>;

  // console.log("dronePath", dronePath);

  return (
    <div style={{ height: "100%", width: "100%", ...style }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={dronePath?.length > 0 ? dronePath[0] : center}
        onLoad={handleMapLoad}
        onUnmount={() => setMap(null)}
      >
        {renderPolyLine(dronePath, isSimulating)}
        <Marker
          position={dronePath[0]}
          options={{
            // icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
            icon: "https://maps.google.com/mapfiles/ms/micons/green.png",
          }}
        />
        <Marker position={dronePath[dronePath.length - 1]} />
      </GoogleMap>
    </div>
  );
};

export default memo(Map);

const renderPolyLine = (dronePath = [], isSimulating = false) => {
  if (dronePath?.length > 0) {
    return (
      <Polyline
        path={dronePath}
        options={{ strokeColor: "#4285F4", strokeWeight: 8 }}
      />
    );
  }
};
