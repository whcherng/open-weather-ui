import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const CitySearchBar = (props) => {
  const { setCityWeather, loading, setLoading, history, setHistory } = props;
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const clearText = () => {
    setCountry("");
    setCity("");
  };

  const getWeather = async () => {
    setLoading(true);
    try {
      const request = {
        url: `api/weather?city=${city}&country=${country}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios(request);
      setCityWeather(response.data);
      const { datetime } = response.data;
      const searchTime = new Date(datetime * 1000).toLocaleString();
      const newHistory = [
        ...history,
        {
          city: response.data.city,
          country: response.data.country,
          searchTime,
          //searched city and country might be different from the response city and country
          // E.g. searched Tawau, return Tawao
          // will be used in search history list.
          searchedCity: city,
          searchedcountry: country,
        },
      ];

      window.localStorage.setItem("history", JSON.stringify(newHistory));
      setHistory([...newHistory]);
    } catch (error) {
      setCityWeather(false);
    } finally {
      setLoading(false);
    }
  };

  const searchNow = () => {
    getWeather();
  };

  const handleCountryTextChange = (e) => {
    setCountry(e.target.value);
  };
  const handleCityTextChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <>
      <TextField
        id="outlined-basic"
        label="City"
        variant="outlined"
        value={city}
        onChange={handleCityTextChange}
      />
      <TextField
        id="outlined-basic"
        label="Country"
        variant="outlined"
        value={country}
        onChange={handleCountryTextChange}
      />
      <Button
        disabled={loading || (city === "" && country === "")}
        variant="contained"
        onClick={searchNow}
      >
        Search
      </Button>
      <Button
        disabled={loading || (city === "" && country === "")}
        variant="text"
        onClick={clearText}
      >
        Clear
      </Button>
    </>
  );
};

export default CitySearchBar;
