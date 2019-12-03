import React from "react";
import { createGlobalStyle } from "styled-components";
import reset from "@nobuti/styled-reset";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import posed, { PoseGroup } from "react-pose";

import { Metamask } from "./components/Metamask";
import RestrictedRoute from "./components/RestrictedRoute";
import Layout from "./components/Layout";
import { Home, Block } from "./pages";

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  body {
    background-color: rgb(249, 250, 252);
    font-family: system-ui, sans-serif;
    font-weight: 400;
  }

  a {
    color: #f0a;
  }
`;

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 500, beforeChildren: true },
  exit: { opacity: 0 }
});

function App() {
  return (
    <>
      <GlobalStyle />
      <Metamask>
        <BrowserRouter>
          <Route
            render={({ location }) => (
              <Layout>
                <PoseGroup>
                  <RouteContainer key={location.pathname}>
                    <Switch location={location}>
                      <RestrictedRoute exact path="/" component={Home} />
                      <RestrictedRoute
                        exact
                        path="/block/:hash"
                        component={Block}
                      />
                    </Switch>
                  </RouteContainer>
                </PoseGroup>
              </Layout>
            )}
          />
        </BrowserRouter>
      </Metamask>
    </>
  );
}

export default App;
