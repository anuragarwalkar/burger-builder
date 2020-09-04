import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './checkoutData.module.css';
import axios from '../../../axiosOrder';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';
import checkoutForm from './checkoutForm';

export interface CheckoutDataProps {
    ingredients: any
}

const CheckoutData = (props: any) => {

    const [form, setForm]: any = useState(checkoutForm);

    const inputChangeHandler = async (event: any, inputName: string) => {
        const value = event.target.value;
        setForm((oldState: any) => ({
            ...oldState,
            [inputName]: {
                ...oldState[inputName],
                value
            }
        }))
    }

    const [loading, setLoading] = useState(false);

    const onOrder = async (event: any) => {
        debugger
        event.preventDefault();
        setLoading(true);

        const { ingredients, price = 0 } = props;

        const customer: any = {};

        for(const key in form) {
            if(key !== 'deliveryMethod')
            customer[key] =  form[key].value;
        }

        const deliveryMethod = form.deliveryMethod.value;

        const order = {
            ingredients, price,
            customer, deliveryMethod
        }

        const result = await axios.post('/orders.json', order)

        if (result)
            props.history.push('');
        setLoading(false);
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
            <Input changed={(event) => inputChangeHandler(event, element.id)} elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
                key={element.id}
            />
        ))}

        <Button btnType="Success">Order</Button>
    </form>;

    if (loading) {
        inputForm = <Spinner />;
    }

    return (
        <div className={classes.checkoutData}>
            <h4>Enter your contact data</h4>
            {inputForm}
        </div>);
}

export default withRouter(CheckoutData);