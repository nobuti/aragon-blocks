import React, { createContext, useState, useEffect, useRef } from "react";
import Web3 from "web3";
import PropTypes from "prop-types";

const ERRORS = {
  denied: "You need to grant account access in order to use this application.",
  forbidden: "You have to install Metamask to use this application."
};

export const MetamaskContext = createContext(null);

export const Metamask = ({ children }) => {
  const [state, setState] = useState({
    web3: null,
    error: null,
    loading: true
  });

  const web3 = useRef();

  useEffect(() => {
    async function trySetWeb3() {
      if (window.ethereum) {
        web3.current = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setState({ web3: web3.current, error: null, loading: false });
        } catch (e) {
          console.log(e);
          setState({ web3: null, error: ERRORS.denied, loading: false });
        }
      } else if (window.web3) {
        web3.current = new Web3(window.web3.currentProvider);
        setState({ web3: web3.current, error: null, loading: false });
      } else {
        setState({ web3: null, error: ERRORS.forbidden, loading: false });
      }
    }

    trySetWeb3();
  }, []);

  return (
    <MetamaskContext.Provider value={state}>
      {children}
    </MetamaskContext.Provider>
  );
};

Metamask.propTypes = {
  children: PropTypes.node
};
