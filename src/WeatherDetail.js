import { Card, CardContent, Typography } from "@mui/material";
import TextWithLabel from "./TextWithLabel";
import GeneralNotifier from "../src/GeneralNotifier";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("../src/Map"), {
  ssr: false,
});

const WeatherDetail = (props) => {
  const { cityWeather } = props;

  if (cityWeather === null) {
    return <GeneralNotifier purpose="introduction" />;
  }

  if (!cityWeather) {
    return <GeneralNotifier purpose="showNotFound" />;
  }

  const searchTime = new Date(cityWeather.datetime * 1000);
  return (
    <Card>
      <CardContent sx={{ color: "text.white" }}>
        <Typography variant="subtitle1" component="label" gutterBottom>
          {`${cityWeather.city}, ${cityWeather.country}`}
        </Typography>
        <Typography variant="h4" component="h4" fontWeight="bold" gutterBottom>
          {cityWeather.title}
        </Typography>
        <TextWithLabel label="Description" value={cityWeather.description} />
        <TextWithLabel
          label="Temperature"
          value={`${cityWeather.temp_min} ~ ${cityWeather.temp_max}`}
        />
        <TextWithLabel label="Humidity" value={`${cityWeather.humidity}%`} />
        <TextWithLabel label="Time" value={searchTime.toLocaleString()} />

        <MapWithNoSSR lat={cityWeather.lat} lon={cityWeather.lon} />
      </CardContent>
    </Card>
  );
};

export default WeatherDetail;
