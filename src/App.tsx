import React, { useState, useCallback, useMemo } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./navigation/router";
import "fontsource-roboto";
import { Provider } from "react-redux";
import { store } from "./stores/store";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Container,
  CssBaseline,
  Switch,
  Typography
} from "@material-ui/core";
import {
  blueGrey,
  deepPurple,
  grey,
  red
} from "@material-ui/core/colors";

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

  const darkTheme = createMuiTheme({
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
      <AppBar>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Switch checked={darkState} onChange={handleThemeChange} />
          <Typography>Change theme</Typography>
        </div>
      </AppBar>
      <Container className="App">
        <Provider store={store}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Provider>
      </Container>
    </MuiThemeProvider>
  );
};

export default App;
