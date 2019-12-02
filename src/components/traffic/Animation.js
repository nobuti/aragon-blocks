import React from "react";
import times from "lodash.times";
import styled, { keyframes, css } from "styled-components";

const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const Txs = styled.div``;
const Row = styled.div`
  overflow-wrap: normal;
  white-space: nowrap;
  width: ${props => props.width}px;
`;

const Sequence = styled.div`
  position: relative;
  width: ${props => props.width}px;
  display: inline-block;
  transform: translate3d(0, 0, 0);
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-duration: ${props => props.duration}s;
  animation-timing-function: ${props =>
    props.type === "even" ? "linear" : "ease-in-out"};
  animation-name: ${props =>
    props.type === "even" ? moveGenomeForwards : moveGenomeBackwards};
`;

const Item = styled.span`
  display: inline-block;
  height: 8px;
  border-radius: 8px;
  ${props => css`
    width: ${props.width}px;
    margin: ${props.margin};
    background: ${props.color};
  `};
`;

const Pattern = styled.span`
  ${props => css`
    margin: ${props.margin};
  `};
`;

const moveGenomeForwards = keyframes`
  from {
    transform: translate3d(0%, 0, 0);
  }
  to {
    transform: translate3d(-25%, 0, 0);
  }
`;
const moveGenomeBackwards = keyframes`
  from {
    transform: translate3d(-25%, 0, 0);
  }

  to {
    transform: translate3d(0%, 0, 0);
  }
`;

const CONFIG = {
  nPatterns: 10,
  barMinWidth: 20,
  barMaxWidth: 60,
  colors: ["#4a00e0", "#8e2de2", "#f0a"]
};

const Traffic = ({ rows, width }) => {
  const genSlots = rows => {
    return times(rows, genRow);
  };

  const genRow = index => {
    const { nPatterns } = CONFIG;

    const repeatPattern = times(nPatterns, patternIndex =>
      genPattern(patternIndex)
    );

    const type = index % 2 === 0 ? "even" : "odd";

    return (
      <Row key={`r${index}`} width={width}>
        <Sequence type={type} duration={randomNumber(5, 20)} width={width}>
          {repeatPattern}
        </Sequence>
      </Row>
    );
  };

  const genPattern = index => {
    return (
      <Pattern
        key={`p${index}`}
        margin={`0 ${randomNumber(2, 16)}px 0 ${randomNumber(2, 16)}px`}
      >
        {genSequence(index)}
      </Pattern>
    );
  };

  const genSequence = index => {
    const { barMaxWidth, barMinWidth, colors } = CONFIG;
    const width = randomNumber(barMinWidth, barMaxWidth);
    const color = colors[randomNumber(0, 2)];

    let props = {
      key: `s${index}`,
      width,
      margin: `0 ${randomNumber(0, 5)}px 0 ${randomNumber(0, 5)}px`,
      color
    };

    return <Item {...props} />;
  };

  return <Txs>{genSlots(rows)}</Txs>;
};

export default Traffic;
