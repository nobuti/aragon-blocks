import React, { useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import useTable from "../hooks/useTable";
import { isArray } from "../utils";

const Table = styled.table`
  border-collapse: separate;
  margin: 0 auto;
`;

const Header = styled.th`
  padding: 0px 0px 0px 10px;
  text-align: left;
  white-space: nowrap;
  color: rgb(0, 0, 0, 0.6);
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  line-height: 32px;
  cursor: pointer;
`;

const Row = styled.tr``;

const Cell = styled.td`
  font-size: 12px;
  padding: 20px 10px;
  background: rgb(255, 255, 255);
  text-align: left;
  border-bottom: 1px solid #dde4e9;

  ${Row} &:first-child {
    border-left: 1px solid #dde4e9;
  }

  ${Row} &:last-child {
    border-right: 1px solid #dde4e9;
  }

  ${Row}:first-child & {
    border-top: 1px solid #dde4e9;
  }

  ${Row}:first-child &:first-child {
    border-top-left-radius: 4px;
  }

  ${Row}:first-child &:last-child {
    border-top-right-radius: 4px;
  }

  ${Row}:last-child &:first-child {
    border-bottom-left-radius: 4px;
  }

  ${Row}:last-child &:last-child {
    border-bottom-right-radius: 4px;
  }

  div {
    white-space: nowrap;
  }
`;

const Component = ({ columns, data }) => {
  const { table, sortBy } = useTable({
    columns,
    data
  });

  const doSort = useCallback(
    column => {
      if (column.sortable === false) {
        return;
      }

      const sorted = table.sortedBy;
      let direction = "desc";
      const accessor = isArray(column.accessor)
        ? column.columnId
        : column.accessor;
      if (sorted.accessor === accessor) {
        direction = sorted.direction === "desc" ? "asc" : "desc";
      }
      sortBy({ accessor, direction, columnId: column.columnId });
    },
    [table.sortedBy, sortBy]
  );

  return (
    <Table>
      <thead>
        <Row>
          {table.columns.map(column => (
            <Header key={column.columnId} onClick={() => doSort(column)}>
              {column.header()}
              <span>
                {column.isSorted ? (column.isSortedDesc ? " ↓" : " ↑") : ""}
              </span>
            </Header>
          ))}
        </Row>
      </thead>
      <tbody>
        {table.rows.map((row, i) => {
          return (
            <Row key={i}>
              {row.map((cell, index) => {
                return <Cell key={`${i}${index}`}>{cell.render()}</Cell>;
              })}
            </Row>
          );
        })}
      </tbody>
    </Table>
  );
};

Component.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array
};

export default Component;
