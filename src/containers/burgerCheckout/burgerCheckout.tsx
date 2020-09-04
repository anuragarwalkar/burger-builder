import React, { Fragment, useState, useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom';
import CheckoutSummary from '../../components/order/checkoutSummary/checkOutSummary';
import CheckoutData from './checkoutData/checkoutData';
import queryString from 'query-string';
import _ from 'lodash';

export interface BurgerCheckoutProps {

}

const BurgerCheckout: React.SFC<BurgerCheckoutProps> = ({ location: { search }, match: { path } }: any) => {
    const options = { parseNumbers: true };

    const [parsed]: any = useState(queryString.parse(search, options));

    const [ingredients, setIngredients] = useState({});
    const [price, setPrice] = useState(0);

    useEffect(() => {
        setIngredients(_.omit(parsed, 'price'));
        setPrice(parsed.price);
    }, [parsed]);

    return (
        <Fragment>
            <CheckoutSummary ingredients={ingredients} />
            <Route path={`${path}/contact-data`}
                exact render={
                    () => (<CheckoutData ingredients={ingredients} price={price} />)
                } />
        </Fragment>
    );
}

export default withRouter(BurgerCheckout);