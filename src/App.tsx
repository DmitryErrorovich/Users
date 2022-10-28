import React, { useState, useCallback, useMemo } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./navigation/router";
import "fontsource-roboto";
import { Provider } from "react-redux";
import { store } from "./stores/store";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import {
  Container,
  CssBaseline,
} from "@material-ui/core";
import {
  blueGrey,
  deepPurple,
  grey,
  red
} from "@material-ui/core/colors";
import AppTopBar from "components/AppTopBar";

const App = () => {
  const [darkState, setDarkState] = useState(JSON.parse(localStorage.getItem("dark_theme")));
  const palletType = darkState ? "dark" : "light";

  const mainPrimaryColor = useMemo(
    () => (darkState ? red[500] : blueGrey[600]),
    [darkState]
  );

  const mainSecondaryColor = useMemo(
    () => (darkState ? red[100] : deepPurple[500]),
    [darkState]
  );

  const darkTheme = createTheme({
    palette: {
      background: {
        default: darkState ? grey[900] : blueGrey[50]
      },
      type: palletType,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      }
    }
  });

  const handleThemeChange = useCallback(() => {
    localStorage.setItem("dark_theme", `${!darkState}`)
    setDarkState(!darkState);
  }, [setDarkState, darkState]);

  return (
    <MuiThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container className="App">
        <Provider store={store}>
          <BrowserRouter>
            <AppTopBar darkState={darkState} handleThemeChange={handleThemeChange} />
            <Router />
          </BrowserRouter>
        </Provider>
      </Container>
    </MuiThemeProvider>
  );
};

export default App;
