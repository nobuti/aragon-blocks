import React, { useRef } from "react";
import PropTypes from "prop-types";
import posed, { PoseGroup } from "react-pose";
import { Route, Switch, Link } from "react-router-dom";
import styled from "styled-components";

import { Header, Hero, Container, Hologram, Footer, Dataview } from "./layout";

const RouteContainer = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});

const Block = styled.span`
  color: #8e2de2;
`;

const Layout = ({ children }) => {
  const node = useRef();
  const smoothScroll = e => {
    e.preventDefault();
    node.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Hero.Main>
        <Container>
          <Header>CrytoBlocks</Header>
        </Container>

        <Container>
          <Hero.Content>
            <Hero.Left>
              <h2>
                We believe in and
                <br />
                fight for freedom
              </h2>
              <p>
                Monero managed some fundamental analysis after few dump. Someone
                accompanied by a raiden network, therefore, Litecoin stacks lots
                of minimum trustless for the wash trade. Silk Road could be many
                safe crypto-jacking because Augur stacks lots of quick node
                until the cryptocurrency, however, Binance Coin could be some
                address! Since!
              </p>

              <Hero.Action>
                <a onClick={smoothScroll} href="#table">
                  Start exploring transactions
                </a>
              </Hero.Action>
            </Hero.Left>

            <Hero.Right>
              <Hologram />
            </Hero.Right>
          </Hero.Content>
        </Container>
      </Hero.Main>
      <Container>
        <Dataview.Main>
          <Dataview.Claim id="dataview" ref={node}>
            <Route
              render={({ location }) => (
                <PoseGroup>
                  <RouteContainer key={location.pathname}>
                    <Switch location={location}>
                      <Route
                        exact
                        path="/"
                        render={() => (
                          <>
                            <h3>Ten blocks. No more no less</h3>
                            <p>Have fun exploring transactions. Since!</p>
                          </>
                        )}
                      />
                      <Route
                        exact
                        path="/block/:hash"
                        render={({ match }) => (
                          <>
                            <h3>
                              Here you have! The block{" "}
                              <Block>{match.params.hash}</Block>.
                            </h3>
                            <p>
                              Now <Link to="/">go back</Link> and keep exploring
                            </p>
                          </>
                        )}
                      />
                    </Switch>
                  </RouteContainer>
                </PoseGroup>
              )}
            />
          </Dataview.Claim>

          {children}
        </Dataview.Main>
      </Container>

      <Footer>
        Made with{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
        by nobuti.
      </Footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
