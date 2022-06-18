import React, { useState } from "react";
import moment from "moment";
import { message } from "antd";
import { format, GetGeocoding, GetWeather } from "../constants";

const AppContext = React.createContext(null);

export const useAppContext = () => React.useContext(AppContext);

function AppContextProvider(props) {
  const { children } = props;

  const [mobileView, setMobileView] = useState(window.innerWidth < 900);
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(false);
  const [history, setHistory] = useState([
    {
      id: 1,
      city: "IPOH",
      country: "MY",
      dateTime: moment(),
    },
  ]);

  const handleResize = () => {
    setMobileView(window.innerWidth < 960);
  };

  // main function to fetch the weather, default to ipoh, MY
  const fetchWeather = (city = "ipoh", country = "malaysia", obj = {}) => {
    setLoading(true);

    // get latitude and longitude of city
    GetGeocoding(city, country)
      .then((res) => {
        const { lat, lon, name, country } = res[0];

        if (Object.keys(obj).length > 0) {
          addHistory({
            ...obj,
            lat,
            lon,
          });
        }

        // pass the value to fetch weather
        GetWeather(lat, lon).then((weather_res) => {
          setLoading(false);
          setWeatherError(false);
          setWeatherData({
            name,
            country,
            humidity: weather_res.main.humidity,
            temp_min: weather_res.main.temp_min,
            temp_max: weather_res.main.temp_max,
            main: weather_res.weather[0].main,
            description: weather_res.weather[0].description,
            time: moment().format(format),
          });
        });
      })
      .catch((e) => {
        setLoading(false);
        setWeatherError(true);
        message.warn(
          "Something went wrong, please ensure the location is correct."
        );
      });
  };

  const addHistory = (payload) => {
    setHistory((prev) => [...prev, payload]);
  };

  const deleteHistory = (index) => {
    const temp = [...history];
    temp.splice(index, 1);
    setHistory(temp);
  };

  let data = {
    history,
    weatherData,
    loading,
    weatherError,
    mobileView,
    handleResize,
    fetchWeather,
    setWeatherData,
    addHistory,
    deleteHistory,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}
export default AppContextProvider;
