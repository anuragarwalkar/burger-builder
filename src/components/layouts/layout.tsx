import React, { useState } from 'react';
import Aux from '../../hoc/customAux';
import styles from './layout.module.css';
import Toolbar from '../Navigation/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = (props: any) => {

    const [showSideDrawer, setSideDrawer] = useState(false);

    const sideDrawerHandler = (cond: boolean) => {
        setSideDrawer(cond);
    }

    return <Aux>
        <Toolbar show={() => sideDrawerHandler(true)}/>
        <SideDrawer open={showSideDrawer} closed={() => sideDrawerHandler(false)}/>
        <main className={styles.content}>
            {props.children}
        </main>
    </Aux>
}

export default Layout;