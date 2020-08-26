import React from 'react';
import Aux from '../../hoc/aux';
import Burger from '../../components/burger/burger';
import BuildControls from '../../components/burger/buildControls/buildControls';

export interface BurderBuilderProps {
    
}
 
export interface BurderBuilderState {
    
}

// const ingredientPrices = {
    
// }
 
class BurderBuilder extends React.Component<BurderBuilderProps, BurderBuilderState> {
    state: any = { 
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type: string) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const ingredients = {...this.state.ingredients, [type]: updatedCount};
        this.setState({ingredients});
    }

    removeIngredientHandler = (type:string) =>  {
        debugger
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount === 0 ?  0 : oldCount - 1;
        const ingredients = {...this.state.ingredients, [type]: updatedCount};
        this.setState({ingredients});
    }
    render() { 
        return (  
            <Aux>
              <Burger ingredients={this.state.ingredients}></Burger> 
              <BuildControls 
              moreClicked={this.addIngredientHandler}
              lessClicked={this.removeIngredientHandler}>
              </BuildControls>
            </Aux>
        );
    }
}
 
export default BurderBuilder;