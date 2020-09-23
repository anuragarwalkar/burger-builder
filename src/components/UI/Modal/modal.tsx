import React, { Fragment, FunctionComponent, memo, ReactNode } from "react";
import styles from "./modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

export interface ModalProps {
  show: boolean;
  hide: () => void;
  children ?: ReactNode,
  shouldComponentUpdate ?: (prevProps: ModalProps, nextProps: ModalProps) => boolean
}

const shouldComponentUpdate = (prevProps: ModalProps, nextProps: ModalProps) => {
    return (
        prevProps.show === nextProps.show ||
        nextProps.children === prevProps.children
    );
  };

const Modal: FunctionComponent<ModalProps> = (props) => {

  const { children, show, hide } = props;
  return (
    <Fragment>
      <Backdrop show={show} hide={hide} />
      <div
        className={styles.Modal}
        style={{
          transform: show ? "translateY(0)" : "translateY(-100vh)",
          opacity: show ? "1" : "0",
        }}
      >
        {children}
      </div>
    </Fragment>
  );
};

export default memo(Modal, shouldComponentUpdate);
