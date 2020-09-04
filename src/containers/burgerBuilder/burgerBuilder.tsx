import React, { Fragment } from 'react';
import Burger from '../../components/burger/burger';
import BuildControls from '../../components/burger/buildControl/buildControls';
import Modal from '../../components/UI/Modal/modal';
import axios from '../../axiosOrder';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderSummary from '../../components/burger/orderSummary/orderSummary';

export interface BurderBuilderProps {
    history: any
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
        const ingredients = {...this.state.ingredients};

        const search = [];

        for(const key in this.state.ingredients) {
            if(ingredients[key] > 0) {
                const firstChar: string = search.length === 0 ? '?' : '&';
                search.push(`${firstChar}${key}=${ingredients[key]}`)
            }
        }

        search.push(`&price=${this.state.totalPrice}`);

        this.props.history.push({pathname: '/checkout', search: search.join('')});
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