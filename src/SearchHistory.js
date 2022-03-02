import { Children } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import Divider from "@mui/material/Divider";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";

const SearchHistory = (props) => {
  const { history, setHistory, setCityWeather, setLoading } = props;

  const search = (historyItem) => {
    getWeather(historyItem.searchedCity, historyItem.searchedCountry);
  };

  const getWeather = async (city, country) => {
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
    } catch (error) {
      setCityWeather(false);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = (itemIndex) => {
    const newHistory = history.filter((_, index) => {
      return index !== itemIndex;
    });
    setHistory([...newHistory]);
    window.localStorage.setItem("history", JSON.stringify(newHistory));
  };

  if (history.length === 0) return <p>There is no search history</p>;
  return Children.toArray(
    history.map((historyItem, index) => {
      return (
        <>
          <Grid container columnSpacing={1} alignItems="center">
            <Grid xs={12} md={6} item>
              <Typography variant="body1" component="p" gutterBottom>
                {`${index + 1}. ${historyItem.city}, ${historyItem.country}`}
              </Typography>
            </Grid>
            <Grid xs={12} md={4} item>
              <Typography variant="body1" component="p" gutterBottom>
                {`${historyItem.searchTime}`}
              </Typography>
            </Grid>
            <Grid xs={1} item>
              <IconButton
                onClick={() => {
                  search(historyItem);
                }}
                aria-label="delete"
                color="primary"
              >
                <SearchIcon />
              </IconButton>
            </Grid>
            <Grid xs={1} item>
              <IconButton
                onClick={() => {
                  deleteItem(index);
                }}
                aria-label="delete"
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Divider />
        </>
      );
    })
  );
};

export default SearchHistory;
