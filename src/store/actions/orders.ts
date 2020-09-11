import { PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAILED, PURCHASE_BURGER_START, PURCHASE_INIT, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILED, FETCH_ORDERS_INIT, FETCH_ORDERS, PURCHASE_BURGER } from "./actionsTypes";
import { Order } from "../../models/order.model";

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
    return { type: PURCHASE_BURGER, order };
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
        payload: { error: { message: error } }
    }
}

export const fetchOrdersInit = () => {
    return {
        type: FETCH_ORDERS_INIT
    }
}

// Removed API_KEY
export const fetchOrders = () => {
    return {
        type: FETCH_ORDERS
    }
}