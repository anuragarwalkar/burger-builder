import * as React from 'react';
import styles from './modal.module.css';

const Modal = ({children}: any) => {

    return (
    <div className={styles.Modal}>
        {children}
    </div>
    )
    
}

export default Modal;