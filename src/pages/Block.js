import React, { useContext, useEffect, useState, useMemo } from "react";
import { useWindowSize } from "@nobuti/react-plug";
import posed, { PoseGroup } from "react-pose";

import { blocks, transactions } from "../utils/request";
import { Loading, Table, Hash, MetamaskContext } from "../components";

const TableContainer = posed.div({
  before: { opacity: 0, y: "24px" },
  enter: { opacity: 1, y: "0px" },
  exit: { opacity: 0, y: "24px" }
});

const LoadingContainer = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});

const Block = ({ match }) => {
  const { web3 } = useContext(MetamaskContext);
  const { hash } = match.params;

  const { width } = useWindowSize();

  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null
  });

  useEffect(() => {
    const fetch = async () => {
      const [blo] = await blocks({ web3, blocks: [hash] });
      try {
        const data = await transactions({
          web3,
          transactions: blo.transactions
        });
        setState({ loading: false, data, error: null });
      } catch (e) {
        setState({ loading: false, data: null, error: e });
      }
    };

    fetch();
  }, [hash, web3]);

  const { loading, data, error } = state;

  const columns = useMemo(() => {
    return [
      {
        header: "Hash",
        accessor: "hash",
        cell: data => <Hash hash={data} />
      },
      {
        header: "Sender",
        accessor: ["from", "to"],
        id: "sender",
        cell: data => (
          <>
            <div>
              From <Hash hash={data.from} />
            </div>
            <div>
              to <Hash hash={data.to} />
            </div>
          </>
        ),
        show: () => width <= 740 && width > 550
      },
      {
        header: "From",
        accessor: "from",
        cell: data => <Hash hash={data} />,
        show: () => width > 740
      },
      {
        header: "To",
        accessor: "to",
        cell: data => <Hash hash={data} />,
        show: () => width > 740
      },
      {
        header: "Value",
        accessor: ["fee", "ether"],
        id: "value",
        cell: data => (
          <>
            <div>{Math.round(data.ether * 1000000) / 1000000} ETH</div>
            <div>Fee {Math.round(data.fee * 1000000) / 1000000}</div>
          </>
        ),
        show: () => width <= 740
      },
      {
        header: "Fee",
        accessor: "fee",
        cell: data => Math.round(data * 1000000) / 1000000,
        show: () => width > 740
      },
      {
        header: "Value",
        accessor: "ether",
        cell: data => Math.round(data * 1000000) / 1000000,
        show: () => width > 740
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
export default Block;
