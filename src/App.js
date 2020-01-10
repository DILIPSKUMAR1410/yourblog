import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./views/home";
import Dashboard from "./views/dashboard";
import Create from "./views/create";
import View from "./views/view";
import Entries from "./views/entries";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/create" component={Create} />
        <Route path="/view" component={View} />
        <Route path="/entries" component={Entries} />
      </Router>
    </div>
  );
}

export default App;
