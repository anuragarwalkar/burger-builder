import React from 'react';
import classes from './navigationItems.module.css';
import NavigationItem from './navigationItem/navigationItem';
import { withRouter } from 'react-router-dom';

const NavigationItems = ({ location: { pathname } }: any) => {
    const myOrders = '/my-orders';
    const burgerBuilderLink = '/';
    return (<ul className={classes.NavigationItems}>
        <NavigationItem link={burgerBuilderLink} >Burger Builder</NavigationItem>
        <NavigationItem link={myOrders} >My Orders</NavigationItem>
    </ul>)
}

export default withRouter(NavigationItems);