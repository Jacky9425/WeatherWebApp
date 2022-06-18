import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Button, message } from "antd";
import SearchHistory from "../../components/SearchHistory.js";
import { useAppContext } from "../../contexts/appContext.js";
import moment from "moment";
import WeatherDisplay from "../../components/WeatherDisplay.js";
import CustomInput from "../../components/CustomInput.js";

function MainApp(props) {
  const {
    history,
    fetchWeather,
    loading,
    handleResize,
    weatherError,
    mobileView,
  } = useAppContext();

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    fetchWeather();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onClearInput = () => {
    setCity("");
    setCountry("");
  };

  const onSearch = () => {
    if (city === "" || country === "") {
      message.warn("Please fill in all the fields.");
      return;
    }

    fetchWeather(city, country, {
      id: history.length + 1,
      city,
      country,
      dateTime: moment(),
    });
  };

  return (
    <div style={styles.container}>
      <h2>Today's Weather</h2>

      <div style={styles.divider} />

      <div style={styles.header(mobileView)}>
        <CustomInput
          label={"City"}
          status={weatherError && "error"}
          value={city}
          onChange={(e) => setCity(e.target.value.toUpperCase())}
        />

        <CustomInput
          label={"Country"}
          status={weatherError && "error"}
          value={country}
          onChange={(e) => setCountry(e.target.value.toUpperCase())}
        />

        <Button
          type="primary"
          style={{
            ...(mobileView ? styles.searchBtnMobile : styles.searchBtn),
            ...styles.btn,
          }}
          onClick={onSearch}
          loading={loading}
        >
          Search
        </Button>

        <Button type="primary" style={styles.btn} onClick={onClearInput}>
          Clear
        </Button>
      </div>

      <WeatherDisplay />

      <SearchHistory />
    </div>
  );
}

export default MainApp;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: 18,
  },
  divider: {
    height: 2,
    backgroundColor: "black",
    width: "100%",
    marginBottom: 15,
  },
  header: (mobileView) => ({
    display: "flex",
    flexDirection: mobileView ? "column" : "row",
  }),
  btn: {
    borderRadius: 4,
  },
  searchBtn: {
    marginRight: 10,
  },
  searchBtnMobile: {
    marginTop: 10,
    marginBottom: 10,
  },
};
