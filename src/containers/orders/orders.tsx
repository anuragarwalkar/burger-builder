import React, { Fragment, useEffect } from 'react';
import Order from '../../components/order/order';
import axios from '../../axiosOrder';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Order as OrderType } from '../../models/order.model';
import { connect } from 'react-redux';
import { RootState } from '../../models/rootState.model';
import { fetchOrders } from '../../store/actions';

export interface OrdersProps {

}

const Orders: React.SFC<OrdersProps> = ({ orders, loading, fetchOrders }: any) => {

    useEffect(() => {
        if (orders.length === 0)
            fetchOrders()
    }, [fetchOrders, orders])

    let ordersShow = <Spinner />

    if (!loading) {
        ordersShow = orders.map((order: OrderType) => <Order key={order.id}
            price={order.price} ingredients={order.ingredients} />)
    }

    return (
        <Fragment>
            {ordersShow}
        </Fragment>
    );
}

const mapStateToProps = (state: RootState) => {
    const { orders, loading } = state.order;
    return {
        orders, loading
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchOrders: () => dispatch(fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios));