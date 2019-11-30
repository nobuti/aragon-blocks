import React, { useContext } from "react";
import PropTypes from "prop-types";

import { MetamaskContext } from "./Metamask";

const Custodian = ({ children }) => {
  const { error, loading } = useContext(MetamaskContext);
  console.log(error, loading);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return children;
};

Custodian.propTypes = {
  children: PropTypes.node.isRequired
};

export default Custodian;
