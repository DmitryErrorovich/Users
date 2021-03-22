import React, {useState, useCallback} from 'react'
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Router} from "./navigation/router";
import 'fontsource-roboto';
import { Provider } from "react-redux";
import {store} from "./stores/store";
import {ThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import {Switch} from "@material-ui/core";

const App = () => {

    const [darkState, setDarkState] = useState(false);
    const palletType = darkState ? "dark" : "light";
    const darkTheme = createMuiTheme({
        palette: {
            type: palletType,
        }
    });
    const handleThemeChange = useCallback(() => {
        setDarkState(!darkState);
    }, [setDarkState, darkState]);
  return (
      <ThemeProvider theme={darkTheme}>
    <div className="App">
        <Provider store={store}>
      <BrowserRouter>
          <Switch checked={darkState} onChange={handleThemeChange} />
        <Router />
      </BrowserRouter>
        </Provider>
    </div>
      </ThemeProvider>
  );
}

export default App;
