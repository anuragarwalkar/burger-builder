import { IngredientType, Ingredients } from "../../models/ingredient.model";
import { ADD_INGREDIENTS, REMOVE_INGREDIENTS, SET_INGREDIENTS, INIT_INGREDIENTS } from "./actionsTypes";


export const addIngredient = (ingredientName: IngredientType) => {
    return { type: ADD_INGREDIENTS, payload: { ingredientName } }
}

export const removeIngredient = (ingredientName: IngredientType) => {
    return { type: REMOVE_INGREDIENTS, payload: { ingredientName } }
}

export const setIngredients = (ingredients: Ingredients) => {
    return { type: SET_INGREDIENTS, payload: { ingredients } }
}

export const fetchIngredients = () => {
    return { type: INIT_INGREDIENTS }
}