import * as React from 'react';
import classes from './Input.module.css';

export interface InputProps {
    label: string;
    inputtype: string;
    placeholder: string;
    name: string;
    type: string;
}

const Input: React.SFC<InputProps> = (props) => {
    let inputElement = null;

    switch (props.inputtype) {
        case 'input':
            inputElement = <input className={classes.inputElement} {...props} />
            break;
        case 'textarea':
            inputElement = <textarea {...props} />
            break;
        default:
            inputElement = <input {...props} />
    }

    return (
        <div className={classes.input}>
            <label className={classes.label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input;