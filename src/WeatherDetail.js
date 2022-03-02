import { Card, Typography } from "@mui/material";

const WeatherDetail = (props) => {
  const { cityWeather } = props;

  if (cityWeather === null) {
    return (
      <Typography variant="body1" component="p">
        Please search for any city's weather.
      </Typography>
    );
  }

  if (!cityWeather) {
    return (
      <Typography variant="body1" component="p">
        No Data Found.
      </Typography>
    );
  }

  const searchTime = new Date(cityWeather.datetime * 1000);
  return (
    <Card>
      <Typography variant="subtitle1" component="label" gutterBottom>
        {`${cityWeather.city},${cityWeather.country}`}
      </Typography>
      <Typography variant="h4" component="h4" fontWeight="bold" gutterBottom>
        {cityWeather.title}
      </Typography>

      <Typography variant="body1" component="p" gutterBottom>
        {`Decscription: ${cityWeather.description}`}
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        {`Temperature: ${cityWeather.temp_min} ~ ${cityWeather.temp_max}`}
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        {`Humidity: ${cityWeather.humidity}%`}
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        {`Time: ${searchTime.toLocaleString()}`}
      </Typography>
    </Card>
  );
};

export default WeatherDetail;
