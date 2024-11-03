import React, { useState, useEffect } from "react";

export default function WeatherCardGrid({ cardData }) {
  return (
    <div>
      {cardData.map((card) => {
        return <WeatherCard {...card} key={card.city} />;
      })}
    </div>
  );
}

function WeatherCard({
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
  );
}
