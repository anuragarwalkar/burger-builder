import { Ingredients } from "./ingredient.model";

export interface Order {
    id?: string
    orderData: {
        country: string
        email: string
        name: string
        postalCode: string
        street: string
        deliveryMethod: string;
    };
    ingredients: Ingredients;
    price: number;
    userId: string;
}