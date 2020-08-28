import React from 'react';
import Aux from '../../hoc/customAux';
import styles from './layout.module.css';
import Toolbar from '../Navigation/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = (props: any) => {
    return <Aux>
        <Toolbar />
        <SideDrawer />
        <main className={styles.content}>
            {props.children}
        </main>
    </Aux>
}

export default Layout;