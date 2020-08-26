import * as React from 'react';
import styles from './burgerIngredient.module.css';

export interface Props {
    type: string 
}
 
export interface State {
    
}
 
class BurgerIngedient extends React.Component<Props, State> {
    render() { 
        let ingredients = null;
        const {type} = this.props as any;

    switch (type) {
        case 'bread-bottom':
            ingredients = <div className={styles.BreadBottom}></div>
            break;
        
        case 'bread-top':
            ingredients = (
                <div className={styles.BreadTop}>
                    <div className={styles.seed1}></div>
                    <div className={styles.seed2}></div>
                </div>
            )
            break

        case 'meat':
            ingredients = <div className={styles.Meat}></div>
            break;  

        case 'bacon':
            ingredients = <div className={styles.Bacon}></div>
            break; 
            
        case 'salad':
            ingredients = <div className={styles.Salad}></div>
            break; 
            
        case 'cheese':
            ingredients = <div className={styles.Cheese}></div>
            break;     
        default:
            ingredients = null;
            break;
    }
    return ingredients;
    }
}


 
export default BurgerIngedient;