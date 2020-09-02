import React, { Fragment, useEffect } from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = ({ingredients, hide, prurchase, price}: any) => {
    useEffect(() => {

    })
    
    const ingredientSummary = Object.keys(ingredients)
    .map(key => {
    return <li key={key}><span style={{ textTransform: 'capitalize'}}>
        {key}</span> : {ingredients[key]}</li>
    })

    return <Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with following ingredients:</p>
        <ul>
             {ingredientSummary}
        </ul>
        <p>Total Price: <span>{price.toFixed(2)}</span></p>
        <p>Continue to check out.</p>
        <Button click={hide} btnType="Danger">Cancel</Button>
        <Button click={prurchase} btnType="Success">Continue</Button>
    </Fragment>
}

export default OrderSummary;