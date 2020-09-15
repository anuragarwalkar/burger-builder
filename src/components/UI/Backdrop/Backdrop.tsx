import * as React from 'react';
import styles from './Backdrop.module.css';

const Backdrop = ({show, hide}: any) => {
    return show ? <div className={styles.Backdrop} onClick={hide}></div> : null;

}

export default Backdrop;