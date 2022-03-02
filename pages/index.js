import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CitySearchBar from "../src/CitySearchBar";
import WeatherDetail from "../src/WeatherDetail";
import SearchHistory from "../src/SearchHistory";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

export default function Index() {
  const [cityWeather, setCityWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const cachedHistory =
      JSON.parse(window.localStorage.getItem("history")) || [];
    setHistory(cachedHistory);
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }} component="form">
        <Typography variant="h4" component="h1" gutterBottom>
          Today's Weather
        </Typography>
        <CitySearchBar
          loading={loading}
          setLoading={setLoading}
          setCityWeather={setCityWeather}
          history={history}
          setHistory={setHistory}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <WeatherDetail cityWeather={cityWeather} />
        )}

        <Typography variant="h4" component="h1" gutterBottom>
          Search History
        </Typography>
        <SearchHistory
          setCityWeather={setCityWeather}
          setLoading={setLoading}
          history={history}
          setHistory={setHistory}
        />
      </Box>
    </Container>
  );
}
