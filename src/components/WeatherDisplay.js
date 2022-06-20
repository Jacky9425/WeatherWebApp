import React from "react";
import { Typography } from "antd";
import { useAppContext } from "../contexts/appContext";
import InfoContainer from "./InfoContainer";
import { WeatherIconURL } from "../constants";

const { Text } = Typography;

// component for each line of details of weather
function WeatherDetails({ label, value }) {
  const { mobileView } = useAppContext();
  return (
    <div style={styles.details(mobileView)}>
      <div style={styles.detailsLabel(mobileView)}>
        <Text>{label}:</Text>
      </div>

      <Text strong>{value}</Text>
    </div>
  );
}

// Display component for the obtained weather
function WeatherDisplay(props) {
  const { weatherData, loading, weatherError } = useAppContext();

  const {
    name,
    country,
    description,
    humidity,
    main,
    temp_min,
    temp_max,
    time,
    icon,
  } = weatherData;

  const details_data = [
    {
      label: "Description",
      value: description,
    },
    {
      label: "Temperature",
      value: (
        <Text>
          {temp_min}&#176;C ~ {temp_max}&#176;C
        </Text>
      ),
    },
    {
      label: "Humidity",
      value: `${humidity}%`,
    },
    {
      label: "Time",
      value: time,
    },
  ];

  return Object.keys(weatherData).length > 0 ? (
    <div style={styles.container}>
      <Text style={styles.cityCountry}>
        {name}, {country}
      </Text>

      <div style={styles.rowFlex}>
        <h1>{main}</h1>

        <img
          src={`${WeatherIconURL}${icon}.png`}
          width={45}
          height={45}
          style={styles.iconImg}
        />
      </div>

      {details_data.map((detail, index) => (
        <WeatherDetails key={index} label={detail.label} value={detail.value} />
      ))}

      <InfoContainer condition_loading={loading} />
    </div>
  ) : (
    <Text>Please insert city and country to check weather.</Text>
  );
}

export default WeatherDisplay;

const styles = {
  rowFlex: {
    display: "flex",
    flexDirection: "row",
  },
  cityCountry: {
    fontSize: 18,
    color: "gray",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    padding: 15,
  },
  details: (mobileView) => ({
    display: "flex",
    flexDirection: mobileView ? "column" : "row",
    marginBottom: 3,
  }),
  detailsLabel: (mobileView) => ({
    width: mobileView ? "50vw" : "10vw",
  }),
  iconImg: {
    backgroundColor: "rgba(89,89,89,0.3)",
    marginLeft: 15,
    borderRadius: 40,
    padding: 3,
  },
};
