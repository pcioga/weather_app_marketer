import React, { useState, useEffect } from "react";
import debounce from "lodash/debounce";

export default function Header() {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const [searchLocation, setSearchLocation] = useState("");

  const [weatherData, setWeatherData] = useState({
    weather: "",
    description: "",
    icon: "",
    temperature: "",
    humidity: "",
    windSpeed: "",
  });

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchLocation(value);
    console.log(searchLocation);
  };

  const fetchWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&units=metric&appid=${apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const weather_data = data.weather[0];
        setWeatherData({
          weather: weather_data.main,
          description: weather_data.description,
          icon: weather_data.icon,
          temperature: data.main.temp,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
        });
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    console.log("Fetching weather for:", searchLocation);
    if (searchLocation < 3) return;

    const debouncedFetch = debounce(fetchWeather, 1000);
    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [searchLocation]);

  return (
    <header className="header">
      <h2 className="header--title">How's the weather?</h2>
      <input
        className="header--search"
        type="text"
        placeholder="Search"
        name="citySearch"
        value={searchLocation}
        onChange={handleSearch}
      />
    </header>
  );
}
