import axios from "axios";

export default function handler(req, res) {
  const getWeatherData = async (geoUrl) => {
    const request = {
      url: geoUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios(request);
    const geoData = response.data;

    if (response.status === 200 && geoData.length > 0) {
      const lat = geoData[0]?.lat;
      const lon = geoData[0]?.lon;
      if (lat === null || lon === null) {
        res.status(404).json({ message: "No Weather found." });
      }

      const weatherUrl = `${process.env.BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.APP_ID}`;
      const weatherRequest = {
        url: weatherUrl,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const weatherResponse = await axios(weatherRequest);

      const { cod } = weatherResponse.data;
      if (cod === 200) {
        const { main, weather, name, sys, dt, coord } = weatherResponse.data;
        const weatherData = {
          ...main,
          title: weather[0].main,
          description: weather[0].description,
          city: name,
          country: sys.country,
          datetime: dt,
          ...coord,
        };
        res.status(weatherResponse.status).json(weatherData);
      } else {
        res.status(cod).json({ message: weatherResponse.data.message });
      }
    } else {
      res.status(404).json({ message: "No Weather found." });
    }
  };

  const geoUrl = `${process.env.BASE_URL}/geo/1.0/direct?q=${req.query.city},${req.query.country}&appid=${process.env.APP_ID}`;
  if (req.method === "GET") {
    getWeatherData(geoUrl);
  }
}
