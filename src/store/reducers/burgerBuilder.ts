import { ADD_INGREDIENTS, REMOVE_INGREDIENTS, SET_INGREDIENTS } from "../actions/actionsTypes";
import { IngredientType, Ingredients } from "../../models/ingredient.model";
import { cloneState } from "../../utils/functions";
import { BurgerBuilderState } from "../../models/burgerBuilderState.model";

const initialState: BurgerBuilderState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        meat: 0,
        bacon: 0
    },
    totalPrice: 4,
    building: false
}

type actionType = { type: string, payload: { ingredientName: IngredientType, ingredients : Ingredients} };

const INGREDIENT_PRICES: Ingredients = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const addOrRemoveIngredient = (action: actionType, state: BurgerBuilderState) => {
    const newState:BurgerBuilderState = cloneState(state);
    const isActionTypeAdd = action.type === ADD_INGREDIENTS;

    const { ingredientName } = action.payload;
    const { totalPrice:oldPrice } = state;
    const oldValue = state.ingredients[ingredientName];
    const ingredientPrice = INGREDIENT_PRICES[ingredientName];
    const finalPrice = isActionTypeAdd ? oldPrice + ingredientPrice : oldPrice - ingredientPrice;
    newState.totalPrice = parseFloat((finalPrice).toFixed(2));
    const totalIngredient = isActionTypeAdd ? oldValue + 1 : oldValue - 1; 
    newState.ingredients[ingredientName] =  totalIngredient; 
    newState.building = true;

    return newState;
}

const setIngredients = (action:actionType, state: BurgerBuilderState) => {
    const newState:BurgerBuilderState = cloneState(state);
    newState.ingredients = action.payload.ingredients;
    newState.totalPrice = initialState.totalPrice;
    newState.building = false;
    return newState
}

const reducer = (state: BurgerBuilderState = initialState, action: actionType): BurgerBuilderState => {
    switch (action.type) {
        case ADD_INGREDIENTS: 
        case REMOVE_INGREDIENTS: { 
            return addOrRemoveIngredient(action, state); 
        }

        case SET_INGREDIENTS: {
            return setIngredients(action, state);
        } 

    }

    return state
}

export default reducer;