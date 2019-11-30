import React, { useContext, useEffect, useState, useMemo } from "react";
import { useResizeObserver } from "@nobuti/react-plug";
import "styled-components/macro";

import { MetamaskContext } from "../components/Metamask";
import blockRequest from "../utils/blockRequest";
import Loading from "../components/Loading";
import Table from "../components/Table";
import { range } from "../utils";

const Home = () => {
  const { web3 } = useContext(MetamaskContext);
  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null
  });

  useEffect(() => {
    const fetch = async () => {
      const latest = await web3.eth.getBlockNumber();
      const blocks = range({ start: latest - 10, size: 10 });

      try {
        const data = await blockRequest({ web3, blocks });
        setState({ loading: false, data, error: null });
      } catch (e) {
        setState({ loading: false, data: null, error: e });
      }
    };

    fetch();
  }, [web3]);

  const { loading, data, error } = state;

  //const { ref, size } = useResizeObserver();
  const columns = useMemo(
    () => [
      {
        header: "#",
        accessor: "number"
      },
      {
        header: "Size",
        accessor: "size"
      },
      {
        header: "Difficulty",
        accessor: "difficulty"
      },
      {
        header: "Total difficulty",
        accessor: "totalDifficulty"
      },
      {
        header: "Transactions",
        accessor: "transactions",
        cell: data => (
          <div
            css={`
              white-space: nowrap;
            `}
          >{`${data.length} transactions`}</div>
        )
      },
      {
        header: "Gas used",
        accessor: "gasUsed"
      },
      {
        header: "Gas limit",
        accessor: "gasLimit"
      }
    ],
    []
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(data);
  return <Table data={data} columns={columns} />;
};
export default Home;
