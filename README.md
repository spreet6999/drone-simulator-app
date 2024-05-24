
# Drone Simulator App

This is a React application that simulates drone movement on a map based on user-provided time series data of latitude and longitude.

## Features:

 - Display world maps using Google Maps.
 - Take multiple sets of latitude and longitude in input as file or text (JSON) from the user.
 - Simulate drone movement based on timestamps and update the path progress on the map.
 - Provide functionalities to pause/resume the simulation.

## Dependencies:
  - @react-google-maps/api
  - react-google-maps (deprecated, included for compatibility)
  - tailwindcss

## Setup:

 - Clone this repository.
 - Install dependencies:

```Bash
npm install
```

## Configuration:

 - Create a .env file in the project root directory.
 - Add the following line to your .env file, replacing YOUR_API_KEY with your actual Google Maps API key: 
   ```Bash
   VITE_GOOGLE_MAPS_API_KEY=YOUR_API_KEY
   ```

## Running the application:

## Start the development server:

```Bash
npm run dev
```

## The application will be accessible at http://localhost:5173/
