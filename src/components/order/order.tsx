import React, { useState, useEffect } from 'react';
import classes from './order.module.css';
import { Ingredients } from '../../models/ingredient.model';

export interface OrderProps {
    ingredients: any;
    price: number
}

const Order: React.SFC<OrderProps> = ({ price, ingredients: ingredientObj }) => {

    const [ingredients, setIngredients]: any = useState([]);


    useEffect(() => {
        const manipulatedIngredients = [];

        for (const key in ingredientObj) {
            const name = key;
            const price = ingredientObj[key];
            manipulatedIngredients.push({ name, price })
        }

        setIngredients(manipulatedIngredients);

    }, [ingredientObj]);

    const spanStyle: any = {
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        padding: '5px',
        border: '1px solid #ccc'
    }
    const getAllIngredients = ingredients.map((item: any) => {
        return <span style={spanStyle} key={item.name}>{item.name} ({item.price})</span>
    })

    return (
        <div className={classes.order}>
            <p>Ingredients: {getAllIngredients}</p>
            <p>Price <strong>USD {price}</strong></p>
        </div>
    );
}

export default Order;