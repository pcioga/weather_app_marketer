import React from "react";
import logo from "../logo.svg";

export default function WeatherDisplay() {
  return (
    <main>
      <div className="display--main">
        <div className="display--city">Current City</div>
        <img className="display--icon" src={logo}></img>
      </div>
    </main>
  );
}
