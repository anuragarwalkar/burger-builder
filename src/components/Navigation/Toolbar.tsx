import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../Logo/Logo';
import NavigationItems from './NavigationItems/NavigationItems';
import DrawerToggler from './SideDrawer/DrawerToggle/DrawerToggler';

const Toolbar = ({show}: any) => (
    <header className={styles.Toolbar}>
        <DrawerToggler show={show}/>
        <div className={styles.Logo}>
            <Logo />
        </div>
        <nav className={styles.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);


export default Toolbar;