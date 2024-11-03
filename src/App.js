import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import WeatherDisplay from "./components/WeatherDisplay";
import debounce from "lodash/debounce";
import "./App.css";

function App() {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  // defaults to NY
  const [location, setLocation] = useState({
    city: "New York",
    country: "US",
  });

  const [weatherData, setWeatherData] = useState({
    weather: "",
    description: "",
    icon: "",
    temperature: "",
    humidity: "",
    windSpeed: "",
  });

  const [searchLocation, setSearchLocation] = useState(null);

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
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
    fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setLocation({
          city: data[0].name,
          country: data[0].country,
        });
      })
      .catch((error) => console.error("Error openweather API:", error));

    fetchWeather(location.city);
  };

  const fetchWeather = (city) => {
    console.log(city);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const weather_data = data.weather[0];
        console.log(data);
        setWeatherData({
          weather: weather_data.main,
          description: weather_data.description,
          icon: weather_data.icon,
          temperature: data.main.temp,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
        });
        setLocation({
          city: data.name,
          country: data.sys.country,
        });
      })
      .catch((error) => console.error("Error fetching weather:", error));
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    console.log("Fetching weather for:", searchLocation);
    if (searchLocation < 3) return;

    const debouncedFetch = debounce(() => fetchWeather(searchLocation), 1000);
    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [searchLocation]);

  return (
    <div>
      <Header onSearch={setSearchLocation} />
      <div className="main--city">
        {location.city}, {location.country}
      </div>
      <WeatherDisplay {...weatherData} />
    </div>
  );
}

export default App;
