const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
const mapApiKey = process.env.REACT_APP_MAP_API_KEY;

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
    console.error(error);
    return { error: "Error: Unable to get user location" };
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
    console.error(error);
    return { error: "Error openweather API" };
  }
};

export const getWeather = async (city) => {
  try {
    const query = city.split(",");
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query[0]}&units=metric&appid=${apiKey}`
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
    console.error(error);
    return {
      error: `Error: couldn't find weather for "${city}"`,
    };
  }
};

export const fetchPlace = async (text) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${mapApiKey}&cachebuster=1625641871908&autocomplete=true&types=place`
    );
    return response.json();
  } catch (error) {
    return { error: "Unable to retrieve places" };
  }
};
