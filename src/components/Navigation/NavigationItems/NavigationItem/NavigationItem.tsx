import React from 'react';
import classes from './NavigationItem.module.css';

const NavigationItem = (props: any) => (
    <li className={classes.NavigationItem}>
        <a href="/" className={props.active ? classes.active : ''}>{props.children}</a>
    </li>
);

export default NavigationItem;