import React from 'react';
import styles from './Button.module.css';

const Button = ({click, children, btnType, disabled}: any) => {
    return <button disabled={disabled} className={[styles.Button, styles[btnType]].join(' ')}  onClick={click}>{children}</button>
}

export default Button;