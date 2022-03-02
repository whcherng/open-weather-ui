import { CircularProgress, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import WbSunnyTwoToneIcon from "@mui/icons-material/WbSunnyTwoTone";

const GeneralNotifier = (props) => {
  const { purpose } = props;

  if (purpose === "introduction") {
    return (
      <Grid
        container
        sx={{ minWidth: "100px", height: "200px" }}
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Grid item>
          <WbSunnyTwoToneIcon color="primary" sx={{ fontSize: 110 }} />
        </Grid>
        <Grid item>
          <Typography
            variant="body1"
            component="p"
            gutterBottom
            fontWeight="bold"
          >
            Please search for any city's weather.
          </Typography>
        </Grid>
      </Grid>
    );
  }

  if (purpose === "showNotFound") {
    return (
      <Grid
        container
        sx={{ minWidth: "100px", height: "200px" }}
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Grid item>
          <ErrorOutlineOutlinedIcon color="primary" sx={{ fontSize: 100 }} />
        </Grid>
        <Grid item>
          <Typography variant="body1" component="p" gutterBottom>
            Data Not Found
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid
      container
      sx={{ minWidth: "100px", height: "200px" }}
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Grid item>
        <CircularProgress />
      </Grid>
      <Grid item>
        {" "}
        <Typography variant="body1" component="p" gutterBottom>
          Getting weather out there....
        </Typography>
      </Grid>
    </Grid>
  );
};

export default GeneralNotifier;
