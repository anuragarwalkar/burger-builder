import React from 'react';
import classes from './navigationItem.module.css';
import { NavLink } from 'react-router-dom';

const NavigationItem = ({active, children, link}: any) => (
    <li className={classes.NavigationItem}>
        <NavLink to={link} className={active ? classes.active : ''}>{children}</NavLink>
    </li>
);

export default NavigationItem;