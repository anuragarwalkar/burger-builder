import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './checkoutData.module.css';
import axios from '../../../axiosOrder';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';
import checkoutForm from './checkoutForm';
import { Order } from '../../../models/order.model';
import WithErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import { purchaseBurger } from '../../../store/actions/index';
import { RootState } from '../../../models/rootState.model';
import { Ingredients } from '../../../models/ingredient.model';

export interface CheckoutDataProps {
    ingredients: Ingredients
}

const CheckoutData = (props: any) => {

    const unmounted = useRef(false);

    const [form, setForm]: any = useState(checkoutForm);

    const [formIsValid, setFormIsValid] = useState(false);

    useEffect(() => {
        return () => {
            unmounted.current = true;
        }
    })

    type rulesType = { required: boolean, minLength: number, maxLength: number };

    const checkValidity = (value: string, rules: rulesType): boolean => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        return isValid;
    }

    const inputChangeHandler = async (event: any, inputName: string) => {
        const value: string = event.target.value;
        const validation = form[inputName].validation;
        const valid: boolean = validation ? checkValidity(value, validation) : true;
        let newState: any = {};

        setForm((oldState: any) => {
            newState = {
                ...oldState,
                [inputName]: {
                    ...oldState[inputName],
                    value, valid, touched: true
                }
            }

            let isValid = true;

            for (const key in newState) {
                if (!newState[key].valid) {
                    isValid = false
                    break
                }
            }

            setFormIsValid(isValid);
            return newState;

        })


    }

    const onOrder = async (event: any) => {
        event.preventDefault();
        if (!formIsValid) return;

        const { ingredients, price = 0 } = props;

        const customer: any = {};

        for (const key in form) {
            if (key !== 'deliveryMethod')
                customer[key] = form[key].value;
        }

        const deliveryMethod = form.deliveryMethod.value;

        const order: Order = {
            ingredients, price,
            customer, deliveryMethod
        }


        props.onOrderBurger(order);
    }
    const formElements: any = [];

    for (const key in form) {
        formElements.push({
            id: key,
            config: form[key]
        });
    }

    let inputForm = null;

    inputForm = <form onSubmit={onOrder}>
        {formElements.map((element: any) => (
            <Input changed={(event) => inputChangeHandler(event, element.id)}
                elementType={element.config.elementType}
                invalid={!element.config.valid}
                elementConfig={element.config.elementConfig}
                shouldValidate={element.config.validation}
                value={element.config.value}
                touched={element.config.touched}
                key={element.id}
            />
        ))}

        <Button disabled={!formIsValid} btnType="Success">Order</Button>
    </form>;

    if (props.loading) {
        inputForm = <Spinner />;
    }

    return (
        <div className={classes.checkoutData}>
            <h4>Enter your contact data</h4>
            {inputForm}
        </div>);
}

const mapStateToProps = (state: RootState) => {
    const { ingredients, totalPrice: price } = state.burgerBuilder;
    const { loading } = state.order;
    return {
        ingredients,
        price,
        loading
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onOrderBurger: (orderData: Order) => dispatch(purchaseBurger(orderData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WithErrorHandler(CheckoutData, axios)));