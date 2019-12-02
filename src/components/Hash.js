import React from "react";
import styled from "styled-components";

const Badge = styled.div`
  display: inline-flex;
  border-radius: 4px;
  background-color: #eee;
  padding: 2px 4px;
  font-family: monospace;
`;

const Transaction = ({ hash }) => {
  const short = hash
    ? [hash.substring(0, 6), `...`, hash.substr(-4)].join("")
    : `Invalid transaction`;
  return <Badge title={hash || short}>{short}</Badge>;
};

export default Transaction;
