import * as React from 'react';
import styles from './drawerToggler.module.css';

const DrawerToggler = ({show}: any) => (
    <div className={styles.DrawerToggle} onClick={show}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default DrawerToggler