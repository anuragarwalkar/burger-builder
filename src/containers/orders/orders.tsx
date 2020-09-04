import React, { Fragment, useEffect, useState } from 'react';
import Order from '../../components/order/order';
import axios from '../../axiosOrder';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

export interface OrdersProps {
    
}
 
const Orders: React.SFC<OrdersProps> = () => {

    const [orders, setOrders]: any = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const result = await axios.get('/orders.json');
            if(!result) return;

            const { data } = result;
            const orders = [];

            for (const key in data) {
                orders.push({...data[key], id: key});
            }

            setOrders(orders);
            setLoading(false);
        })()
    }, [])
    
    let ordersShow = <Spinner />
    
    if(!loading){
        ordersShow = orders.map((order: any) => <Order key={order.id} 
        price={order.price} ingredients={order.ingredients}/>)
    }

    return ( 
        <Fragment>
            {ordersShow}
        </Fragment>
     );
}
 
export default WithErrorHandler(Orders, axios);