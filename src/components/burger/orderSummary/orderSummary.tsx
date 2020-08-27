import React, { Fragment } from 'react';

const OrderSummary = ({ingredients}: any) => {
    const ingredientSummary = Object.keys(ingredients)
    .map(key => {
    return <li key={key}><span style={{ textTransform: 'capitalize'}}>{key}</span> : {ingredients[key]}</li>
    })
    return <Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with following ingredients:</p>
        <ul>
             {ingredientSummary}
        </ul>
        <p>Continue to check out.</p>
    </Fragment>
}

export default OrderSummary;