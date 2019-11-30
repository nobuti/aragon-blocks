import React from "react";

import { Metamask } from "./components/Metamask";
import Custodian from "./components/Custodian";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <Metamask>
      <Custodian>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </Custodian>
    </Metamask>
  );
}

export default App;
