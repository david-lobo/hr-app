import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Home from "./Home";

axios.defaults.baseURL = "http://127.0.0.1:8000/api";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
