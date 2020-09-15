import React from "react";
import { App } from "./app";
import { configure, shallow, ShallowWrapper } from "enzyme";
import Enzyme from "enzyme-adapter-react-16";

configure({ adapter: new Enzyme() });

describe("<App />", () => {
  it("should render <App /> Component", () => {
    const wrapper: ShallowWrapper = shallow(<App isAuth={false} />);
    expect(wrapper).toMatchSnapshot();
  });
});
