import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import MainWeatherCard from "./components/mainweathercard";
import FiveDayForecast from "./components/fiveday";
import TodayHighlights from "./components/todayhighlights";

import axios from "axios";

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("London");
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const fetchAirQualityData = (lat, lon) => {
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )
      .then((response) => {
        setAirQualityData(response.data.list[0]);
      })
      .catch((error) =>
        console.error("Error fetching air quality:", error)
      );
  };

  const fetchWeatherData = (city, lat = null, lon = null) => {
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

    const url =
      lat !== null && lon !== null
        ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        : `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (Number(data.cod) !== 200) {
          alert(data.message);
          return;
        }

        setWeatherData(data);

        fetchAirQualityData(data.coord.lat, data.coord.lon);

        axios
          .get(
            lat !== null && lon !== null
              ? `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
              : `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
          )
          .then((response) => {
            setFiveDayForecast(response.data);
          });
      })
      .catch(console.error);
  };

  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#111827",
        overflow: "hidden",
      }}
    >
      <Navbar
        onSearch={handleSearch}
        onCurrentLocation={(lat, lon) => {
          fetchWeatherData("", lat, lon);
        }}
      />

      {weatherData && airQualityData && (
        <div
          style={{
            maxWidth: "1350px",
            margin: "0 auto",
            padding: "20px",
            display: "flex",
            gap: "40px",
            alignItems: "stretch",
            flex: 1,
            overflow: "hidden",
            boxSizing: "border-box",
            width: "100%"
          }}
        >
          {/* Left Side */}
          <div
            style={{
              width: "350px",
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <MainWeatherCard weatherData={weatherData} />

            <h2
              style={{
                marginTop: "25px",
                marginBottom: "15px",
                fontSize: "28px",
                fontWeight: "700",
                color: "white"
              }}
            >
              5 Days Forecast
            </h2>

            {fiveDayForecast && (
              <FiveDayForecast forecastData={fiveDayForecast} />
            )}
          </div>

          {/* Right Side */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <TodayHighlights
              weatherData={weatherData}
              airQualityData={airQualityData}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;