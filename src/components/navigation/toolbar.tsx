import React from 'react';
import styles from './toolbar.module.css';
import Logo from '../logo/Logo';
import NavigationItems from './navigationItems/navigationItems';
import DrawerToggler from './sideDrawer/drawerToggler/drawerToggler';

const Toolbar = ({show, isAuthenticated}: any) => (
    <header className={styles.Toolbar}>
        <DrawerToggler show={show}/>
        <div className={styles.Logo}>
            <Logo />
        </div>
        <nav className={styles.DesktopOnly}>
            <NavigationItems isAuthenticated={isAuthenticated} />
        </nav>
    </header>
);


export default Toolbar;