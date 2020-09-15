import React, { Fragment } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/order/checkoutSummary/checkOutSummary';
import CheckoutData from './checkoutData/checkoutData';
import { connect } from 'react-redux';
import { RootState } from '../../models/rootState.model';
import { Ingredients } from '../../models/ingredient.model';

export interface BurgerCheckoutProps {
    ingredients: Ingredients;
    totalPrice: number;
    match: { path: string };
    purchased: boolean
}

const BurgerCheckout: React.SFC<any> = ({ ingredients, purchased, match: { path } }) => {

    let purchaseRedirect = <Fragment>
        <CheckoutSummary ingredients={ingredients} />
        <Route path={`${path}/contact-data`}
            exact component={CheckoutData}
        />
    </Fragment>;

    if (purchased) {
        purchaseRedirect = <Redirect to="/" />;
    }

    return (purchaseRedirect);
}

const mapStateToProps = (state: RootState) => {
    const { ingredients, totalPrice } = state.burgerBuilder;
    const { purchased } = state.order;
    return { ingredients, totalPrice, purchased }
}

export default connect(mapStateToProps)(withRouter(BurgerCheckout));