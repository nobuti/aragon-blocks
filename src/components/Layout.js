import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  position: relative;
`;

const Inner = styled.div`
  max-width: 600px;
  margin: 64px auto 48px;
`;

const Title = styled.h1`
  color: #001c3e;
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
  text-align: center;
`;

const Layout = ({ children }) => (
  <Container>
    <Inner>
      <Title>
        We believe in and
        <br />
        fight for freedom
      </Title>
      {children}
    </Inner>
  </Container>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
