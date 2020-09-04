import React, { useEffect } from 'react';
import Burger from '../../burger/burger';
import Button from '../../UI/Button/Button';
import classes from './checkOutSummary.module.css';
import { withRouter } from 'react-router-dom';

export interface CheckoutSummaryProps {
}
 
const CheckoutSummary = ({ history, ingredients }: any) => {

    useEffect(() => {

    })

    const onCancel = () => {
        history.goBack();
    }

    const onContinue = () => {
        history.replace('/checkout/contact-data')
    }

    return (
        <div className={classes.checkoutSummary}>
            <h1>We hope it test well! </h1>
            <div style={{width: '100%', height: '100%', margin:'auto'}}>
                <Burger ingredients={ingredients}/>
            </div>
            <Button btnType="Danger" click={onCancel}>Cancel</Button>
            <Button btnType="Success" click={onContinue}>Continue</Button>
        </div>
     );
}
 
export default withRouter(CheckoutSummary);