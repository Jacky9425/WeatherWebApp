import React, { useState } from "react";
import moment from "moment";
import { message } from "antd";
import { format, GetWeather } from "../constants";

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

    GetWeather(city, country)
      .then((res) => {
        const { name } = res;

        setLoading(false);
        setWeatherError(false);

        if (Object.keys(obj).length > 0) {
          addHistory(obj);
        }

        setWeatherData({
          name,
          country: res.sys.country,
          humidity: res.main.humidity,
          temp_min: res.main.temp_min,
          temp_max: res.main.temp_max,
          main: res.weather[0].main,
          description: res.weather[0].description,
          time: moment().format(format),
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
