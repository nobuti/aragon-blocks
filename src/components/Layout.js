import React, { useRef } from "react";
import PropTypes from "prop-types";

import { Header, Hero, Container, Hologram, Footer, Dataview } from "./layout";
import Traffic from "./traffic";

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
          <Traffic />

          <Dataview.Claim id="dataview" ref={node}>
            <h3>Ten blocks. No more no less</h3>
            <p>Have fun exploring transactions. Since!</p>
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
