import * as React from 'react';
import classes from './Input.module.css';

export interface InputProps {
    elementType: string;
    elementConfig: {
        type: string,
        placeholder: string,
        options: [
            {
                value: string,
                displayValue: string
            }
        ]

    },
    changed: (event: any) => void ,
    value: string
}

const Input: React.SFC<InputProps> = (props) => {
    let inputElement = null;

    switch (props.elementType) {
        case 'input':
            inputElement = <input className={classes.inputElement}
                {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;
        case 'textarea':
            inputElement = <textarea className={classes.inputElement}
                {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
        case 'select':
            inputElement = <select className={classes.inputElement} onChange={props.changed}>
                {props.elementConfig.options.map((item) => (
                    <option key={item.value} value={item.value}>{item.displayValue}</option>
                ))}
            </select>
            break;
        default:
            inputElement = <input className={classes.inputElement}
                {...props.elementConfig} value={props.value} onChange={props.changed} />
    }

    return (
        <div className={classes.input}>
            <label className={classes.label}>{''}</label>
            {inputElement}
        </div>
    );
}

export default Input;