import React from "react";
import styled from "styled-components";

import Animation from "./Animation";

const Container = styled.div`
  position: absolute;
  height: ${18 * 6}px;
  top: 0;
  left: 50%;
  transform: translate(-50%, 64px);
  max-width: 600px;
  width: 100%;
  overflow: hidden;
  opacity: 0.4;
`;

const Blur = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    rgba(249, 250, 252, 0.4) 0%,
    rgba(249, 250, 252, 1) 65%
  );
  z-index: 2;
`;

const Traffic = () => (
  <Container>
    <Blur />
    <Animation width={600} rows={6} />
  </Container>
);

export default Traffic;
