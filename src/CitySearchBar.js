import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
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
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={4} lg={4}>
        <TextField
          id="outlined-basic"
          label="City"
          variant="outlined"
          value={city}
          onChange={handleCityTextChange}
        />
      </Grid>
      <Grid item xs={12} md={8} lg={4}>
        <TextField
          id="outlined-basic"
          label="Country"
          variant="outlined"
          value={country}
          onChange={handleCountryTextChange}
        />
      </Grid>
      <Grid item xs={12} md={2} lg={2}>
        <Button
          disabled={loading || (city === "" && country === "")}
          variant="contained"
          onClick={searchNow}
        >
          Search
        </Button>
      </Grid>
      <Grid item xs={12} md={10} lg={2}>
        <Button
          disabled={loading || (city === "" && country === "")}
          variant="text"
          onClick={clearText}
        >
          Clear
        </Button>
      </Grid>
    </Grid>
  );
};

export default CitySearchBar;
