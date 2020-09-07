import React, { Fragment } from 'react';
import Logo from '../../logo/Logo';
import NavigationItems from '../navigationItems/navigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = ({closed, open, isAuthenticated}: any) => {
    const attachedClasses = [classes.SideDrawer];

    attachedClasses.push(open ? classes.Open : classes.Close);

    return (
        <Fragment>
            <Backdrop show={open} hide={closed}/>
            <div className={attachedClasses.join(' ')} onClick={closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={isAuthenticated} />
                </nav>
            </div>
        </Fragment>
    )
}

export default SideDrawer;