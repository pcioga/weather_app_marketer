import React from "react";
import logo from "../logo.svg";

export default function WeatherDisplay(props) {
  return (
    <main>
      <div className="display--main">
        {props.lat} | {props.lon}
        <div className="display--city">
          {props.city}, {props.country}
        </div>
        <img className="display--icon" src={logo}></img>
      </div>
    </main>
  );
}
