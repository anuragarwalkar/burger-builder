import React, { Fragment } from 'react';
import classes from './navigationItem.module.css';
import { NavLink } from 'react-router-dom';

const NavigationItem = (props: any) => {
   return <Fragment>
    <li className={classes.NavigationItem}>
        <NavLink exact to={props.link} activeClassName={classes.active}>{props.children}</NavLink>
    </li>
    </Fragment>
}


export default NavigationItem;