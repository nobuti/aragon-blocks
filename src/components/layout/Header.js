import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
`;

const H1 = styled.h1`
  font-size: 14px;
  font-weight: 700;
  color: white;
`;

const Header = ({ children }) => {
  return (
    <Container>
      <H1>{children}</H1>
    </Container>
  );
};

Header.propTypes = {
  children: PropTypes.node.isRequired
};

export default Header;
