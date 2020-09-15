import React, { Fragment } from "react";
import Burger from "../../components/burger/burger";
import BuildControls from "../../components/burger/buildControl/buildControls";
import Modal from "../../components/UI/Modal/modal";
import axios from "../../axiosOrder";
import Spinner from "../../components/UI/Spinner/Spinner";
import OrderSummary from "../../components/burger/orderSummary/orderSummary";
import { connect } from "react-redux";
import { Ingredients, IngredientType } from "../../models/ingredient.model";
import { RootState } from "../../models/rootState.model";
import * as actions from "../../store/actions/index";
import { purchaseInit } from "../../store/actions/orders";
import { setAuthRedirectPath } from "../../store/actions/index";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

export interface BurgerBuilderProps {
  history: any;
  ingredients: Ingredients;
  totalPrice: number;
  addIngredient: (ingredients: IngredientType) => void;
  removeIngredient: (ingredients: IngredientType) => void;
  fetchIngredients: () => void;
  onPurchaseInit: () => void;
  onSetRedirectPath: (path:string) => void
  isAuth: boolean;
}

export interface BurgerBuilderState {
  purchasable: boolean;
  purchasing: boolean;
}

export class BurgerBuilder extends React.Component<
  BurgerBuilderProps,
  BurgerBuilderState
> {
  state = {
    purchasable: false,
    purchasing: false,
  };

  async componentDidMount() {
    this.props.fetchIngredients();
  }

  updatePurchaseState(ingredients: any) {
    const sum = Object.keys(ingredients)
      .map((key: string) => ingredients[key])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  }

  addIngredientHandler = async (type: IngredientType) => {
    this.props.addIngredient(type);
  };

  removeIngredientHandler = async (type: IngredientType) => {
    this.props.removeIngredient(type);
  };

  purchaseHandler = () => {
      if(this.props.isAuth) {
          this.setState({ purchasing: true });
      }else {
          this.props.onSetRedirectPath('/checkout');
          this.props.history.push('/auth');
      }
  };

  hideModal = () => {
    this.setState({ purchasing: false });
  };

  purchase = async () => {
    this.props.onPurchaseInit();
    this.props.history.push({ pathname: "/checkout" });
  };

  render() {
    const disabledInfo: any = { ...this.props.ingredients };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = <Spinner />;

    if (this.props.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients}></Burger>
          <BuildControls
            moreClicked={this.addIngredientHandler}
            lessClicked={this.removeIngredientHandler}
            disabled={disabledInfo}
            totalPrice={this.props.totalPrice}
            purchasable={!this.updatePurchaseState(this.props.ingredients)}
            orderNow={this.purchaseHandler}
            isAuth={this.props.isAuth}>
           </BuildControls>
        </Fragment>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          price={this.props.totalPrice}
          prurchase={this.purchase}
          hide={this.hideModal}
        />
      );
    }

    return (
      <Fragment>
        <Modal show={this.state.purchasing} hide={this.hideModal}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { ingredients, totalPrice } = state.burgerBuilder;
  const { token } = state.auth;
  return {
    ingredients,
    totalPrice,
    isAuth: token !== ''
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addIngredient: (ingredientName: IngredientType) =>
      dispatch(actions.addIngredient(ingredientName)),
    removeIngredient: (ingredientName: IngredientType) =>
      dispatch(actions.removeIngredient(ingredientName)),
    fetchIngredients: () => dispatch(actions.fetchIngredients()),
    onPurchaseInit: () => dispatch(purchaseInit()),
    onSetRedirectPath: (path: string) => dispatch(setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
