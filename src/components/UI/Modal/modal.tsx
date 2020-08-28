import React, { Fragment } from 'react';
import styles from './modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

export interface ModalProps {
    show: any,
    hide: any
}

export interface ModalState {

}

class Modal extends React.Component<ModalProps, ModalState> {
    shouldComponentUpdate(nextProps: any, nextState: any) {
        return this.props.show !== nextProps.show
    }

    render() {
        const { children, show, hide } = this.props;
        return (
            <Fragment>
                <Backdrop show={show} hide={hide} />
                <div className={styles.Modal} style={{
                    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: show ? '1' : '0'
                }}>
                    {children}
                </div>
            </Fragment>
        );
    }
}

export default Modal;