import React, { useState, useEffect } from "react";

export default function WeatherDisplay({ lat, lon }) {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const [weatherData, setWeatherData] = useState({
    weather: "",
    description: "",
    icon: "",
    temperature: "",
    humidity: "",
    windSpeed: "",
  });

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,daily,alerts,minutely&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const weather_data = data.current;
        setWeatherData({
          weather: weather_data.weather[0].main,
          icon: weather_data.weather[0].icon,
          description: weather_data.weather[0].description,
          temperature: weather_data.temp,
          humidity: weather_data.humidity,
          windSpeed: weather_data.wind_speed,
        });
      })
      .catch((error) => console.error("Error fetching weather:", error));
  }, []);

  return (
    <main>
      <div className="display--main">
        <img
          className="display--icon"
          src={`https://openweathermap.org/img/wn/${weatherData.icon}@4x.png`}
          alt={`icon for ${weatherData.description}`}
        ></img>
        <p>Temperature: {Math.round(weatherData.temperature)}°C</p>
        <p>Conditions: {weatherData.description}</p>
        <p>Humidity: {weatherData.humidity}%</p>
        <p>Wind Speed: {weatherData.windSpeed} m/s</p>
      </div>
    </main>
  );
}
