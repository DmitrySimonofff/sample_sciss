import React from "react";
import Choice from "../Choice";
import { Grid, Typography } from "@mui/material";

const Main = () => {
  return (
    <Grid container textAlign={'center'}>
      <Grid item xs={12} py={9}>
        <Typography variant="h1" gutterBottom sx={{
          fontSize: '96px',
          lineHeight: '114.8%',
          textAlign: 'center',
          textTransform: 'capitalize',
          backgroundImage: 'linear-gradient(90deg, #9C480B -2.37%, #FCB853 51.6%, #BF590F 97.95%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '400',
          typography: { xs: 'h4', sm: 'h3', md: 'h1' }
        }}>
          Make a choice
        </Typography>
      </Grid>
      <Choice />
    </Grid>
  );
};

export default Main;
