import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import WeatherDisplay from "./components/WeatherDisplay";
import debounce from "lodash/debounce";
import { getUserLocation, getLocationName, getWeather } from "./api";
import "./App.css";

function App() {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  // defaults to NY
  const [weatherData, setWeatherData] = useState({
    weather: "",
    description: "",
    icon: "",
    temperature: "",
    humidity: "",
    windSpeed: "",
    city: "New York",
    country: "US",
  });

  const [searchLocation, setSearchLocation] = useState(null);

  const [recentSearches, setSearches] = useState([]);

  const fetchWeatherData = async (city) => {
    const weatherData = await getWeather(city);
    if (weatherData) {
      setWeatherData(weatherData);
    }
  };

  useEffect(() => {
    const setUserLocation = async () => {
      const userLocation = await getUserLocation();
      if (userLocation) {
        fetchWeatherData(userLocation.city);
      }
    };

    setUserLocation();
  }, []);

  useEffect(() => {
    if (searchLocation < 3) return;

    const debouncedFetch = debounce(
      () => fetchWeatherData(searchLocation),
      1000
    );
    debouncedFetch();
    return () => {
      debouncedFetch.cancel();
    };
  }, [searchLocation]);

  return (
    <div>
      <Header onSearch={setSearchLocation} />
      <div className="main--city">
        {weatherData.city}, {weatherData.country}
      </div>
      <WeatherDisplay {...weatherData} />
    </div>
  );
}

export default App;
