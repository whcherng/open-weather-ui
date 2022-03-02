import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CitySearchBar from "../src/CitySearchBar";
import WeatherDetail from "../src/WeatherDetail";
import SearchHistory from "../src/SearchHistory";
import { useEffect, useState } from "react";
import GeneralNotifier from "../src/GeneralNotifier";
import { Grid } from "@mui/material";

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
    <Container maxWidth="md" sx={{ paddingTop: "16px" }}>
      <Grid container spacing={3} direction="column">
        <Grid item>
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
        </Grid>
        <Grid item>
          {loading ? (
            <GeneralNotifier />
          ) : (
            <WeatherDetail cityWeather={cityWeather} />
          )}
        </Grid>
        <Grid item>
          <Typography variant="h4" component="h4" gutterBottom>
            Search History
          </Typography>
          <SearchHistory
            setCityWeather={setCityWeather}
            setLoading={setLoading}
            history={history}
            setHistory={setHistory}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
