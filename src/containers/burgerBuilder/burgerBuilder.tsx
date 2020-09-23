import React, { Fragment, FunctionComponent, useCallback, useEffect, useState } from "react";
import Burger from "../../components/burger/burger";
import BuildControls from "../../components/burger/buildControl/buildControls";
import Modal from "../../components/UI/Modal/modal";
import axios from "../../axiosOrder";
import Spinner from "../../components/UI/Spinner/Spinner";
import OrderSummary from "../../components/burger/orderSummary/orderSummary";
import { useDispatch, useSelector } from "react-redux";
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

export const BurgerBuilder: FunctionComponent<BurgerBuilderProps> = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const addIngredient = (ingredientName: IngredientType) => dispatch(actions.addIngredient(ingredientName));
  const removeIngredient = (ingredientName: IngredientType) => dispatch(actions.removeIngredient(ingredientName));
  const fetchIngredients = useCallback(() => dispatch(actions.fetchIngredients()), [dispatch]);
  const onPurchaseInit = () => dispatch(purchaseInit());
  const onSetRedirectPath = (path: string) => dispatch(setAuthRedirectPath(path));

  const isAuth = useSelector((state: RootState) => state.auth.token !== "");
  const totalPrice = useSelector((state: RootState) => state.burgerBuilder.totalPrice);
  const ingredients = useSelector((state: RootState) => state.burgerBuilder.ingredients);

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);


  const updatePurchaseState = (ingredients: any) => {
    const sum = Object.keys(ingredients)
      .map((key: string) => ingredients[key])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  };

  const addIngredientHandler = async (type: IngredientType) => {
    addIngredient(type);
  };

  const removeIngredientHandler = async (type: IngredientType) => {
    removeIngredient(type);
  };

  const purchaseHandler = () => {
    if (isAuth) {
      setPurchasing(true);
    } else {
      onSetRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const hideModal = () => {
    setPurchasing(false);
  };

  const purchase = async () => {
    onPurchaseInit();
    props.history.push({ pathname: "/checkout" });
  };

  const disabledInfo: any = { ...ingredients };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;

  let burger = <Spinner />;

  if (ingredients) {
    burger = (
      <Fragment>
        <Burger ingredients={ingredients}></Burger>
        <BuildControls
          moreClicked={addIngredientHandler}
          lessClicked={removeIngredientHandler}
          disabled={disabledInfo}
          totalPrice={totalPrice}
          purchasable={!updatePurchaseState(ingredients)}
          orderNow={purchaseHandler}
          isAuth={isAuth}
        ></BuildControls>
      </Fragment>
    );

    orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        price={totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
