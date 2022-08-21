import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import ScreenOne from "./screens/ScreenOne";
import ScreenTwo from "./screens/ScreenTwo";
import LastScreen from "./screens/LastScreen";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <main className="App-body">
        <Router>
          <Switch>
            <Route exact path="/" component={ScreenOne} />
            <Route path="/screen2" component={ScreenTwo} />
            <Route path="/conclusion" component={LastScreen} />
          </Switch>
        </Router>
      </main>
      <footer className="App-footer">
        <a
          className="App-link"
          href="https://github.com/SebastienSalle"
          target="_blank"
          rel="noopener noreferrer"
        >
          coded with passion by Sébastien Sallé
        </a>
      </footer>
    </div>
  );
}

export default App;
