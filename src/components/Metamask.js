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
    const setupProvider = () => {
      const provider = new Web3.providers.HttpProvider(
        "https://ropsten.infura.io/v3/fbbffc8457ac4c269513bd352c6c5113"
      );
      web3.current = new Web3(provider);
      setState({ web3: web3.current, error: null, loading: false });
    };

    async function trySetWeb3() {
      if (window.ethereum) {
        window.ethereum.autoRefreshOnNetworkChange = false;

        try {
          await window.ethereum.enable();
          setupProvider();
        } catch (e) {
          setState({ web3: null, error: ERRORS.denied, loading: false });
        }
      } else if (window.web3) {
        setupProvider();
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
