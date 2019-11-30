import React from "react";
import { createGlobalStyle } from "styled-components";
import reset from "@nobuti/styled-reset";

import { Metamask } from "./components/Metamask";
import Custodian from "./components/Custodian";
import Loading from "./components/Loading";

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  body {
    background-color: #e3e7ee;
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 400;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Metamask>
        <Custodian>
          {({ error, loading }) => {
            if (loading) {
              return <Loading color={`#4070f4`} />;
            }

            if (error) {
              return <div>Error: {error}</div>;
            }

            return <div>Aragon rocks</div>;
          }}
        </Custodian>
      </Metamask>
    </>
  );
}

export default App;
