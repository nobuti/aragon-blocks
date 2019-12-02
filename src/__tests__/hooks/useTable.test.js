import { renderHook, act } from "@testing-library/react-hooks";

import useTable from "../../hooks/useTable";

describe("useTable hook", () => {
  const data = [
    {
      firstName: "John",
      lastName: "Doe",
      age: 32
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      age: 30
    },
    {
      firstName: "Donald",
      lastName: "Trump",
      age: 66
    }
  ];

  const columns = [
    {
      header: "Name",
      accessor: ["firstName", "lastName"],
      id: "name",
      sortable: "firstName",
      cell: data => `${data.firstName} ${data.lastName}`,
      show: false
    },
    {
      header: "First Name",
      accessor: "firstName"
    },
    {
      header: "Last Name",
      accessor: "lastName"
    },
    {
      header: "Age",
      accessor: "age",
      show: true
    }
  ];

  it("should generate table data properly", () => {
    const { result } = renderHook(() => useTable({ columns, data }));
    expect(result.current.table.rows).toBeDefined();
    expect(result.current.table.columns).toBeDefined();
    expect(result.current.table.rows.length).toEqual(data.length);
  });

  it("should hide columns if show property is false", () => {
    const { result } = renderHook(() => useTable({ columns, data }));
    const [hidden] = columns.filter(column => column.show === false);
    const visibleHeaders = columns
      .filter(column => column.show === true || column.show == null)
      .map(column => column.header);

    const [match] = result.current.table.columns.filter(
      column => column.header === hidden.header
    );
    expect(match).toBeUndefined();

    result.current.table.columns.forEach(column => {
      const header = column.header();
      expect(visibleHeaders.indexOf(header)).toBeGreaterThan(-1);
    });
  });

  it("should sort data by accessor properly", () => {
    const { result } = renderHook(() => useTable({ columns, data }));

    result.current.table.rows.forEach((row, index) => {
      const [f, l, age] = row; // eslint-disable-line
      expect(age.render()).toEqual(data[index].age);
    });

    act(() => {
      result.current.sortBy({
        accessor: "age",
        direction: "asc"
      });
    });

    const sorted = result.current.table.rows.map((row, index) => {
      const [f, l, age] = row; // eslint-disable-line
      return age.render();
    });

    const dataSorted = data.sort((a, b) => a.age - b.age).map(d => d.age);

    sorted.forEach((s, index) => {
      expect(s).toEqual(dataSorted[index]);
    });
  });
});
