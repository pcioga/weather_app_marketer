import React, { useState, useEffect } from "react";

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
    <div>
      <div className="display--main">
        {city}, {country}
        <img
          className="display--icon"
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt={`${description}`}
        ></img>
        <p>Temperature: {Math.round(temperature)}°C</p>
        <p>Conditions: {description}</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind Speed: {windSpeed} m/s</p>
      </div>
    </div>
  );
}
