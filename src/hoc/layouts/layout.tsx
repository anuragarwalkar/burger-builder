import React, { useState, Fragment } from 'react';
import styles from './layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props: any) => {

    const [showSideDrawer, setSideDrawer] = useState(false);

    const sideDrawerHandler = (cond: boolean) => {
        setSideDrawer(cond);
    }

    return <Fragment>
        <Toolbar show={() => sideDrawerHandler(true)}/>
        <SideDrawer open={showSideDrawer} closed={() => sideDrawerHandler(false)}/>
        <main className={styles.content}>
            {props.children}
        </main>
    </Fragment>
}

export default Layout;