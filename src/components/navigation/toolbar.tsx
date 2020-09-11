import React from 'react';
import styles from './toolbar.module.css';
import NavigationItems from './navigationItems/navigationItems';
import DrawerToggler from './SideDrawer/drawerToggler/drawerToggler';
import Logo from '../logo/logo';

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