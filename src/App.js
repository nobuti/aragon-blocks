import React from "react";
import { createGlobalStyle } from "styled-components";
import reset from "@nobuti/styled-reset";
import { BrowserRouter, Switch } from "react-router-dom";

import { Metamask } from "./components/Metamask";
import Route from "./components/RestrictedRoute";
import Layout from "./components/Layout";
import { Home, Block, Transaction } from "./pages";

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  body {
    background-color: rgb(249, 250, 252); /*#e3e7ee;*/
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 400;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Metamask>
        <Layout>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/block/:hash" component={Block} />
              <Route exact path="/transaction/:hash" component={Transaction} />
            </Switch>
          </BrowserRouter>
        </Layout>
      </Metamask>
    </>
  );
}

export default App;
