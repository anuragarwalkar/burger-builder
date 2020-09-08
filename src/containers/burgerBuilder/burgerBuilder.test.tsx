import React from "react";
import { configure, shallow, ShallowWrapper } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import BuildControls from "../../components/burger/buildControl/buildControls";
import { BurgerBuilder as cust } from "./burgerBuilder";

const BurgerBuilder: any = cust;

configure({ adapter: new ReactSixteenAdapter() });

describe("<BurgerBuilder />", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder fetchIngredients={() => {}} />);
  });

  it("Should render if we provide ingredients", () => {
    wrapper.setProps({ ingredients: { salad: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });

  it("Should not redner the <BuildControls /> if we dont provide ingredients", () => {
    wrapper.setProps({ ingredients: null });
    expect(wrapper.find(BuildControls)).toHaveLength(0);
  });
});
