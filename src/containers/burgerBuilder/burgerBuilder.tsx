import React, { Fragment } from 'react';
import Burger from '../../components/Burger/burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControl';
import Modal from '../../components/UI/Modal/modal';
import axios from '../../axiosOrder';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    async componentDidMount() {
        try {
            const {data: ingredients} = await axios.get('/ingredients.json');
            this.setState({ingredients});
        } catch (error) {
            
        }
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

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    hideModal = () => {
        this.setState({ purchasing: false });
    }

    purchase = async () => {
        this.setState({ loading: true });
        const { ingredients, totalPrice: price } = this.state;

        const order = {
            ingredients, price,
            customer: {
                name: 'Anurag Arwalkar',
                address: 'Deccan',
                email: 'anuragarwalkar@gmail.com'
            },
            deliveryMethod: 'fastest'
        }

        const result = await axios.post('/orders.json', order)
        console.log('result:', result)
        this.setState({ loading: false, purchasing: false });
    }

    render() {
        const disabledInfo = { ...this.state.ingredients }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = <Spinner />;

        if (this.state.ingredients) {
            burger = (<Fragment>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls
                    moreClicked={this.addIngredientHandler}
                    lessClicked={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    totalPrice={this.state.totalPrice}
                    purchasable={!this.state.purchasable}
                    orderNow={this.purchaseHandler}
                >
                </BuildControls>
            </Fragment>)

            orderSummary = <OrderSummary ingredients={this.state.ingredients}
            price={this.state.totalPrice} prurchase={this.purchase} hide={this.hideModal} />;
            
        }

        if (this.state.loading) orderSummary = <Spinner />;

        return (
            <Fragment>
                <Modal show={this.state.purchasing}
                    hide={this.hideModal}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

export default withErrorHandler(BurderBuilder, axios);