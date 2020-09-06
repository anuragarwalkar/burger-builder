import { IngredientType, Ingredients } from "../../models/ingredient.model";
import { ADD_INGREDIENTS, REMOVE_INGREDIENTS, SET_INGREDIENTS } from "./actionsTypes";
import axios from '../../axiosOrder';


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
    return async (dispatch: any) => {
        try {
            const { data: ingredients } = await axios.get('/ingredients.json');
            dispatch(setIngredients(ingredients))
        } catch (error) {
            
        }
    }
}