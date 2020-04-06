import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import routes from "./configs/routes";
// test("renders learn react link", () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe("App", () => {
  it("should have N route(s)", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("Route")).toHaveLength(routes.length);
  });
});
