import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import WeatherDisplay from "./components/WeatherDisplay";
import WeatherCardGrid from "./components/WeatherSearches";
import debounce from "lodash/debounce";
import uniqBy from "lodash/uniqBy";
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

  const [recentSearches, setRecentSearches] = useState([]);

  const fetchWeatherData = async (city) => {
    const weatherData = await getWeather(city);
    if (weatherData) {
      setWeatherData(weatherData);
      setRecentSearches((prevRecentSearches) =>
        uniqBy([weatherData, ...prevRecentSearches], "city")
      );
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
      <main>
        <WeatherDisplay {...weatherData} />
        <WeatherCardGrid cardData={recentSearches.slice(1, 4)} />
      </main>
    </div>
  );
}

export default App;
