import React, { useContext, useEffect, useState, useMemo } from "react";
import { useWindowSize } from "@nobuti/react-plug";
import { Link } from "react-router-dom";
import posed, { PoseGroup } from "react-pose";
import "styled-components/macro";

import { blocks } from "../utils/request";
import { range } from "../utils";
import { Loading, Table, MetamaskContext } from "../components";

const TableContainer = posed.div({
  before: { opacity: 0, y: "24px" },
  enter: { opacity: 1, y: "0px" },
  exit: { opacity: 0, y: "24px" }
});

const LoadingContainer = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});

const Home = () => {
  const { web3 } = useContext(MetamaskContext);
  const { width } = useWindowSize();

  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null
  });

  useEffect(() => {
    const fetch = async () => {
      const latest = await web3.eth.getBlockNumber();
      const blockRange = range({ start: latest - 10, size: 10 });

      try {
        const data = await blocks({ web3, blocks: blockRange });
        setState({ loading: false, data, error: null });
      } catch (e) {
        setState({ loading: false, data: null, error: e });
      }
    };

    fetch();
  }, [web3]);

  const { loading, data, error } = state;

  const columns = useMemo(() => {
    return [
      {
        header: "Block",
        accessor: ["number", "transactions"],
        id: "block",
        show: () => width <= 480,
        cell: data => {
          return (
            <>
              <div>{data.number}</div>
              <div>
                {data.transactions.length > 0 ? (
                  <Link
                    to={`/block/${data.number}`}
                  >{`${data.transactions.length} txs`}</Link>
                ) : (
                  `${data.transactions.length} txs`
                )}
              </div>
            </>
          );
        }
      },
      {
        header: "#",
        accessor: "number",
        show: width > 480
      },
      {
        header: "Size",
        accessor: "size"
      },
      {
        header: "Difficulty",
        accessor: ["difficulty", "totalDifficulty"],
        id: "diffPercent",
        cell: data => {
          return (
            <>
              <div>{data.difficulty}</div>
              <div>of {data.totalDifficulty}</div>
            </>
          );
        },
        show: () => width <= 920 && width > 680
      },
      {
        header: "Difficulty",
        accessor: "difficulty",
        show: () => width > 920
      },
      {
        header: "Total difficulty",
        accessor: "totalDifficulty",
        show: () => width > 920
      },
      {
        header: "Transactions",
        id: "transactions",
        accessor: ["number", "transactions"],
        cell: data =>
          data.transactions.length > 0 ? (
            <Link
              to={`/block/${data.number}`}
            >{`${data.transactions.length} txs`}</Link>
          ) : (
            `${data.transactions.length} txs`
          ),
        show: () => width > 480
      },
      {
        header: "Gas used",
        accessor: ["gasUsed", "gasLimit"],
        id: "gasDiff",
        cell: data => {
          return (
            <>
              <div>{data.gasUsed}</div>
              <div>of {data.gasLimit}</div>
            </>
          );
        },
        show: () => width <= 920 && width
      },
      {
        header: "Gas used",
        accessor: "gasUsed",
        show: () => width > 920
      },
      {
        header: "Gas limit",
        accessor: "gasLimit",
        show: () => width > 920
      }
    ];
  }, [width]);

  return (
    <PoseGroup preEnterPose="before">
      {loading && (
        <LoadingContainer key={1}>
          <Loading />
        </LoadingContainer>
      )}
      {error && <div key={2}>Error: {error}</div>}
      {data && (
        <TableContainer key={3}>
          <Table data={data} columns={columns} />
        </TableContainer>
      )}
    </PoseGroup>
  );
};
export default Home;
