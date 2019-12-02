import React from "react";
import { render } from "@testing-library/react";

import { Hash } from "../../components";

describe("Hash component", () => {
  it("should render properly if hash is provided", () => {
    const hash = "0x686ACf148C1dAaA226b661fff8b7CBbD7c7AEE20";
    const { container, getByTitle } = render(<Hash hash={hash} />);

    expect(container).toMatchSnapshot();
    expect(getByTitle(hash)).toBeDefined();
  });

  it("should render invalid if hash is not provided", () => {
    const { container, getByTitle } = render(<Hash />);

    expect(container).toMatchSnapshot();
    expect(getByTitle("Invalid transaction")).toBeDefined();
  });

  it("should not shortcut the hash if it is not long enough", () => {
    const hash = "0x123456";
    const { container, getByTitle } = render(<Hash hash={hash} />);

    expect(container).toMatchSnapshot();
    expect(getByTitle(hash)).toBeDefined();
    expect(container.innerHTML).toMatch(hash);
  });
});
