import React from 'react';
import classes from './navigationItems.module.css';
import NavigationItem from './navigationItem/navigationItem';
import { withRouter } from 'react-router-dom';

const NavigationItems = ({ location: { pathname }, isAuthenticated }: any) => {
    return (<ul className={classes.NavigationItems}>
        <NavigationItem link="/" >Burger Builder</NavigationItem>
        {isAuthenticated ? <NavigationItem link="/my-orders" >My Orders</NavigationItem> : null }
        {isAuthenticated ? <NavigationItem link="/logout" >Log Out</NavigationItem> : <NavigationItem link="/auth" >Auth</NavigationItem>}
        
    </ul>)
}

export default withRouter(NavigationItems);