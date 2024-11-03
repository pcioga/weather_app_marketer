import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import WeatherDisplay from "./components/WeatherDisplay";
import "./App.css";

function App() {
  // defaults to Oslo
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 40.7128,
    longitude: -74.006,
    city: "New York",
    country: "US",
  });

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation((prevCurrentLocation) => ({
            ...prevCurrentLocation,
            latitude,
            longitude,
          }));
          getLocationName(latitude, longitude);
        },
        (error) => {
          console.log("Unable to get location");
        }
      );
    } else {
      console.log("Geolocation browser error");
    }
  };

  const getLocationName = (lat, lon) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCurrentLocation((prevCurrentLocation) => ({
          ...prevCurrentLocation,
          city: data[0].name,
          country: data[0].country,
        }));
      })
      .catch((error) => console.error("Error openweather API:", error));
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div>
      <Header />
      <WeatherDisplay
        lat={currentLocation.latitude}
        lon={currentLocation.longitude}
        city={currentLocation.city}
        country={currentLocation.country}
      />
    </div>
  );
}

export default App;
