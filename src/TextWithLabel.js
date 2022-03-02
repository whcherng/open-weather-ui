import { Grid } from "@mui/material";
import { Typography } from "@mui/material";

const TextWithLabel = (props) => {
  const { label, value } = props;
  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={12} sm>
        <Typography variant="body1" component="label" gutterBottom>
          {label}:
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography variant="body1" component="p" gutterBottom>
          {value}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default TextWithLabel;
