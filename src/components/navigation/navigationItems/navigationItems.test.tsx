import React from "react";
import { configure, shallow, ShallowWrapper } from "enzyme";
import NavigationItems from "./navigationItems";
import EnzymeAdapter from "enzyme-adapter-react-16";
import NavigationItem from "./navigationItem/navigationItem";

configure({ adapter: new EnzymeAdapter() });

describe("<NavigationItems />", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems isAuthenticated={false} />);
  });

  it("should render <NavigationItems /> Component", () => {
    const wrapper: ShallowWrapper = shallow(<NavigationItems isAuthenticated={false} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("It should render two <NavigationItem /> if user is not authenticated", () => {
    wrapper.setProps({ isAuthenticated: false });
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("Should render three <NavigationItem /> if user is authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("Should render have logout link in <NavigationItem /> if user is authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(<NavigationItem link="/logout">Log Out</NavigationItem>)
    ).toEqual(true);
  });
});
