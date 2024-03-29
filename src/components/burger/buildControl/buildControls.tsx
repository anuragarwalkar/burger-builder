import * as React from 'react';
import styles from './buildControls.module.css';
import BuildControl from './buildControl/buildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

const BuildControls = ({ moreClicked, lessClicked, disabled, totalPrice, 
    purchasable, orderNow, isAuth }: any) => {
    return (
        <div className={styles.buildControls}>
            <p>Current Price <strong>${totalPrice}</strong></p>
            {controls.map(({ label, type }) => <BuildControl
                label={label}
                moreClicked={moreClicked}
                lessClicked={lessClicked}
                type={type}
                disabled={disabled[type]}
                key={label}></BuildControl>)}
            <button className={styles.OrderButton} disabled={purchasable} onClick={orderNow}>{isAuth ? 'Order Now' : 'Sign In To Order'}</button>
        </div>
    )
}

export default BuildControls;