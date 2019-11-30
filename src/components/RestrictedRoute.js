import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

import { MetamaskContext } from "./Metamask";
import Loading from "./Loading";

const RestrictedRoute = ({ component, ...options }) => {
  const { web3 } = useContext(MetamaskContext);
  const finalComponent = web3 ? component : () => <Loading />;

  return <Route {...options} component={finalComponent} />;
};

RestrictedRoute.propTypes = {
  component: PropTypes.oneOfType([Route.propTypes.component, PropTypes.object])
    .isRequired,
  options: PropTypes.any
};

export default RestrictedRoute;
