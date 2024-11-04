import React, { useState, useEffect } from "react";

import "./WeatherDisplay.css";

export default function WeatherDisplay({
  icon,
  description,
  humidity,
  temperature,
  windSpeed,
  city,
  country,
}) {
  return (
    <div className="weather-display">
      <div className="details">
        <h1>
          {city}, {country}
        </h1>
        <p>Temperature: {Math.round(temperature)}°C</p>
        <p>Conditions: {description}</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind Speed: {windSpeed} m/s</p>
      </div>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
        alt={description}
      />
    </div>
  );
}
