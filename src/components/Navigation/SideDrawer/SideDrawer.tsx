import React, { Fragment } from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = ({closed, open}: any) => {
    const attachedClasses = [classes.SideDrawer];

    attachedClasses.push(open ? classes.Open : classes.Close);

    return (
        <Fragment>
            <Backdrop show={open} hide={closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>
    )
}

export default SideDrawer;