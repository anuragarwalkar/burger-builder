import React, { FunctionComponent } from "react";
import styles from "./burgerIngredient.module.css";

export interface BurgerIngredientProps {
  type: string;
}

const BurgerIngredient: FunctionComponent<BurgerIngredientProps> = ({
  type,
}) => {
  let ingredients = null;

  switch (type) {
    case "bread-bottom":
      ingredients = <div className={styles.BreadBottom}></div>;
      break;

    case "bread-top":
      ingredients = (
        <div className={styles.BreadTop}>
          <div className={styles.Seeds1}></div>
          <div className={styles.Seeds2}></div>
        </div>
      );
      break;

    case "meat":
      ingredients = <div className={styles.Meat}></div>;
      break;

    case "bacon":
      ingredients = <div className={styles.Bacon}></div>;
      break;

    case "salad":
      ingredients = <div className={styles.Salad}></div>;
      break;

    case "cheese":
      ingredients = <div className={styles.Cheese}></div>;
      break;
    default:
      ingredients = null;
      break;
  }
  return ingredients;
};

export default BurgerIngredient;
