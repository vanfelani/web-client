import React from "react";
import { shallow, mount } from "enzyme";
import Header from "./Header";

const onMenuClickFn = jest.fn();

describe("Header", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<Header onMenuClick={onMenuClickFn} />);
  });

  it("should have fixed property", () => {
    wrapper.find("button#menu-button").simulate("click");
    expect(onMenuClickFn).toHaveBeenCalled();
  });

  it("menu should have been clicked twice", () => {
    wrapper
      .find("button#menu-button")
      .simulate("click")
      .simulate("click");
    expect(onMenuClickFn).toHaveBeenCalledTimes(3);
  });
});
