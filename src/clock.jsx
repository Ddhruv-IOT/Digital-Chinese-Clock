import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./Clock.css";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);

    // Fetch weather data
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=YOUR_CITY&appid=YOUR_API_KEY&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => console.log(error));

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num) => (num < 10 ? `0${num}` : num.toString());

  const getChineseNumber = (num) => {
    const chineseNums = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    return num
      .toString()
      .split("")
      .map((digit) => chineseNums[parseInt(digit)])
      .join("");
  };

  const hours = (getChineseNumber(formatTime(time.getHours())));
  const minutes = getChineseNumber(formatTime(time.getMinutes()));
  const seconds = getChineseNumber(formatTime(time.getSeconds()));
  const day = time.toLocaleDateString("zh-CN", { weekday: "long" });
  const date = time.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="full-page">
      <div className="clock-container">
        <div className="time">
          {hours}:{minutes}:<span className="seconds">{seconds}</span>
        </div>
        <div className="day-date">
          <div>{day}</div>
          <div>{date}</div>
        </div>
        {weather && (
          <div className="weather">
            <div>{weather.name}</div>
            <div>{Math.round(weather.main.temp)}°C</div>
            <div>{weather.weather[0].description}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clock;