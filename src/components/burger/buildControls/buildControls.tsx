import * as React from 'react';
import styles from './buildControls.module.css';
import BuildControl from './buildControl/buildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const BuildControls = (props: any) => {
    return (
        <div className={styles.buildControls}>
            {controls.map(control => <BuildControl 
            label={control.label} 
            moreClicked={props.moreClicked} 
            lessClicked={props.lessClicked} 
            type={control.type} 
            key={control.label}></BuildControl>)}
        </div>
    )
}

export default BuildControls;