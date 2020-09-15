import { Ingredients } from "./ingredient.model";

export interface BurgerBuilderState {
    ingredients: Ingredients;
    totalPrice: number;
    building: boolean
}