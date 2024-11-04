import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import WeatherDisplay from "./components/WeatherDisplay";
import WeatherCardGrid from "./components/WeatherCard";
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

  const [error, setError] = useState("");

  const fetchWeatherData = async (city) => {
    const weatherData = await getWeather(city);

    if (weatherData) {
      if (weatherData.error) {
        setError(weatherData.error);
      } else {
        setError("");
        setWeatherData(weatherData);
        setRecentSearches((prevRecentSearches) => {
          return uniqBy([weatherData, ...prevRecentSearches], "city").slice(
            0,
            7
          );
        });
      }
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

    const debouncedFetch = debounce(() => {
      fetchWeatherData(searchLocation);
    }, 1000);

    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [searchLocation]);

  return (
    <div>
      <Header onSearch={setSearchLocation} error={error} />
      <main>
        <WeatherDisplay {...weatherData} />

        {Boolean(recentSearches?.length > 1) && (
          <WeatherCardGrid
            header="Recent searches"
            cards={recentSearches.slice(1, 7)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
