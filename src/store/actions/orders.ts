import { PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAILED, PURCHASE_BURGER_START, PURCHASE_INIT, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILED, FETCH_ORDERS_INIT } from "./actionsTypes";
import { Order } from "../../models/order.model";
import axios from '../../axiosOrder';

export const purchaseBurgerSuccess = (id: string, order: Order) => {
    return {
        type: PURCHASE_BURGER_SUCCESS,
        payload: {
            id, 
            order
        }
    }
};

export const purchaseBurgerFailed = (error: string) => {
    return {
        type: PURCHASE_BURGER_FAILED,
        payload: {
            error
        }
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (order: Order) => {
    return async (dispatch: any, getState: any) => {
        dispatch(purchaseBurgerStart());
        const { token } = getState().auth;
        const result = await axios.post(`/orders.json?auth=${token}`, order);
        
        if(result) {
            const { data } = result;
            dispatch(purchaseBurgerSuccess(data.name, order));
        }
    }
}

export const purchaseInit = () => {
    return {
        type: PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders: Order[]) => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        payload: {
            orders
        }
    }
}

export const fetchOrdersFailed = (error: string) => {
    return {
        type: FETCH_ORDERS_FAILED,
        payload: {error: {message: error}}
    }
}

export const fetchOrdersInit = () => {
    return  {
        type: FETCH_ORDERS_INIT
    }
}

export const fetchOrders = () => {
    return async (dispatch: any, getState: any) => {
        try {
            dispatch(fetchOrdersInit());
            const { token, userId } = getState().auth;
            const query = `auth=${token}&orderBy="userId"&equalTo="${userId}"`
            let result = await axios.get(`/orders.json?${query}`);
            if(result != null) {
                const { data } = result;
                const orders = [];
        
                for (const key in data) {
                    orders.push({...data[key], id: key});
                }
    
                dispatch(fetchOrdersSuccess(orders));
            }
        } catch (error) {
            dispatch(fetchOrdersFailed(error.response.data.error))
        }
    }
}