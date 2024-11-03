const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

export const getUserLocation = async () => {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const { latitude, longitude } = position.coords;
    getLocationName(latitude, longitude);

    const location = await getLocationName(latitude, longitude);
    if (location) {
      return location;
    }
  } catch (error) {
    console.log("Unable to get location");
  }
};

export const getLocationName = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
    );
    const data = await response.json();
    return {
      city: data[0].name,
      country: data[0].country,
    };
  } catch (error) {
    console.error("Error openweather API:", error);
  }
};

export const getWeather = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const data = await response.json();
    const weather_data = data.weather[0];
    return {
      weather: weather_data.main,
      description: weather_data.description,
      icon: weather_data.icon,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      city: data.name,
      country: data.sys.country,
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
};
