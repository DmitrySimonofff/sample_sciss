import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "../components";
import { Home, Cabinet, Mint } from "../pages";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import style from "../index.css";

const theme = createTheme({
  palette: {
    primary: {
      main: '#2B5A4D',
    },
  },
  typography: {
    fontFamily: [
      "Sequel",
      'sans-serif'
    ].join(','),
    body1: {
      fontFamily: 'Avenir, sans-serif'
    },
    body2: {
      fontFamily: 'Avenir, sans-serif'
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: style,
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true
      }
    }
  }
});

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/cabinet" exact element={<Cabinet />} />
          <Route path="/mint" exact element={<Mint />} />
          <Route element={<Home />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
