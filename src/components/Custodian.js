import { useContext } from "react";
import PropTypes from "prop-types";

import { MetamaskContext } from "./Metamask";

const Custodian = ({ children }) => {
  const { error, loading } = useContext(MetamaskContext);
  return children({ loading, error });
};

Custodian.propTypes = {
  children: PropTypes.node.isRequired
};

export default Custodian;
