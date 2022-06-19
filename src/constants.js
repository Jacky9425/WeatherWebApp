const format = "YYYY-MM-DD hh:mm:ss A";

const apiKey = "0912e96288353db75b1127aa3fb4fe6a";

const GetWeather = (city, country) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`
    )
      .then((response) =>
        response.status === 200 ? response.json() : reject(response)
      )
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
};

export { format, GetWeather };
