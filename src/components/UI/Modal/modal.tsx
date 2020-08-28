import React, { Fragment } from 'react';
import styles from './modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = ({ children, show, hide }: any) => {

    return (
        <Fragment>
        <Backdrop show={show} hide={hide}/>
        <div className={styles.Modal} style={{
            transform: show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: show ? '1' : '0'
        }}>
            {children}
        </div>
        </Fragment>
    )

}

export default Modal;