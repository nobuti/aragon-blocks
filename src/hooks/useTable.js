import { useState, useRef } from "react";
import { pick, get, isArray, flatArray, set } from "../utils";

/*
  columns:
    header: string or func
    accessor: string or array | required
    id: string | required if accessor is array
    sortable: string
    show: boolean or func
    cell: string or func
    filter: func
*/

const defaultSort = {
  accessor: null,
  direction: "asc"
};

const getAccessor = column => column.accessor;

const getId = column => {
  const errorId = isArray(column.accessor) && !column.id;
  if (errorId) {
    throw new Error(`column id is required for multiple accesors`);
  }

  return isArray(column.accessor) ? column.id : column.accessor;
};

const useTable = ({ columns, data, sortedBy = defaultSort }) => {
  const table = useRef({});
  const [sortState, sortBy] = useState({ ...defaultSort, ...sortedBy });
  const [orderColumns, setOrderColumns] = useState(
    columns.map(column => getId(column))
  );

  const updateOrderColumns = order => {
    const result = typeof order === "function" ? order(orderColumns) : order;
    setOrderColumns(result);
  };

  const sort = (a, b) => {
    let result;

    const r1 = get(a, sortState.accessor);
    const r2 = get(b, sortState.accessor);

    if (typeof r1 === "undefined" || typeof r2 === "undefined") {
      throw new Error(`sort accessor ${sortState.accessor} doesn't exist.`);
    }

    if (r1 === null) return 1;
    if (r2 === null) return -1;
    if (r1 === null && r2 === null) return 0;

    const areArray = isArray(r1) && isArray(r2);
    result = areArray ? r1.length - r2.length : r1 - r2;

    if (isNaN(result)) {
      return sortState.direction === "asc"
        ? r1.toString().localeCompare(r2)
        : r2.toString().localeCompare(r1);
    } else {
      return sortState.direction === "asc" ? result : -result;
    }
  };

  const defaultColumn = {
    show: true,
    cell: data => data
  };

  const defaultColumns = columns.map(column => ({
    ...defaultColumn,
    ...column
  }));

  const visibleColumns = orderColumns.reduce((memo, key) => {
    const [column] = defaultColumns.filter(column => {
      return getId(column) === key;
    });

    if (!column) {
      return memo;
    }

    const show =
      typeof column.show === "function" ? column.show() : column.show;
    if (show) {
      const columnId = getId(column);
      const isSorted = sortState.columnId === columnId;
      const isSortedDesc = sortState.direction === "desc";
      memo.push({
        ...column,
        columnId,
        header: () =>
          typeof column.header === "function" ? column.header() : column.header,
        isSorted,
        isSortedDesc
      });
    }

    return memo;
  }, []);

  const visibleAccessors = [
    ...new Set(flatArray(visibleColumns.map(column => getAccessor(column))))
  ];

  let rows = [...data];
  rows = rows.map((row, index) => {
    const resulttRow = pick(row, visibleAccessors);
    return {
      id: index,
      ...resulttRow
    };
  });

  if (sortState.accessor && visibleAccessors.indexOf(sortState.accessor) >= 0) {
    rows = rows.sort(sort);
  }

  rows = rows.reduce((memo, row) => {
    const cell = [
      ...orderColumns
        .map(key => {
          const [column] = visibleColumns.filter(
            column => getId(column) === key
          );

          if (!column) {
            return null;
          }

          let accessor = getAccessor(column);

          const data = isArray(accessor)
            ? accessor.reduce((memo, key) => {
                set(memo, key, get(row, key));
                return memo;
              }, {})
            : get(row, key);

          return {
            render: () =>
              typeof column.cell === "function" ? column.cell(data) : data
          };
        })
        .filter(Boolean)
    ];
    memo.push(cell);
    return memo;
  }, []);

  Object.assign(table.current, {
    defaultColumns,
    columns: visibleColumns,
    selected: [],
    rows,
    orderColumns,
    sortedBy: {
      ...sortState
    }
  });

  return { table: table.current, sortBy, updateOrderColumns };
};

export default useTable;
