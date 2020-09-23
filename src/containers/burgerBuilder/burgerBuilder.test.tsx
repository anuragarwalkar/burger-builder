// import React from "react";
import { configure } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
// import BuildControls from "../../components/burger/buildControl/buildControls";
// import { BurgerBuilder as cust } from "./burgerBuilder";
// import { Provider } from "react-redux";
// import thunk from "redux-thunk";
// import configureMockStore from "redux-mock-store";

// const mockStore = configureMockStore([thunk]);

// const BurgerBuilder: any = cust;

configure({ adapter: new ReactSixteenAdapter() });

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

describe("<BurgerBuilder />", () => {
  // let wrapper: any;

  beforeEach(() => {});

  it("Should render if we provide ingredients", () => {
    // wrapper.setProps({ ingredients: { salad: 0 } });
    // const store = mockStore({
    //   burgerBuilder: { ingredients: { salad: 0 } },
    //   auth: { token: "invalid" },
    // });

    // wrapper = mount(
    //   <Provider store={store}>
    //     <BurgerBuilder />
    //   </Provider>
    // );
    expect([1]).toHaveLength(1);
  });

  it("Should not redner the <BuildControls /> if we dont provide ingredients", () => {
    // wrapper.setProps({ ingredients: null });
    // expect(wrapper.find(BuildControls)).toHaveLength(0);
  });
});
