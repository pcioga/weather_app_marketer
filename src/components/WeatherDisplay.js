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
    console.log("hello");
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,daily,alerts,minutely&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const info = data.current;
        setWeatherData({
          weather: info.weather[0].main,
          icon: info.weather[0].icon,
          description: info.weather[0].description,
          temperature: info.temp,
          humidity: info.humidity,
          windSpeed: info.wind_speed,
        });
      })
      .catch((error) => console.error("Error fetching weather:", error));
  }, []);

  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.icon}@4x.png`;

  return (
    <main>
      <div className="display--main">
        <img className="display--icon" src={iconUrl}></img>
        <p>Temperature: {Math.round(weatherData.temperature)}°C</p>
        <p>Conditions: {weatherData.description}</p>
        <p>Humidity: {weatherData.humidity}%</p>
        <p>Wind Speed: {weatherData.windSpeed} m/s</p>
      </div>
    </main>
  );
}
