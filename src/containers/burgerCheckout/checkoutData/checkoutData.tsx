import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './checkoutData.module.css';
import axios from '../../../axiosOrder';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';

export interface CheckoutDataProps {
    ingredients: any
}

const CheckoutData = (props: any) => {

    const [form] = useState({
        name: '', email: '', address: {
            street: '',
            postalCode: ''
        }
    });

    const [loading, setLoading] = useState(false);

    const onClick = async (event: any) => {
        event.preventDefault();
        setLoading(true);

        const { ingredients, price = 0 } = props;

        const order = {
            ingredients, price,
            customer: {
                name: '',
                address: '',
                email: ''
            },
            deliveryMethod: 'fastest'
        }

        const result = await axios.post('/orders.json', order)
        console.log('result:', result)
        setLoading(false);
        props.history.push('');
    }

    let inputForm = null;

    inputForm = <form>
        <Input inputtype="input" label="Name" type="text" name="name" placeholder="Your name" />
        <Input inputtype="input" label="Email" type="email" name="email" placeholder="Your email" />
        <Input inputtype="input" label="Street" type="text" name="street" placeholder="Your street" />
        <Input inputtype="input" label="Postal Code" type="text" name="postal" placeholder="Your postal code" />

        <Button btnType="Success" click={onClick}>Order</Button>
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