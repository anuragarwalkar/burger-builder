import React from 'react';
import Aux from '../../hoc/customAux';
import Burger from '../../components/burger/burger';
import BuildControls from '../../components/burger/buildControls/buildControls';
import Modal from '../../components/UI/Modal/modal';
import OrderSummary from '../../components/burger/orderSummary/orderSummary';

export interface BurderBuilderProps {

}

export interface BurderBuilderState {

}

const INGREDIENT_PRICES: any = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurderBuilder extends React.Component<BurderBuilderProps, BurderBuilderState> {
    state: any = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState() {
        const ingredients = {
            ...this.state.ingredients
        }
        const sum = Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce((sum, el) => sum + el, 0)

        this.setState({ purchasable: sum > 0 })
    }

    addIngredientHandler = async (type: string) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const ingredients = { ...this.state.ingredients, [type]: updatedCount };
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const totalPrice = oldPrice + priceAddition;
        await this.setState({ ingredients, totalPrice });
        this.updatePurchaseState();
    }

    removeIngredientHandler = async (type: string) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount === 0 ? 0 : oldCount - 1;
        const ingredients = { ...this.state.ingredients, [type]: updatedCount };
        const priceDeducted = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const totalPrice = oldPrice - priceDeducted;
        await this.setState({ ingredients, totalPrice });
        this.updatePurchaseState();
    }
    render() {
        const disabledInfo = { ...this.state.ingredients }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                {this.state.purchasing &&
                    <Modal>
                        <OrderSummary ingredients={this.state.ingredients} />
                    </Modal>
                }
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls
                    moreClicked={this.addIngredientHandler}
                    lessClicked={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    totalPrice={this.state.totalPrice}
                    purchasable={!this.state.purchasable}>
                </BuildControls>
            </Aux>
        );
    }
}

export default BurderBuilder;