import React from 'react'
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Router} from "./navigation/router";
import 'fontsource-roboto';
import { Provider } from "react-redux";
import {store} from "./stores/store";

function App() {
  return (
    <div className="App">
        <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
        </Provider>
    </div>
  );
}

export default App;
