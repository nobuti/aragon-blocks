import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import "styled-components/macro";

const bounce = keyframes`
  0%, 100% { 
    transform: scale(0.0);
  } 
  50% { 
    transform: scale(1.0);
  }
`;

const LoadingIndicator = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  position: relative;

  &:after,
  &:before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${props => props.color};
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    animation: ${bounce} 2s infinite ease-in-out;
  }

  &:after {
    animation-delay: -1s;
  }
`;

LoadingIndicator.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number
};

LoadingIndicator.defaultProps = {
  color: "#4a00e0",
  size: 48
};

const Loading = () => (
  <div
    css={`
      padding: 32px;
      display: flex;
      justify-content: center;
    `}
  >
    <LoadingIndicator />
  </div>
);

export default Loading;
