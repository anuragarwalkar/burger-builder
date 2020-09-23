import React, { Fragment, FunctionComponent, useCallback, useEffect, useState } from "react";
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
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

export interface BurgerBuilderProps {
  history: any;
  ingredients: Ingredients;
  totalPrice: number;
  addIngredient: (ingredients: IngredientType) => void;
  removeIngredient: (ingredients: IngredientType) => void;
  fetchIngredients: () => void;
  onPurchaseInit: () => void;
  onSetRedirectPath: (path: string) => void;
  isAuth: boolean;
}

const BurgerBuilder: FunctionComponent<BurgerBuilderProps> = (props) => {
  const { fetchIngredients } = props;
  const [purchasing, setPurchasing] = useState(false);

  const fetchIngredientsFromApi = useCallback(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  useEffect(() => {
    fetchIngredientsFromApi();
  }, [fetchIngredientsFromApi]);

  const updatePurchaseState = (ingredients: any) => {
    const sum = Object.keys(ingredients)
      .map((key: string) => ingredients[key])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  };

  const addIngredientHandler = async (type: IngredientType) => {
    props.addIngredient(type);
  };

  const removeIngredientHandler = async (type: IngredientType) => {
    props.removeIngredient(type);
  };

  const purchaseHandler = () => {
    if (props.isAuth) {
      setPurchasing(true);
    } else {
      props.onSetRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const hideModal = () => {
    setPurchasing(false);
  };

  const purchase = async () => {
    props.onPurchaseInit();
    props.history.push({ pathname: "/checkout" });
  };

  const disabledInfo: any = { ...props.ingredients };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;

  let burger = <Spinner />;

  if (props.ingredients) {
    burger = (
      <Fragment>
        <Burger ingredients={props.ingredients}></Burger>
        <BuildControls
          moreClicked={addIngredientHandler}
          lessClicked={removeIngredientHandler}
          disabled={disabledInfo}
          totalPrice={props.totalPrice}
          purchasable={!updatePurchaseState(props.ingredients)}
          orderNow={purchaseHandler}
          isAuth={props.isAuth}
        ></BuildControls>
      </Fragment>
    );

    orderSummary = (
      <OrderSummary
        ingredients={props.ingredients}
        price={props.totalPrice}
        prurchase={purchase}
        hide={hideModal}
      />
    );
  }

  return (
    <Fragment>
      <Modal show={purchasing} hide={hideModal}>
        {orderSummary}
      </Modal>
      {burger}
    </Fragment>
  );
};

const mapStateToProps = (state: RootState) => {
  const { ingredients, totalPrice } = state.burgerBuilder;
  const { token } = state.auth;
  return {
    ingredients,
    totalPrice,
    isAuth: token !== "",
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
    onSetRedirectPath: (path: string) => dispatch(setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
